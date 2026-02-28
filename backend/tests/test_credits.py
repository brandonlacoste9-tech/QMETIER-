"""Tests for credit purchase functionality"""
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import get_db, Base, engine
from app.models import Professional, CreditPurchase
from sqlalchemy.orm import Session

client = TestClient(app)

@pytest.fixture
def db_session():
    Base.metadata.create_all(bind=engine)
    db = next(get_db())
    yield db
    db.close()
    Base.metadata.drop_all(bind=engine)

def test_purchase_credits_success(db_session: Session):
    """Test successful credit purchase"""
    # Create professional
    professional = Professional(
        name="Test Pro",
        email="test@example.com",
        location_lat=37.7749,
        location_lng=-122.4194,
        skill_tags=["plumbing"]
    )
    db_session.add(professional)
    db_session.commit()
    
    # Purchase credits
    response = client.post("/credits/purchase", json={
        "professional_id": str(professional.id),
        "plan_id": "12-pack"
    })
    
    assert response.status_code == 200
    data = response.json()
    assert "session_url" in data
    assert "purchase_id" in data

def test_purchase_invalid_plan():
    """Test purchase with invalid plan_id"""
    response = client.post("/credits/purchase", json={
        "professional_id": "00000000-0000-0000-0000-000000000000",
        "plan_id": "invalid-pack"
    })
    
    assert response.status_code == 422  # Validation error

def test_insufficient_credits(db_session: Session):
    """Test quote submission with insufficient credits"""
    professional = Professional(
        name="Test Pro",
        email="test2@example.com",
        location_lat=37.7749,
        location_lng=-122.4194,
        skill_tags=["plumbing"],
        credit_balance=0
    )
    db_session.add(professional)
    db_session.commit()
    
    response = client.post("/quotes/", json={
        "project_id": "00000000-0000-0000-0000-000000000000",
        "professional_id": str(professional.id),
        "amount": "100.00",
        "message": "I can help with this project",
        "credits_required": 1
    })
    
    assert response.status_code == 402
