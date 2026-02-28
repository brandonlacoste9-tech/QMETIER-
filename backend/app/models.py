"""SQLAlchemy ORM Models for Q-MÉTIER"""
from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, Enum, DECIMAL, Text, ARRAY
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
import enum
from app.database import Base

class ProjectStatus(str, enum.Enum):
    OPEN = "open"
    MATCHED = "matched"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class QuoteStatus(str, enum.Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    REJECTED = "rejected"
    EXPIRED = "expired"

class PurchaseStatus(str, enum.Enum):
    PENDING = "pending"
    PAID = "paid"
    FAILED = "failed"
    REFUNDED = "refunded"

class Professional(Base):
    __tablename__ = "professionals"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(200), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    telegram_id = Column(String(100), unique=True, nullable=True)  # Telegram user ID
    preferred_language = Column(String(2), default='en')  # 'en' or 'fr'
    rating = Column(Float, default=0.0)
    review_count = Column(Integer, default=0)
    embedding = Column(ARRAY(Float, dimensions=1))  # 768-dimensional vector
    location_lat = Column(Float, nullable=False)
    location_lng = Column(Float, nullable=False)
    skill_tags = Column(ARRAY(String))
    credit_balance = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    quotes = relationship("Quote", back_populates="professional")
    purchases = relationship("CreditPurchase", back_populates="professional")

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    category_id = Column(UUID(as_uuid=True), nullable=False)
    skill_tags = Column(ARRAY(String))
    location_lat = Column(Float, nullable=False)
    location_lng = Column(Float, nullable=False)
    status = Column(Enum(ProjectStatus), default=ProjectStatus.OPEN)
    customer_id = Column(UUID(as_uuid=True), ForeignKey("customers.id"), nullable=False)
    matched_professional_id = Column(UUID(as_uuid=True), ForeignKey("professionals.id"), nullable=True)
    completed_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    customer = relationship("Customer", back_populates="projects")
    quotes = relationship("Quote", back_populates="project")
    reviews = relationship("Review", back_populates="project")

class Quote(Base):
    __tablename__ = "quotes"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    professional_id = Column(UUID(as_uuid=True), ForeignKey("professionals.id"), nullable=False)
    amount = Column(DECIMAL(10, 2), nullable=False)
    credits_required = Column(Integer, default=1)
    message = Column(Text, nullable=False)
    status = Column(Enum(QuoteStatus), default=QuoteStatus.PENDING)
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=False)
    
    project = relationship("Project", back_populates="quotes")
    professional = relationship("Professional", back_populates="quotes")

class CreditPurchase(Base):
    __tablename__ = "credit_purchases"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    professional_id = Column(UUID(as_uuid=True), ForeignKey("professionals.id"), nullable=False)
    plan_id = Column(String(50), nullable=False)
    amount = Column(DECIMAL(10, 2), nullable=False)
    credits = Column(Integer, nullable=False)
    stripe_session_id = Column(String(255), unique=True, nullable=False)
    stripe_payment_intent_id = Column(String(255), nullable=True)
    status = Column(Enum(PurchaseStatus), default=PurchaseStatus.PENDING)
    created_at = Column(DateTime, default=datetime.utcnow)
    paid_at = Column(DateTime, nullable=True)
    
    professional = relationship("Professional", back_populates="purchases")

class Category(Base):
    __tablename__ = "categories"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), unique=True, nullable=False)
    slug = Column(String(100), unique=True, nullable=False)
    description = Column(Text)
    icon_url = Column(String(500), nullable=True)
    parent_id = Column(UUID(as_uuid=True), ForeignKey("categories.id"), nullable=True)

class Customer(Base):
    __tablename__ = "customers"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(200), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phone = Column(String(20), nullable=True)
    rating = Column(Float, default=0.0)  # Average rating from professionals
    review_count = Column(Integer, default=0)
    preferred_language = Column(String(2), default='en')
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    projects = relationship("Project", back_populates="customer")
    reviews_given = relationship("Review", foreign_keys="Review.reviewer_id", back_populates="reviewer")
    reviews_received = relationship("Review", foreign_keys="Review.reviewee_id", back_populates="reviewee")

class Review(Base):
    __tablename__ = "reviews"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    reviewer_id = Column(UUID(as_uuid=True), nullable=False)  # Can be customer or professional
    reviewee_id = Column(UUID(as_uuid=True), nullable=False)  # Can be customer or professional
    reviewer_type = Column(String(20), nullable=False)  # 'customer' or 'professional'
    reviewee_type = Column(String(20), nullable=False)  # 'customer' or 'professional'
    rating = Column(Integer, nullable=False)  # 1-5 stars
    title = Column(String(200), nullable=True)
    comment = Column(Text, nullable=True)
    response = Column(Text, nullable=True)  # Reviewee can respond
    is_verified = Column(Boolean, default=True)  # Verified if project was completed
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    project = relationship("Project", back_populates="reviews")
    reviewer = relationship("Customer", foreign_keys=[reviewer_id], back_populates="reviews_given")
    reviewee = relationship("Customer", foreign_keys=[reviewee_id], back_populates="reviews_received")


class VerificationStatus(str, enum.Enum):
    PENDING = "pending"
    VERIFIED = "verified"
    FAILED = "failed"
    EXPIRED = "expired"


class VerificationTier(str, enum.Enum):
    TIER_1 = "tier_1"  # Basic ID verification (free)
    TIER_2 = "tier_2"  # Full background check (paid)


class VerificationRecord(Base):
    __tablename__ = "verification_records"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    professional_id = Column(UUID(as_uuid=True), ForeignKey("professionals.id"), nullable=False)
    
    # Status
    status = Column(Enum(VerificationStatus), default=VerificationStatus.PENDING)
    tier = Column(Enum(VerificationTier), default=VerificationTier.TIER_1)
    
    # Identity verification (Tier 1)
    identity_verified = Column(Integer, default=0)  # 0=no, 1=yes
    identity_verified_at = Column(DateTime, nullable=True)
    identity_provider = Column(String(50), default="certn")
    
    # Background check (Tier 2)
    background_check_status = Column(String(20), nullable=True)  # "clear", "flagged", "pending"
    background_check_completed_at = Column(DateTime, nullable=True)
    background_check_report_id = Column(String(255), nullable=True)
    
    # Certn integration
    certn_applicant_id = Column(String(255), nullable=True)
    certn_report_id = Column(String(255), nullable=True)
    
    # Details
    checks_completed = Column(ARRAY(String), default=[])
    badge_level = Column(String(20), default="none")  # "none", "bronze", "silver", "gold"
    
    # Expiration
    expires_at = Column(DateTime, nullable=True)
    last_renewed_at = Column(DateTime, nullable=True)
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship
    professional = relationship("Professional", backref="verification_records")



class LicenseStatus(str, enum.Enum):
    PENDING = "pending"
    VERIFIED = "verified"
    REJECTED = "rejected"
    EXPIRED = "expired"
    SUSPENDED = "suspended"


class LicenseType(str, enum.Enum):
    RBQ = "rbq"
    CMEQ = "cmeq"
    CMMTQ = "cmmtq"
    RED_SEAL = "red_seal"
    OTHER = "other"


class ProfessionalLicense(Base):
    __tablename__ = "professional_licenses"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    professional_id = Column(UUID(as_uuid=True), ForeignKey("professionals.id"), nullable=False)
    
    # License details
    license_type = Column(Enum(LicenseType), nullable=False)
    license_number = Column(String(100), nullable=False)
    issuing_authority = Column(String(100), nullable=False)
    issue_date = Column(DateTime, nullable=True)
    expiry_date = Column(DateTime, nullable=False)
    
    # Verification
    status = Column(Enum(LicenseStatus), default=LicenseStatus.PENDING)
    verified_at = Column(DateTime, nullable=True)
    verified_by = Column(String(100), nullable=True)  # Admin user ID
    
    # Documents
    document_url = Column(String(500), nullable=True)  # S3/storage URL
    document_front_url = Column(String(500), nullable=True)
    document_back_url = Column(String(500), nullable=True)
    
    # Categories covered
    categories_covered = Column(ARRAY(String), default=[])
    restrictions = Column(Text, nullable=True)
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship
    professional = relationship("Professional", backref="licenses")
