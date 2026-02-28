"""Background verification and identity check endpoints"""
import os
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import VerificationRecord, Professional, VerificationStatus, VerificationTier
from datetime import datetime, timedelta
import requests

router = APIRouter()

CERTN_API_KEY = os.getenv("CERTN_API_KEY")
CERTN_API_URL = os.getenv("CERTN_API_URL", "https://api.certn.co/v1")


@router.post("/initiate/{professional_id}")
async def initiate_verification(
    professional_id: str,
    tier: str = "tier_1",
    db: Session = Depends(get_db)
):
    """Initiate verification process for a professional"""
    # Verify professional exists
    professional = db.query(Professional).filter(
        Professional.id == professional_id
    ).first()
    if not professional:
        raise HTTPException(status_code=404, detail="Professional not found")
    
    # Check if verification already exists
    existing = db.query(VerificationRecord).filter(
        VerificationRecord.professional_id == professional_id,
        VerificationRecord.status == VerificationStatus.PENDING
    ).first()
    
    if existing:
        return {
            "verification_id": str(existing.id),
            "status": "pending",
            "message": "Verification already in progress"
        }
    
    # Create verification record
    verification = VerificationRecord(
        professional_id=professional_id,
        tier=VerificationTier.TIER_1 if tier == "tier_1" else VerificationTier.TIER_2,
        status=VerificationStatus.PENDING
    )
    db.add(verification)
    db.commit()
    db.refresh(verification)
    
    # TODO: Integrate with Certn API
    # For now, return mock response
    return {
        "verification_id": str(verification.id),
        "status": "pending",
        "verification_url": f"https://verify.qmetier.ca/{verification.id}",
        "message": "Verification initiated. Check your email for next steps."
    }


@router.post("/webhook")
async def verification_webhook(payload: dict, db: Session = Depends(get_db)):
    """Handle Certn webhook events"""
    # TODO: Validate webhook signature
    
    # Extract data from payload
    applicant_id = payload.get("applicant_id")
    status = payload.get("status")
    report_id = payload.get("report_id")
    
    # Find verification record
    verification = db.query(VerificationRecord).filter(
        VerificationRecord.certn_applicant_id == applicant_id
    ).first()
    
    if not verification:
        return {"status": "error", "message": "Verification not found"}
    
    # Update verification status
    if status == "completed":
        verification.status = VerificationStatus.VERIFIED
        verification.identity_verified = 1
        verification.identity_verified_at = datetime.utcnow()
        verification.certn_report_id = report_id
        
        # Set badge level based on tier
        if verification.tier == VerificationTier.TIER_1:
            verification.badge_level = "bronze"
            verification.checks_completed = ["identity"]
        elif verification.tier == VerificationTier.TIER_2:
            verification.badge_level = "silver"
            verification.checks_completed = ["identity", "criminal_record"]
        
        # Set expiration (1 year)
        verification.expires_at = datetime.utcnow() + timedelta(days=365)
        
    elif status == "failed":
        verification.status = VerificationStatus.FAILED
    
    db.commit()
    
    # TODO: Send notification to professional
    
    return {"status": "success"}


@router.get("/status/{professional_id}")
async def get_verification_status(
    professional_id: str,
    db: Session = Depends(get_db)
):
    """Get verification status for a professional"""
    professional = db.query(Professional).filter(
        Professional.id == professional_id
    ).first()
    
    if not professional:
        raise HTTPException(status_code=404, detail="Professional not found")
    
    # Get latest verification record
    verification = db.query(VerificationRecord).filter(
        VerificationRecord.professional_id == professional_id
    ).order_by(VerificationRecord.created_at.desc()).first()
    
    if not verification:
        return {
            "professional_id": professional_id,
            "status": "not_started",
            "badge_level": "none",
            "verified": False
        }
    
    # Check if expired
    if verification.expires_at and verification.expires_at < datetime.utcnow():
        verification.status = VerificationStatus.EXPIRED
        verification.badge_level = "none"
        db.commit()
    
    return {
        "professional_id": professional_id,
        "verification_id": str(verification.id),
        "status": verification.status.value,
        "tier": verification.tier.value,
        "badge_level": verification.badge_level,
        "verified": verification.status == VerificationStatus.VERIFIED,
        "identity_verified": verification.identity_verified == 1,
        "identity_verified_at": verification.identity_verified_at,
        "background_check_status": verification.background_check_status,
        "checks_completed": verification.checks_completed,
        "expires_at": verification.expires_at,
        "created_at": verification.created_at
    }


@router.post("/upgrade/{professional_id}")
async def upgrade_to_tier_2(
    professional_id: str,
    db: Session = Depends(get_db)
):
    """Upgrade professional to Tier 2 verification (paid)"""
    professional = db.query(Professional).filter(
        Professional.id == professional_id
    ).first()
    
    if not professional:
        raise HTTPException(status_code=404, detail="Professional not found")
    
    # Get current verification
    verification = db.query(VerificationRecord).filter(
        VerificationRecord.professional_id == professional_id,
        VerificationRecord.status == VerificationStatus.VERIFIED
    ).first()
    
    if not verification:
        raise HTTPException(
            status_code=400,
            detail="Must complete Tier 1 verification first"
        )
    
    if verification.tier == VerificationTier.TIER_2:
        return {
            "message": "Already at Tier 2",
            "badge_level": verification.badge_level
        }
    
    # TODO: Create Stripe payment session for $25
    # For now, just upgrade
    verification.tier = VerificationTier.TIER_2
    verification.badge_level = "silver"
    verification.checks_completed.append("criminal_record")
    db.commit()
    
    return {
        "message": "Upgraded to Tier 2",
        "badge_level": "silver",
        "payment_required": True,
        "amount": 25.00
    }
