"""Telegram integration endpoints"""
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Professional, Project
from pydantic import BaseModel
import httpx
import os

router = APIRouter()

TELEGRAM_BOT_URL = os.getenv("TELEGRAM_BOT_URL", "http://telegram-bot:8080")

class NotificationRequest(BaseModel):
    telegram_id: int
    project_id: str
    notification_type: str  # "new_match", "quote_accepted", "message"

@router.post("/notify")
async def send_notification(
    notification: NotificationRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Send notification to professional via Telegram"""
    professional = db.query(Professional).filter(
        Professional.telegram_id == notification.telegram_id
    ).first()
    
    if not professional:
        raise HTTPException(status_code=404, detail="Professional not found")
    
    project = db.query(Project).filter(Project.id == notification.project_id).first()
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Send notification asynchronously
    background_tasks.add_task(
        send_telegram_notification,
        notification.telegram_id,
        notification.notification_type,
        project
    )
    
    return {"status": "notification_queued"}

async def send_telegram_notification(telegram_id: int, notification_type: str, project: dict):
    """Send notification via Telegram bot webhook"""
    async with httpx.AsyncClient() as client:
        await client.post(
            f"{TELEGRAM_BOT_URL}/notify",
            json={
                "telegram_id": telegram_id,
                "type": notification_type,
                "project": project
            }
        )

@router.get("/professionals/telegram/{telegram_id}")
async def get_professional_by_telegram(telegram_id: int, db: Session = Depends(get_db)):
    """Get professional profile by Telegram ID"""
    professional = db.query(Professional).filter(
        Professional.telegram_id == telegram_id
    ).first()
    
    if not professional:
        raise HTTPException(status_code=404, detail="Professional not found")
    
    return {
        "id": professional.id,
        "name": professional.name,
        "email": professional.email,
        "credit_balance": professional.credit_balance,
        "rating": professional.rating,
        "review_count": professional.review_count
    }
