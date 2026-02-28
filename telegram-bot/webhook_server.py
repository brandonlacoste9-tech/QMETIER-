#!/usr/bin/env python3
"""
Webhook server for receiving notifications from the main API
"""
from fastapi import FastAPI
from pydantic import BaseModel
from bot import notify_new_match, notify_quote_accepted
from telegram.ext import Application
import os

app = FastAPI()

BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
telegram_app = Application.builder().token(BOT_TOKEN).build()

class NotificationPayload(BaseModel):
    telegram_id: int
    type: str
    project: dict = None
    quote: dict = None

@app.post("/notify")
async def receive_notification(payload: NotificationPayload):
    """Receive notification from API and forward to Telegram user"""
    if payload.type == "new_match":
        await notify_new_match(payload.telegram_id, payload.project, telegram_app)
    elif payload.type == "quote_accepted":
        await notify_quote_accepted(payload.telegram_id, payload.quote, telegram_app)
    
    return {"status": "sent"}

@app.get("/health")
async def health():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
