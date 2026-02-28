"""Review and rating endpoints"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
from app.database import get_db
from app.models import Review, Professional, Customer, Project
from app.schemas import ReviewCreate, Review as ReviewSchema, ReviewResponse
from datetime import datetime

router = APIRouter()

@router.post("/", response_model=ReviewSchema)
async def create_review(review: ReviewCreate, db: Session = Depends(get_db)):
    """Create a review after project completion"""
    # Verify project exists and is completed
    project = db.query(Project).filter(Project.id == review.project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    if project.status != "completed":
        raise HTTPException(status_code=400, detail="Can only review completed projects")
    
    # Check if review already exists
    existing = db.query(Review).filter(
        Review.project_id == review.project_id,
        Review.reviewer_id == review.reviewer_id,
        Review.reviewee_id == review.reviewee_id
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Review already exists")
    
    # Create review
    db_review = Review(**review.dict())
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    
    # Update reviewee's rating
    await update_rating(review.reviewee_id, review.reviewee_type, db)
    
    return db_review

@router.post("/{review_id}/response")
async def add_response(review_id: str, response: str, db: Session = Depends(get_db)):
    """Add a response to a review"""
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    review.response = response
    review.updated_at = datetime.utcnow()
    db.commit()
    
    return {"message": "Response added successfully"}

@router.get("/professional/{professional_id}", response_model=List[ReviewSchema])
async def get_professional_reviews(
    professional_id: str,
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """Get all reviews for a professional"""
    reviews = db.query(Review).filter(
        Review.reviewee_id == professional_id,
        Review.reviewee_type == "professional"
    ).order_by(Review.created_at.desc()).offset(skip).limit(limit).all()
    
    return reviews

@router.get("/customer/{customer_id}", response_model=List[ReviewSchema])
async def get_customer_reviews(
    customer_id: str,
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """Get all reviews for a customer"""
    reviews = db.query(Review).filter(
        Review.reviewee_id == customer_id,
        Review.reviewee_type == "customer"
    ).order_by(Review.created_at.desc()).offset(skip).limit(limit).all()
    
    return reviews

@router.get("/project/{project_id}", response_model=List[ReviewSchema])
async def get_project_reviews(project_id: str, db: Session = Depends(get_db)):
    """Get all reviews for a project (both directions)"""
    reviews = db.query(Review).filter(Review.project_id == project_id).all()
    return reviews

async def update_rating(user_id: str, user_type: str, db: Session):
    """Recalculate and update user's average rating"""
    # Get all reviews for this user
    reviews = db.query(Review).filter(
        Review.reviewee_id == user_id,
        Review.reviewee_type == user_type
    ).all()
    
    if not reviews:
        return
    
    # Calculate average
    avg_rating = sum(r.rating for r in reviews) / len(reviews)
    review_count = len(reviews)
    
    # Update user record
    if user_type == "professional":
        user = db.query(Professional).filter(Professional.id == user_id).first()
    else:
        user = db.query(Customer).filter(Customer.id == user_id).first()
    
    if user:
        user.rating = round(avg_rating, 2)
        user.review_count = review_count
        db.commit()

@router.get("/stats/{user_id}")
async def get_rating_stats(user_id: str, user_type: str, db: Session = Depends(get_db)):
    """Get detailed rating statistics"""
    reviews = db.query(Review).filter(
        Review.reviewee_id == user_id,
        Review.reviewee_type == user_type
    ).all()
    
    if not reviews:
        return {
            "average_rating": 0,
            "total_reviews": 0,
            "rating_distribution": {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
        }
    
    # Calculate distribution
    distribution = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
    for review in reviews:
        distribution[review.rating] += 1
    
    return {
        "average_rating": round(sum(r.rating for r in reviews) / len(reviews), 2),
        "total_reviews": len(reviews),
        "rating_distribution": distribution,
        "recent_reviews": reviews[:5]  # Last 5 reviews
    }
