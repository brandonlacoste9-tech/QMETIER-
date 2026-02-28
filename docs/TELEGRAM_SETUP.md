# Telegram Bot Setup Guide

## Step 1: Create Your Bot

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` command
3. Choose a name: `Q-MÉTIER Professional Bot`
4. Choose a username: `qmetier_pro_bot` (must end with 'bot')
5. Copy the bot token (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

## Step 2: Configure Environment

Add to your `.env` file:
```bash
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_BOT_URL=http://telegram-bot:8080
```

## Step 3: Start the Bot

### Local Development
```bash
cd telegram-bot
pip install -r requirements.txt
python bot.py
```

### Docker
```bash
cd infra
docker compose up telegram-bot
```

## Step 4: Test the Bot

1. Open Telegram and search for your bot username
2. Send `/start` command
3. Register with `/register`
4. Test commands: `/balance`, `/jobs`, `/credits`

## Bot Commands Reference

| Command | Description |
|---------|-------------|
| `/start` | Welcome message and introduction |
| `/register` | Create professional profile |
| `/balance` | Check current credit balance |
| `/credits` | Purchase credit packs |
| `/jobs` | View available matching jobs |
| `/help` | Show all commands |

## User Flows

### Registration
```
User: /register
Bot: Please send your info in this format:
     Name: John Smith
     Email: john@example.com
     Skills: plumbing, repair
     Location: 37.7749,-122.4194
User: [sends formatted info]
Bot: ✅ Registration complete!
```

### Job Notification
```
Bot: 🔔 New Job Match!
     🔨 Fix leaking kitchen sink
     📍 2.3 miles away
     🎯 Match Score: 94%
     [Submit Quote] [View Details]
User: [taps Submit Quote]
Bot: Reply with your quote:
     Amount: 150.00
     Message: I can fix this today
User: [sends quote]
Bot: ✅ Quote submitted! 1 credit deducted.
```

### Credit Purchase
```
User: /credits
Bot: 💳 Select a credit pack:
     [12 Credits - $17.99]
     [24 Credits - $34.99]
     [60 Credits - $84.99]
User: [taps 12 Credits]
Bot: ✅ Payment link created!
     Click here: https://checkout.stripe.com/...
```

## Troubleshooting

### Bot not responding
- Check bot token is correct
- Verify bot service is running: `docker ps | grep telegram-bot`
- Check logs: `docker logs telegram-bot`

### Notifications not working
- Verify TELEGRAM_BOT_URL in API .env
- Check webhook server is running on port 8080
- Test notification endpoint: `curl http://localhost:8080/health`

### Registration fails
- Verify API is accessible from bot container
- Check database connection
- Ensure Professional model has telegram_id field

## Security Notes

- Never commit bot token to git
- Use environment variables for sensitive data
- Validate all user inputs
- Rate limit commands to prevent abuse
- Use webhook signature verification for production
