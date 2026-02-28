"""Tests for bilingual support"""
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

def test_professional_language_preference(db_session: Session):
    """Test storing language preference"""
    professional = Professional(
        name="Jean Tremblay",
        email="jean@example.com",
        preferred_language="fr",
        location_lat=45.5017,
        location_lng=-73.5673,
        skill_tags=["plomberie", "réparation"]
    )
    db_session.add(professional)
    db_session.commit()
    
    # Verify language is stored
    saved = db_session.query(Professional).filter(
        Professional.email == "jean@example.com"
    ).first()
    
    assert saved.preferred_language == "fr"

def test_default_language_english(db_session: Session):
    """Test default language is English"""
    professional = Professional(
        name="John Smith",
        email="john@example.com",
        location_lat=43.6532,
        location_lng=-79.3832,
        skill_tags=["plumbing"]
    )
    db_session.add(professional)
    db_session.commit()
    
    saved = db_session.query(Professional).filter(
        Professional.email == "john@example.com"
    ).first()
    
    assert saved.preferred_language == "en"
