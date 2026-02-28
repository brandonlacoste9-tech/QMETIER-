# Q-MÉTIER Telegram Bot

Telegram bot for professionals to receive job notifications and manage their Q-MÉTIER profile.

## Setup

1. Create a bot with @BotFather on Telegram
2. Get your bot token
3. Set environment variable: `TELEGRAM_BOT_TOKEN=your_token_here`
4. Run: `python bot.py`

## Commands

- `/start` - Welcome and introduction
- `/register` - Create professional profile
- `/balance` - Check credit balance
- `/credits` - Purchase credit packs
- `/jobs` - View available jobs
- `/help` - Show all commands

## Features

- Push notifications for new job matches
- One-tap quote submission
- Inline credit purchases
- Real-time job alerts
- Customer communication

## Docker

```bash
docker build -t qmetier-telegram-bot .
docker run -e TELEGRAM_BOT_TOKEN=your_token qmetier-telegram-bot
```
