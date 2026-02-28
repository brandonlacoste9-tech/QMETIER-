"""Quote submission and management endpoints"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.database import get_db
from app.models import Quote, Professional, Project, QuoteStatus
from app.schemas import QuoteCreate, Quote as QuoteSchema

router = APIRouter()

@router.post("/", response_model=QuoteSchema)
async def submit_quote(quote: QuoteCreate, db: Session = Depends(get_db)):
    """Submit a quote (requires sufficient credits)"""
    # Verify professional has sufficient credits
    professional = db.query(Professional).filter(
        Professional.id == quote.professional_id
    ).with_for_update().first()
    
    if not professional:
        raise HTTPException(status_code=404, detail="Professional not found")
    
    if professional.credit_balance < quote.credits_required:
        raise HTTPException(
            status_code=402,
            detail=f"Insufficient credits. Required: {quote.credits_required}, Available: {professional.credit_balance}"
        )
    
    # Verify project exists
    project = db.query(Project).filter(Project.id == quote.project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Deduct credits
    professional.credit_balance -= quote.credits_required
    
    # Create quote
    db_quote = Quote(
        **quote.dict(),
        expires_at=datetime.utcnow() + timedelta(days=7)
    )
    db.add(db_quote)
    db.commit()
    db.refresh(db_quote)
    
    return db_quote

@router.post("/{quote_id}/accept")
async def accept_quote(quote_id: str, db: Session = Depends(get_db)):
    """Accept a quote"""
    quote = db.query(Quote).filter(Quote.id == quote_id).first()
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    
    if quote.status != QuoteStatus.PENDING:
        raise HTTPException(status_code=400, detail="Quote is not pending")
    
    # Update quote status
    quote.status = QuoteStatus.ACCEPTED
    
    # Update project
    project = db.query(Project).filter(Project.id == quote.project_id).first()
    project.matched_professional_id = quote.professional_id
    project.status = "matched"
    
    db.commit()
    db.refresh(quote)
    
    return quote

@router.get("/project/{project_id}")
async def get_project_quotes(project_id: str, db: Session = Depends(get_db)):
    """Get all quotes for a project"""
    quotes = db.query(Quote).filter(Quote.project_id == project_id).all()
    return quotes
