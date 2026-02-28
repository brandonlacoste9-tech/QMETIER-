"""Tests for review and rating system"""
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import get_db, Base, engine
from app.models import Professional, Customer, Project, Review
from sqlalchemy.orm import Session

client = TestClient(app)

@pytest.fixture
def db_session():
    Base.metadata.create_all(bind=engine)
    db = next(get_db())
    yield db
    db.close()
    Base.metadata.drop_all(bind=engine)

def test_create_review(db_session: Session):
    """Test creating a review"""
    # Create customer
    customer = Customer(
        name="John Doe",
        email="john@example.com"
    )
    db_session.add(customer)
    
    # Create professional
    professional = Professional(
        name="Jane Pro",
        email="jane@example.com",
        location_lat=43.6532,
        location_lng=-79.3832,
        skill_tags=["plumbing"]
    )
    db_session.add(professional)
    
    # Create completed project
    project = Project(
        title="Fix sink",
        description="Leaking sink",
        category_id="00000000-0000-0000-0000-000000000000",
        skill_tags=["plumbing"],
        location_lat=43.6532,
        location_lng=-79.3832,
        status="completed",
        customer_id=customer.id,
        matched_professional_id=professional.id
    )
    db_session.add(project)
    db_session.commit()
    
    # Create review
    response = client.post("/reviews/", json={
        "project_id": str(project.id),
        "reviewer_id": str(customer.id),
        "reviewee_id": str(professional.id),
        "reviewer_type": "customer",
        "reviewee_type": "professional",
        "rating": 5,
        "title": "Excellent work!",
        "comment": "Very professional and quick"
    })
    
    assert response.status_code == 200
    data = response.json()
    assert data["rating"] == 5

def test_rating_calculation(db_session: Session):
    """Test that ratings are calculated correctly"""
    professional = Professional(
        name="Test Pro",
        email="test@example.com",
        location_lat=43.6532,
        location_lng=-79.3832,
        skill_tags=["plumbing"]
    )
    db_session.add(professional)
    db_session.commit()
    
    # Add multiple reviews
    ratings = [5, 4, 5, 3, 4]
    for rating in ratings:
        review = Review(
            project_id="00000000-0000-0000-0000-000000000000",
            reviewer_id="00000000-0000-0000-0000-000000000000",
            reviewee_id=professional.id,
            reviewer_type="customer",
            reviewee_type="professional",
            rating=rating
        )
        db_session.add(review)
    
    db_session.commit()
    
    # Check average
    expected_avg = sum(ratings) / len(ratings)
    assert professional.rating == round(expected_avg, 2)
    assert professional.review_count == len(ratings)
