# Q-MÉTIER Credit Pack Purchase

Professionals must be able to purchase credit packs to submit quotes.

## Requirements
- Display three credit pack options: 12 ($17.99), 24 ($34.99), 60 ($84.99)
- Integrate Stripe Checkout for payment processing
- Store purchase records in database
- Add credits to professional balance after successful payment
- Handle Stripe webhooks for payment confirmation

## API Endpoints
- POST /credits/purchase - Create Stripe Checkout Session
- POST /credits/webhook - Handle Stripe payment events
- GET /credits/balance - Get current credit balance

## UI Components
- CreditsPage with pack selection cards
- StripeButton component for checkout redirect
- CreditBalance display component

## Database Models
- CreditPurchase (id, professional_id, plan_id, amount, credits, status, stripe_session_id)
- Professional.credit_balance field

## Tests
- Unit tests for purchase creation
- Webhook signature verification
- Credit balance update logic
- Insufficient credits error handling
