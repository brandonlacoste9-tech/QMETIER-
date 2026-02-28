"""Pydantic schemas for request/response validation"""
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime
from decimal import Decimal
from uuid import UUID

# Professional Schemas
class ProfessionalBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=200)
    email: EmailStr
    location_lat: float = Field(..., ge=-90, le=90)
    location_lng: float = Field(..., ge=-180, le=180)
    skill_tags: List[str]

class ProfessionalCreate(ProfessionalBase):
    pass

class ProfessionalUpdate(BaseModel):
    name: Optional[str] = None
    skill_tags: Optional[List[str]] = None

class Professional(ProfessionalBase):
    id: UUID
    rating: float
    review_count: int
    credit_balance: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Project Schemas
class ProjectBase(BaseModel):
    title: str = Field(..., min_length=5, max_length=200)
    description: str = Field(..., min_length=20, max_length=5000)
    category_id: UUID
    skill_tags: List[str] = Field(..., min_items=1)
    location_lat: float = Field(..., ge=-90, le=90)
    location_lng: float = Field(..., ge=-180, le=180)

class ProjectCreate(ProjectBase):
    customer_id: UUID

class Project(ProjectBase):
    id: UUID
    status: str
    customer_id: UUID
    matched_professional_id: Optional[UUID]
    created_at: datetime
    
    class Config:
        from_attributes = True

# Quote Schemas
class QuoteBase(BaseModel):
    project_id: UUID
    amount: Decimal = Field(..., gt=0)
    message: str = Field(..., min_length=10, max_length=1000)
    credits_required: int = Field(default=1, ge=1, le=3)

class QuoteCreate(QuoteBase):
    professional_id: UUID

class Quote(QuoteBase):
    id: UUID
    professional_id: UUID
    status: str
    created_at: datetime
    expires_at: datetime
    
    class Config:
        from_attributes = True

# Credit Schemas
class CreditPurchaseCreate(BaseModel):
    professional_id: UUID
    plan_id: str = Field(..., pattern="^(12-pack|24-pack|60-pack)$")

class CreditPurchase(BaseModel):
    id: UUID
    professional_id: UUID
    plan_id: str
    amount: Decimal
    credits: int
    status: str
    created_at: datetime
    paid_at: Optional[datetime]
    
    class Config:
        from_attributes = True

class StripeSessionResponse(BaseModel):
    session_url: str
    purchase_id: UUID

# Customer Schemas
class CustomerBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=200)
    email: EmailStr
    phone: Optional[str] = None

class CustomerCreate(CustomerBase):
    pass

class Customer(CustomerBase):
    id: UUID
    rating: float
    review_count: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Review Schemas
class ReviewCreate(BaseModel):
    project_id: UUID
    reviewer_id: UUID
    reviewee_id: UUID
    reviewer_type: str = Field(..., pattern="^(customer|professional)$")
    reviewee_type: str = Field(..., pattern="^(customer|professional)$")
    rating: int = Field(..., ge=1, le=5)
    title: Optional[str] = Field(None, max_length=200)
    comment: Optional[str] = Field(None, max_length=2000)

class Review(ReviewCreate):
    id: UUID
    response: Optional[str]
    is_verified: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class ReviewResponse(BaseModel):
    review_id: UUID
    response: str
