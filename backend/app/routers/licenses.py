"""Professional license management endpoints"""
import os
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import ProfessionalLicense, Professional, LicenseStatus, LicenseType
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

router = APIRouter()


class LicenseCreate(BaseModel):
    professional_id: str
    license_type: str
    license_number: str
    issuing_authority: str
    expiry_date: str
    categories_covered: Optional[List[str]] = []


class LicenseResponse(BaseModel):
    id: str
    license_type: str
    license_number: str
    status: str
    expiry_date: str
    verified_at: Optional[str]


@router.post("/upload")
async def upload_license(
    license_data: LicenseCreate,
    db: Session = Depends(get_db)
):
    """Upload a professional license for verification"""
    # Verify professional exists
    professional = db.query(Professional).filter(
        Professional.id == license_data.professional_id
    ).first()
    if not professional:
        raise HTTPException(status_code=404, detail="Professional not found")
    
    # Check if license already exists
    existing = db.query(ProfessionalLicense).filter(
        ProfessionalLicense.professional_id == license_data.professional_id,
        ProfessionalLicense.license_number == license_data.license_number
    ).first()
    
    if existing:
        raise HTTPException(
            status_code=400,
            detail="License already uploaded"
        )
    
    # Create license record
    license_record = ProfessionalLicense(
        professional_id=license_data.professional_id,
        license_type=LicenseType[license_data.license_type.upper()],
        license_number=license_data.license_number,
        issuing_authority=license_data.issuing_authority,
        expiry_date=datetime.fromisoformat(license_data.expiry_date),
        categories_covered=license_data.categories_covered,
        status=LicenseStatus.PENDING
    )
    
    db.add(license_record)
    db.commit()
    db.refresh(license_record)
    
    # TODO: Trigger automated verification
    # verify_license_with_authority(license_record)
    
    return {
        "license_id": str(license_record.id),
        "status": "pending",
        "message": "License submitted for verification. This usually takes 24-48 hours."
    }


@router.post("/upload-document/{license_id}")
async def upload_license_document(
    license_id: str,
    file: UploadFile = File(...),
    side: str = "front",
    db: Session = Depends(get_db)
):
    """Upload license document photo"""
    license_record = db.query(ProfessionalLicense).filter(
        ProfessionalLicense.id == license_id
    ).first()
    
    if not license_record:
        raise HTTPException(status_code=404, detail="License not found")
    
    # TODO: Upload to S3/storage
    # For now, just save filename
    filename = f"licenses/{license_id}_{side}_{file.filename}"
    
    if side == "front":
        license_record.document_front_url = filename
    elif side == "back":
        license_record.document_back_url = filename
    else:
        license_record.document_url = filename
    
    db.commit()
    
    return {
        "message": "Document uploaded successfully",
        "filename": filename
    }


@router.get("/professional/{professional_id}")
async def get_professional_licenses(
    professional_id: str,
    db: Session = Depends(get_db)
):
    """Get all licenses for a professional"""
    licenses = db.query(ProfessionalLicense).filter(
        ProfessionalLicense.professional_id == professional_id
    ).all()
    
    return {
        "professional_id": professional_id,
        "licenses": [
            {
                "id": str(lic.id),
                "type": lic.license_type.value,
                "number": lic.license_number[-4:].rjust(len(lic.license_number), '*'),  # Mask number
                "status": lic.status.value,
                "expiry_date": lic.expiry_date.isoformat(),
                "verified": lic.status == LicenseStatus.VERIFIED,
                "categories_covered": lic.categories_covered
            }
            for lic in licenses
        ]
    }


@router.get("/verify/{license_id}")
async def verify_license(
    license_id: str,
    db: Session = Depends(get_db)
):
    """Check license verification status"""
    license_record = db.query(ProfessionalLicense).filter(
        ProfessionalLicense.id == license_id
    ).first()
    
    if not license_record:
        raise HTTPException(status_code=404, detail="License not found")
    
    # Check if expired
    if license_record.expiry_date < datetime.utcnow():
        license_record.status = LicenseStatus.EXPIRED
        db.commit()
    
    return {
        "license_id": str(license_record.id),
        "status": license_record.status.value,
        "verified": license_record.status == LicenseStatus.VERIFIED,
        "expiry_date": license_record.expiry_date.isoformat(),
        "days_until_expiry": (license_record.expiry_date - datetime.utcnow()).days
    }


@router.post("/admin/approve/{license_id}")
async def approve_license(
    license_id: str,
    admin_id: str,
    db: Session = Depends(get_db)
):
    """Admin: Approve a license"""
    license_record = db.query(ProfessionalLicense).filter(
        ProfessionalLicense.id == license_id
    ).first()
    
    if not license_record:
        raise HTTPException(status_code=404, detail="License not found")
    
    license_record.status = LicenseStatus.VERIFIED
    license_record.verified_at = datetime.utcnow()
    license_record.verified_by = admin_id
    
    db.commit()
    
    # TODO: Send notification to professional
    
    return {
        "message": "License approved",
        "license_id": str(license_record.id)
    }


@router.post("/admin/reject/{license_id}")
async def reject_license(
    license_id: str,
    admin_id: str,
    reason: str,
    db: Session = Depends(get_db)
):
    """Admin: Reject a license"""
    license_record = db.query(ProfessionalLicense).filter(
        ProfessionalLicense.id == license_id
    ).first()
    
    if not license_record:
        raise HTTPException(status_code=404, detail="License not found")
    
    license_record.status = LicenseStatus.REJECTED
    license_record.restrictions = reason
    
    db.commit()
    
    # TODO: Send notification to professional with reason
    
    return {
        "message": "License rejected",
        "license_id": str(license_record.id),
        "reason": reason
    }


@router.get("/check-required/{category_id}")
async def check_license_required(category_id: str):
    """Check if a license is required for a category"""
    # Regulated categories in Quebec
    regulated_categories = {
        "electrical": {"required": True, "types": ["RBQ", "CMEQ"]},
        "plumbing": {"required": True, "types": ["RBQ", "CMMTQ"]},
        "hvac": {"required": True, "types": ["RBQ"]},
        "gas_fitting": {"required": True, "types": ["RBQ"]},
        "general_contracting": {"required": True, "types": ["RBQ"]},
        "roofing": {"required": True, "types": ["RBQ"]},
        "painting": {"required": False, "types": []},
        "carpentry": {"required": False, "types": []},
        "landscaping": {"required": False, "types": []},
        "cleaning": {"required": False, "types": []}
    }
    
    category_info = regulated_categories.get(category_id, {"required": False, "types": []})
    
    return {
        "category_id": category_id,
        "license_required": category_info["required"],
        "accepted_license_types": category_info["types"],
        "message": "License required by Quebec law" if category_info["required"] else "No license required"
    }


def verify_rbq_license(license_number: str) -> dict:
    """Verify RBQ license with official database"""
    # TODO: Integrate with actual RBQ API
    # For now, return mock response
    return {
        "valid": True,
        "status": "active",
        "expiry_date": "2026-12-31",
        "categories": ["electrical", "general_contracting"],
        "restrictions": []
    }


def verify_cmeq_license(license_number: str) -> dict:
    """Verify CMEQ license"""
    # TODO: Integrate with CMEQ API
    return {
        "valid": True,
        "status": "active",
        "expiry_date": "2026-12-31"
    }


def verify_cmmtq_license(license_number: str) -> dict:
    """Verify CMMTQ license"""
    # TODO: Integrate with CMMTQ API
    return {
        "valid": True,
        "status": "active",
        "expiry_date": "2026-12-31"
    }
