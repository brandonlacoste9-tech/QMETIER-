"""Professional profile management endpoints"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Professional
from app.schemas import ProfessionalCreate, ProfessionalUpdate, Professional as ProfessionalSchema

router = APIRouter()

@router.post("/", response_model=ProfessionalSchema)
async def create_professional(professional: ProfessionalCreate, db: Session = Depends(get_db)):
    """Register a new professional"""
    # Check if email already exists
    existing = db.query(Professional).filter(Professional.email == professional.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    db_professional = Professional(**professional.dict())
    db.add(db_professional)
    db.commit()
    db.refresh(db_professional)
    return db_professional

@router.get("/{professional_id}", response_model=ProfessionalSchema)
async def get_professional(professional_id: str, db: Session = Depends(get_db)):
    """Get professional profile"""
    professional = db.query(Professional).filter(Professional.id == professional_id).first()
    if not professional:
        raise HTTPException(status_code=404, detail="Professional not found")
    return professional

@router.put("/{professional_id}", response_model=ProfessionalSchema)
async def update_professional(
    professional_id: str,
    update: ProfessionalUpdate,
    db: Session = Depends(get_db)
):
    """Update professional profile"""
    professional = db.query(Professional).filter(Professional.id == professional_id).first()
    if not professional:
        raise HTTPException(status_code=404, detail="Professional not found")
    
    for key, value in update.dict(exclude_unset=True).items():
        setattr(professional, key, value)
    
    db.commit()
    db.refresh(professional)
    return professional
