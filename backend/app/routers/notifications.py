"""Email notification system"""
import os
from fastapi import APIRouter, BackgroundTasks
from pydantic import BaseModel, EmailStr
from typing import Optional
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

router = APIRouter()

# Email configuration
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
FROM_EMAIL = os.getenv("FROM_EMAIL", "noreply@qmetier.ca")


class EmailNotification(BaseModel):
    to_email: EmailStr
    subject: str
    body_html: str
    body_text: Optional[str] = None


def send_email(notification: EmailNotification):
    """Send email via SMTP"""
    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = notification.subject
        msg['From'] = FROM_EMAIL
        msg['To'] = notification.to_email
        
        # Add text and HTML parts
        if notification.body_text:
            part1 = MIMEText(notification.body_text, 'plain')
            msg.attach(part1)
        
        part2 = MIMEText(notification.body_html, 'html')
        msg.attach(part2)
        
        # Send email
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            if SMTP_USER and SMTP_PASSWORD:
                server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(msg)
        
        return True
    except Exception as e:
        print(f"Email send error: {e}")
        return False


@router.post("/send")
async def send_notification(
    notification: EmailNotification,
    background_tasks: BackgroundTasks
):
    """Send email notification (async)"""
    background_tasks.add_task(send_email, notification)
    return {"status": "queued", "message": "Email queued for sending"}


# Notification templates
def quote_received_email(customer_email: str, project_title: str, professional_name: str):
    """Email when customer receives a quote"""
    subject = f"New Quote for {project_title}"
    html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #2563eb; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Q-MÉTIER</h1>
        </div>
        <div style="padding: 30px; background-color: #f9fafb;">
          <h2 style="color: #1f2937;">New Quote Received!</h2>
          <p style="color: #4b5563; font-size: 16px;">
            <strong>{professional_name}</strong> has submitted a quote for your project:
          </p>
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2563eb; margin-top: 0;">{project_title}</h3>
            <p style="color: #6b7280;">Log in to view the quote details and accept or reject.</p>
          </div>
          <a href="https://qmetier.ca/dashboard" 
             style="display: inline-block; background-color: #2563eb; color: white; 
                    padding: 12px 24px; text-decoration: none; border-radius: 6px; 
                    font-weight: bold; margin-top: 10px;">
            View Quote
          </a>
        </div>
        <div style="background-color: #e5e7eb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
          <p>Q-MÉTIER - Connecting Quebec's Trades</p>
          <p>Built with ❤️ in Quebec, Canada 🇨🇦</p>
        </div>
      </body>
    </html>
    """
    return EmailNotification(to_email=customer_email, subject=subject, body_html=html)


def quote_accepted_email(professional_email: str, project_title: str, customer_name: str):
    """Email when professional's quote is accepted"""
    subject = f"Quote Accepted: {project_title}"
    html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #10b981; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Q-MÉTIER</h1>
        </div>
        <div style="padding: 30px; background-color: #f9fafb;">
          <h2 style="color: #1f2937;">🎉 Congratulations!</h2>
          <p style="color: #4b5563; font-size: 16px;">
            <strong>{customer_name}</strong> has accepted your quote!
          </p>
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #10b981; margin-top: 0;">{project_title}</h3>
            <p style="color: #6b7280;">Log in to view customer contact details and arrange the work.</p>
          </div>
          <a href="https://qmetier.ca/dashboard" 
             style="display: inline-block; background-color: #10b981; color: white; 
                    padding: 12px 24px; text-decoration: none; border-radius: 6px; 
                    font-weight: bold; margin-top: 10px;">
            View Project
          </a>
        </div>
        <div style="background-color: #e5e7eb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
          <p>Q-MÉTIER - Connecting Quebec's Trades</p>
          <p>Built with ❤️ in Quebec, Canada 🇨🇦</p>
        </div>
      </body>
    </html>
    """
    return EmailNotification(to_email=professional_email, subject=subject, body_html=html)


def credit_purchase_confirmation(professional_email: str, credits: int, amount: float):
    """Email confirmation for credit purchase"""
    subject = "Credit Purchase Confirmation"
    html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #2563eb; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Q-MÉTIER</h1>
        </div>
        <div style="padding: 30px; background-color: #f9fafb;">
          <h2 style="color: #1f2937;">Purchase Confirmed</h2>
          <p style="color: #4b5563; font-size: 16px;">
            Your credit purchase was successful!
          </p>
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <table style="width: 100%; color: #4b5563;">
              <tr>
                <td style="padding: 8px 0;"><strong>Credits Purchased:</strong></td>
                <td style="text-align: right; font-size: 20px; color: #2563eb; font-weight: bold;">{credits}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Amount Paid:</strong></td>
                <td style="text-align: right;">${amount:.2f} CAD</td>
              </tr>
            </table>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            Your credits are now available in your account. Use them to submit quotes and grow your business!
          </p>
          <a href="https://qmetier.ca/dashboard" 
             style="display: inline-block; background-color: #2563eb; color: white; 
                    padding: 12px 24px; text-decoration: none; border-radius: 6px; 
                    font-weight: bold; margin-top: 10px;">
            View Dashboard
          </a>
        </div>
        <div style="background-color: #e5e7eb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
          <p>Q-MÉTIER - Connecting Quebec's Trades</p>
          <p>Built with ❤️ in Quebec, Canada 🇨🇦</p>
        </div>
      </body>
    </html>
    """
    return EmailNotification(to_email=professional_email, subject=subject, body_html=html)


def verification_complete_email(professional_email: str, badge_level: str):
    """Email when verification is complete"""
    subject = "Verification Complete"
    badge_emoji = {"bronze": "🥉", "silver": "🥈", "gold": "🥇"}.get(badge_level, "✅")
    html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #10b981; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Q-MÉTIER</h1>
        </div>
        <div style="padding: 30px; background-color: #f9fafb;">
          <h2 style="color: #1f2937;">{badge_emoji} Verification Complete!</h2>
          <p style="color: #4b5563; font-size: 16px;">
            Congratulations! Your identity verification is complete.
          </p>
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">{badge_emoji}</div>
            <h3 style="color: #10b981; margin: 10px 0;">{badge_level.title()} Badge</h3>
            <p style="color: #6b7280;">Your profile now displays a verified badge, increasing customer trust.</p>
          </div>
          <a href="https://qmetier.ca/dashboard" 
             style="display: inline-block; background-color: #10b981; color: white; 
                    padding: 12px 24px; text-decoration: none; border-radius: 6px; 
                    font-weight: bold; margin-top: 10px;">
            View Profile
          </a>
        </div>
        <div style="background-color: #e5e7eb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
          <p>Q-MÉTIER - Connecting Quebec's Trades</p>
          <p>Built with ❤️ in Quebec, Canada 🇨🇦</p>
        </div>
      </body>
    </html>
    """
    return EmailNotification(to_email=professional_email, subject=subject, body_html=html)
