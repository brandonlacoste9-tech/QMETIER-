#!/usr/bin/env python3
"""
Q-MÉTIER Telegram Bot - Bilingual (EN/FR)
Allows professionals to receive notifications, submit quotes, and communicate with customers
"""
import os
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    Application, CommandHandler, CallbackQueryHandler, 
    MessageHandler, filters, ContextTypes
)
import httpx
from datetime import datetime
from locales import t, set_user_language

# Configuration
BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
API_URL = os.getenv("API_URL", "http://api:8000")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ==================== Command Handlers ====================

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Welcome message and registration"""
    user_id = update.effective_user.id
    await update.message.reply_text(t(user_id, 'welcome'))

async def language(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Change language preference"""
    keyboard = [
        [InlineKeyboardButton("English", callback_data="lang_en")],
        [InlineKeyboardButton("Français", callback_data="lang_fr")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("Choose your language / Choisissez votre langue:", reply_markup=reply_markup)

async def register(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Register a new professional"""
    telegram_id = update.effective_user.id
    user_id = update.effective_user.id
    
    keyboard = [
        [InlineKeyboardButton("📍 Share Location", request_location=True)],
        [InlineKeyboardButton("⌨️ Enter Manually", callback_data="register_manual")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        t(user_id, 'register_prompt'),
        reply_markup=reply_markup
    )
    
    context.user_data['registering'] = True

async def balance(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Check credit balance"""
    telegram_id = update.effective_user.id
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{API_URL}/professionals/telegram/{telegram_id}"
            )
            if response.status_code == 200:
                data = response.json()
                await update.message.reply_text(
                    f"💰 Credit Balance: {data['credit_balance']} credits\n\n"
                    f"Use /credits to purchase more credits"
                )
            else:
                await update.message.reply_text(
                    "❌ Profile not found. Use /register to create your profile."
                )
    except Exception as e:
        logger.error(f"Balance check failed: {e}")
        await update.message.reply_text("❌ Error checking balance. Try again later.")

async def credits(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Show credit pack options"""
    keyboard = [
        [InlineKeyboardButton("12 Credits - $17.99", callback_data="buy_12-pack")],
        [InlineKeyboardButton("24 Credits - $34.99", callback_data="buy_24-pack")],
        [InlineKeyboardButton("60 Credits - $84.99", callback_data="buy_60-pack")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        "💳 Select a credit pack:\n\n"
        "Credits are used to submit quotes on customer projects.\n"
        "Each quote typically costs 1-3 credits.",
        reply_markup=reply_markup
    )

async def jobs(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Show available jobs matching professional's skills"""
    telegram_id = update.effective_user.id
    
    try:
        async with httpx.AsyncClient() as client:
            # Get professional profile
            prof_response = await client.get(
                f"{API_URL}/professionals/telegram/{telegram_id}"
            )
            
            if prof_response.status_code != 200:
                await update.message.reply_text(
                    "❌ Profile not found. Use /register first."
                )
                return
            
            professional = prof_response.json()
            
            # Get matched projects
            match_response = await client.post(
                f"{API_URL}/matcher/find-jobs",
                json={
                    "professional_id": professional['id'],
                    "max_distance_miles": 50,
                    "top_n": 5
                }
            )
            
            if match_response.status_code == 200:
                matches = match_response.json()['matches']
                
                if not matches:
                    await update.message.reply_text(
                        "📭 No jobs available right now.\n"
                        "I'll notify you when new matches appear!"
                    )
                    return
                
                for match in matches:
                    await send_job_card(update, match)
            else:
                await update.message.reply_text("❌ Error fetching jobs.")
                
    except Exception as e:
        logger.error(f"Jobs fetch failed: {e}")
        await update.message.reply_text("❌ Error fetching jobs. Try again later.")

async def send_job_card(update: Update, project: dict):
    """Send a formatted job card with action buttons"""
    similarity = project.get('similarity', 0) * 100
    distance = project.get('distance_miles', 0)
    
    message = (
        f"🔨 {project['title']}\n\n"
        f"📝 {project['description'][:200]}...\n\n"
        f"📍 {distance:.1f} miles away\n"
        f"🎯 Match Score: {similarity:.0f}%\n"
        f"💼 Skills: {', '.join(project.get('skill_tags', []))}"
    )
    
    keyboard = [
        [InlineKeyboardButton("💬 Submit Quote", callback_data=f"quote_{project['id']}")],
        [InlineKeyboardButton("👁️ View Details", callback_data=f"details_{project['id']}")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(message, reply_markup=reply_markup)

# ==================== Callback Handlers ====================

async def button_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle button clicks"""
    query = update.callback_query
    await query.answer()
    
    data = query.data
    
    if data.startswith("buy_"):
        await handle_credit_purchase(query, context, data)
    elif data.startswith("quote_"):
        await handle_quote_submission(query, context, data)
    elif data.startswith("details_"):
        await handle_project_details(query, context, data)
    elif data.startswith("accept_"):
        await handle_accept_job(query, context, data)

async def handle_credit_purchase(query, context, data):
    """Handle credit pack purchase"""
    plan_id = data.replace("buy_", "")
    telegram_id = query.from_user.id
    
    try:
        async with httpx.AsyncClient() as client:
            # Get professional ID
            prof_response = await client.get(
                f"{API_URL}/professionals/telegram/{telegram_id}"
            )
            professional = prof_response.json()
            
            # Create Stripe session
            response = await client.post(
                f"{API_URL}/credits/purchase",
                json={
                    "professional_id": professional['id'],
                    "plan_id": plan_id
                }
            )
            
            if response.status_code == 200:
                data = response.json()
                await query.edit_message_text(
                    f"✅ Payment link created!\n\n"
                    f"Click here to complete purchase:\n{data['session_url']}"
                )
            else:
                await query.edit_message_text("❌ Purchase failed. Try again.")
                
    except Exception as e:
        logger.error(f"Credit purchase failed: {e}")
        await query.edit_message_text("❌ Error processing purchase.")

async def handle_quote_submission(query, context, data):
    """Start quote submission flow"""
    project_id = data.replace("quote_", "")
    
    await query.edit_message_text(
        "💬 Submit your quote:\n\n"
        "Reply with your quote in this format:\n"
        "Amount: 150.00\n"
        "Message: I can complete this job in 2 days with high quality work."
    )
    
    context.user_data['quoting_project'] = project_id

async def handle_project_details(query, context, data):
    """Show full project details"""
    project_id = data.replace("details_", "")
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{API_URL}/projects/{project_id}")
            
            if response.status_code == 200:
                project = response.json()
                message = (
                    f"📋 Project Details\n\n"
                    f"Title: {project['title']}\n\n"
                    f"Description:\n{project['description']}\n\n"
                    f"Skills Required: {', '.join(project['skill_tags'])}\n"
                    f"Status: {project['status']}\n"
                    f"Created: {project['created_at']}"
                )
                
                keyboard = [
                    [InlineKeyboardButton("💬 Submit Quote", callback_data=f"quote_{project_id}")]
                ]
                reply_markup = InlineKeyboardMarkup(keyboard)
                
                await query.edit_message_text(message, reply_markup=reply_markup)
            else:
                await query.edit_message_text("❌ Project not found.")
                
    except Exception as e:
        logger.error(f"Project details fetch failed: {e}")
        await query.edit_message_text("❌ Error fetching details.")

async def handle_accept_job(query, context, data):
    """Accept a job offer"""
    quote_id = data.replace("accept_", "")
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(f"{API_URL}/quotes/{quote_id}/accept")
            
            if response.status_code == 200:
                await query.edit_message_text(
                    "✅ Job accepted!\n\n"
                    "The customer has been notified. You'll receive their contact info shortly."
                )
            else:
                await query.edit_message_text("❌ Failed to accept job.")
                
    except Exception as e:
        logger.error(f"Job acceptance failed: {e}")
        await query.edit_message_text("❌ Error accepting job.")

# ==================== Message Handlers ====================

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle text messages"""
    text = update.message.text
    
    # Registration flow
    if context.user_data.get('registering'):
        await process_registration(update, context, text)
        return
    
    # Quote submission flow
    if context.user_data.get('quoting_project'):
        await process_quote(update, context, text)
        return
    
    await update.message.reply_text(
        "I didn't understand that. Use /help to see available commands."
    )

async def process_registration(update: Update, context, text: str):
    """Process professional registration"""
    try:
        lines = text.strip().split('\n')
        data = {}
        for line in lines:
            if ':' in line:
                key, value = line.split(':', 1)
                data[key.strip().lower()] = value.strip()
        
        # Parse location
        lat, lng = map(float, data['location'].split(','))
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{API_URL}/professionals",
                json={
                    "name": data['name'],
                    "email": data['email'],
                    "location_lat": lat,
                    "location_lng": lng,
                    "skill_tags": [s.strip() for s in data['skills'].split(',')],
                    "telegram_id": update.effective_user.id
                }
            )
            
            if response.status_code == 200:
                await update.message.reply_text(
                    "✅ Registration complete!\n\n"
                    "You'll now receive notifications for matching jobs.\n"
                    "Use /jobs to see available opportunities."
                )
                context.user_data['registering'] = False
            else:
                await update.message.reply_text(
                    "❌ Registration failed. Please check your information and try again."
                )
                
    except Exception as e:
        logger.error(f"Registration failed: {e}")
        await update.message.reply_text(
            "❌ Invalid format. Please try again with the correct format."
        )

async def process_quote(update: Update, context, text: str):
    """Process quote submission"""
    try:
        lines = text.strip().split('\n')
        data = {}
        for line in lines:
            if ':' in line:
                key, value = line.split(':', 1)
                data[key.strip().lower()] = value.strip()
        
        project_id = context.user_data['quoting_project']
        telegram_id = update.effective_user.id
        
        async with httpx.AsyncClient() as client:
            # Get professional ID
            prof_response = await client.get(
                f"{API_URL}/professionals/telegram/{telegram_id}"
            )
            professional = prof_response.json()
            
            # Submit quote
            response = await client.post(
                f"{API_URL}/quotes",
                json={
                    "project_id": project_id,
                    "professional_id": professional['id'],
                    "amount": float(data['amount']),
                    "message": data['message'],
                    "credits_required": 1
                }
            )
            
            if response.status_code == 200:
                await update.message.reply_text(
                    "✅ Quote submitted successfully!\n\n"
                    "1 credit has been deducted from your balance.\n"
                    "You'll be notified if the customer accepts your quote."
                )
                context.user_data.pop('quoting_project')
            elif response.status_code == 402:
                await update.message.reply_text(
                    "❌ Insufficient credits!\n\n"
                    "Use /credits to purchase more credits."
                )
            else:
                await update.message.reply_text("❌ Quote submission failed.")
                
    except Exception as e:
        logger.error(f"Quote submission failed: {e}")
        await update.message.reply_text(
            "❌ Invalid format. Please use:\n"
            "Amount: 150.00\n"
            "Message: Your message here"
        )

# ==================== Notification Functions ====================

async def notify_new_match(telegram_id: int, project: dict, app: Application):
    """Send notification about new matching project"""
    similarity = project.get('similarity', 0) * 100
    distance = project.get('distance_miles', 0)
    
    message = (
        f"🔔 New Job Match!\n\n"
        f"🔨 {project['title']}\n"
        f"📍 {distance:.1f} miles away\n"
        f"🎯 Match Score: {similarity:.0f}%\n\n"
        f"Tap below to view details and submit a quote."
    )
    
    keyboard = [
        [InlineKeyboardButton("💬 Submit Quote", callback_data=f"quote_{project['id']}")],
        [InlineKeyboardButton("👁️ View Details", callback_data=f"details_{project['id']}")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await app.bot.send_message(
        chat_id=telegram_id,
        text=message,
        reply_markup=reply_markup
    )

async def notify_quote_accepted(telegram_id: int, quote: dict, app: Application):
    """Notify professional that their quote was accepted"""
    message = (
        f"🎉 Your quote was accepted!\n\n"
        f"Project: {quote['project_title']}\n"
        f"Amount: ${quote['amount']}\n\n"
        f"The customer will contact you shortly."
    )
    
    await app.bot.send_message(chat_id=telegram_id, text=message)

# ==================== Main ====================

def main():
    """Start the bot"""
    application = Application.builder().token(BOT_TOKEN).build()
    
    # Command handlers
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("register", register))
    application.add_handler(CommandHandler("balance", balance))
    application.add_handler(CommandHandler("credits", credits))
    application.add_handler(CommandHandler("jobs", jobs))
    
    # Callback handlers
    application.add_handler(CallbackQueryHandler(button_callback))
    
    # Message handlers
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    
    logger.info("🤖 Q-MÉTIER Telegram Bot started!")
    application.run_polling()

if __name__ == "__main__":
    main()
