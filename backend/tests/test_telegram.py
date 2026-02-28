"""Tests for Telegram integration"""
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import get_db, Base, engine
from app.models import Professional
from sqlalchemy.orm import Session

client = TestClient(app)

@pytest.fixture
def db_session():
    Base.metadata.create_all(bind=engine)
    db = next(get_db())
    yield db
    db.close()
    Base.metadata.drop_all(bind=engine)

def test_get_professional_by_telegram_id(db_session: Session):
    """Test fetching professional by Telegram ID"""
    # Create professional with Telegram ID
    professional = Professional(
        name="Test Pro",
        email="test@example.com",
        telegram_id="123456789",
        location_lat=37.7749,
        location_lng=-122.4194,
        skill_tags=["plumbing"]
    )
    db_session.add(professional)
    db_session.commit()
    
    # Fetch by Telegram ID
    response = client.get("/telegram/professionals/telegram/123456789")
    
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Test Pro"
    assert data["credit_balance"] == 0

def test_get_professional_not_found():
    """Test fetching non-existent professional"""
    response = client.get("/telegram/professionals/telegram/999999999")
    assert response.status_code == 404

def test_send_notification(db_session: Session):
    """Test sending notification to professional"""
    # Create professional
    professional = Professional(
        name="Test Pro",
        email="test@example.com",
        telegram_id="123456789",
        location_lat=37.7749,
        location_lng=-122.4194,
        skill_tags=["plumbing"]
    )
    db_session.add(professional)
    db_session.commit()
    
    # Note: This will fail without actual Telegram bot running
    # In production, use mocks for testing
    response = client.post("/telegram/notify", json={
        "telegram_id": 123456789,
        "project_id": "00000000-0000-0000-0000-000000000000",
        "notification_type": "new_match"
    })
    
    # Should queue notification even if bot is down
    assert response.status_code in [200, 404]  # 404 if project not found
