"""Credit pack purchase and management endpoints"""
import os
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import CreditPurchase, Professional, PurchaseStatus
from app.schemas import CreditPurchaseCreate, StripeSessionResponse
import stripe

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")
BASE_URL = os.getenv("BASE_URL", "http://localhost:3000")

router = APIRouter()

CREDIT_PLANS = {
    "12-pack": {"credits": 12, "amount": 17.99},
    "24-pack": {"credits": 24, "amount": 34.99},
    "60-pack": {"credits": 60, "amount": 84.99}
}

@router.post("/purchase", response_model=StripeSessionResponse)
async def purchase_credits(
    purchase_data: CreditPurchaseCreate,
    db: Session = Depends(get_db)
):
    """Create Stripe Checkout Session for credit purchase"""
    # Validate plan
    if purchase_data.plan_id not in CREDIT_PLANS:
        raise HTTPException(status_code=400, detail="Invalid plan_id")
    
    plan = CREDIT_PLANS[purchase_data.plan_id]
    
    # Verify professional exists
    professional = db.query(Professional).filter(
        Professional.id == purchase_data.professional_id
    ).first()
    if not professional:
        raise HTTPException(status_code=404, detail="Professional not found")
    
    # Create purchase record
    purchase = CreditPurchase(
        professional_id=purchase_data.professional_id,
        plan_id=purchase_data.plan_id,
        amount=plan["amount"],
        credits=plan["credits"],
        stripe_session_id="pending",  # Will update after Stripe session creation
        status=PurchaseStatus.PENDING
    )
    db.add(purchase)
    db.commit()
    db.refresh(purchase)
    
    # Create Stripe Checkout Session
    try:
        session = stripe.checkout.Session.create(
            mode="payment",
            line_items=[{
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": f"{purchase_data.plan_id} Credit Pack",
                        "description": f"{plan['credits']} credits for Q-MÉTIER"
                    },
                    "unit_amount": int(plan["amount"] * 100)
                },
                "quantity": 1
            }],
            metadata={
                "purchase_id": str(purchase.id),
                "professional_id": str(purchase_data.professional_id)
            },
            success_url=f"{BASE_URL}/credits/success",
            cancel_url=f"{BASE_URL}/credits"
        )
        
        # Update purchase with session ID
        purchase.stripe_session_id = session.id
        db.commit()
        
        return StripeSessionResponse(
            session_url=session.url,
            purchase_id=purchase.id
        )
    except stripe.error.StripeError as e:
        db.delete(purchase)
        db.commit()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    """Handle Stripe webhook events"""
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, WEBHOOK_SECRET
        )
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")
    
    # Handle payment_intent.succeeded
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        purchase_id = session["metadata"]["purchase_id"]
        
        # Find purchase
        purchase = db.query(CreditPurchase).filter(
            CreditPurchase.id == purchase_id
        ).first()
        
        if not purchase:
            return {"status": "error", "message": "Purchase not found"}
        
        # Update purchase status
        purchase.status = PurchaseStatus.PAID
        purchase.stripe_payment_intent_id = session.get("payment_intent")
        from datetime import datetime
        purchase.paid_at = datetime.utcnow()
        
        # Add credits to professional balance (atomic)
        professional = db.query(Professional).filter(
            Professional.id == purchase.professional_id
        ).with_for_update().first()
        
        professional.credit_balance += purchase.credits
        
        db.commit()
    
    return {"status": "success"}

@router.get("/balance/{professional_id}")
async def get_credit_balance(professional_id: str, db: Session = Depends(get_db)):
    """Get current credit balance for a professional"""
    professional = db.query(Professional).filter(
        Professional.id == professional_id
    ).first()
    
    if not professional:
        raise HTTPException(status_code=404, detail="Professional not found")
    
    return {
        "professional_id": professional.id,
        "credit_balance": professional.credit_balance
    }
