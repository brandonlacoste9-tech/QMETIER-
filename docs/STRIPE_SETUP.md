# Q-MÉTIER Stripe Integration Guide

**Complete guide to setting up Stripe payments for Q-MÉTIER**

---

## Overview

Q-MÉTIER uses Stripe for:
- Credit pack purchases (professionals buy credits)
- Verification upgrade payments (Tier 2 background checks)
- Future: Premium subscriptions

**We do NOT use Stripe for**:
- Customer-to-professional payments (those are direct)

---

## Step 1: Create Stripe Account

1. Go to https://stripe.com
2. Click "Start now" or "Sign up"
3. Choose "Canada" as your country
4. Enter business details:
   - Business name: Q-MÉTIER
   - Business type: Technology/Software
   - Industry: Marketplace
   - Website: qmetier.ca

---

## Step 2: Get API Keys

### Test Mode (Development)
1. Log in to Stripe Dashboard
2. Click "Developers" in left sidebar
3. Click "API keys"
4. Copy:
   - **Publishable key**: `pk_test_...`
   - **Secret key**: `sk_test_...`

### Live Mode (Production)
1. Toggle "Test mode" to OFF (top right)
2. Copy:
   - **Publishable key**: `pk_live_...`
   - **Secret key**: `sk_live_...`

---

## Step 3: Configure Environment Variables

Add to your `.env` file:

```bash
# Stripe Keys (Test Mode)
STRIPE_SECRET_KEY=sk_test_51Abc...
STRIPE_PUBLISHABLE_KEY=pk_test_51Abc...
STRIPE_WEBHOOK_SECRET=whsec_...

# Base URL
BASE_URL=http://localhost:3000

# For Production, use:
# STRIPE_SECRET_KEY=sk_live_51Abc...
# STRIPE_PUBLISHABLE_KEY=pk_live_51Abc...
# BASE_URL=https://qmetier.ca
```

---

## Step 4: Set Up Products (Optional)

You can pre-create products in Stripe Dashboard:

1. Go to "Products" in Stripe Dashboard
2. Click "+ Add product"
3. Create three products:

**12-Credit Pack**:
- Name: "12 Credits"
- Description: "12 quote submission credits"
- Price: $17.99 CAD
- Recurring: No (one-time)

**24-Credit Pack**:
- Name: "24 Credits"
- Description: "24 quote submission credits"
- Price: $34.99 CAD
- Recurring: No (one-time)

**60-Credit Pack**:
- Name: "60 Credits"
- Description: "60 quote submission credits"
- Price: $84.99 CAD
- Recurring: No (one-time)

**Note**: Our code creates products dynamically, so this step is optional.

---

## Step 5: Set Up Webhooks

### Local Development (Using Stripe CLI)

1. **Install Stripe CLI**:
   ```bash
   # Windows (PowerShell)
   scoop install stripe
   
   # Mac
   brew install stripe/stripe-cli/stripe
   
   # Linux
   wget https://github.com/stripe/stripe-cli/releases/download/v1.19.0/stripe_1.19.0_linux_x86_64.tar.gz
   tar -xvf stripe_1.19.0_linux_x86_64.tar.gz
   ```

2. **Login to Stripe**:
   ```bash
   stripe login
   ```

3. **Forward webhooks to local server**:
   ```bash
   stripe listen --forward-to localhost:8000/credits/webhook
   ```

4. **Copy webhook secret**:
   - The CLI will output: `whsec_...`
   - Add to `.env`: `STRIPE_WEBHOOK_SECRET=whsec_...`

### Production (Stripe Dashboard)

1. Go to "Developers" → "Webhooks"
2. Click "+ Add endpoint"
3. Enter endpoint URL: `https://qmetier.ca/credits/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click "Add endpoint"
6. Copy "Signing secret": `whsec_...`
7. Add to production `.env`

---

## Step 6: Test the Integration

### Test Credit Purchase

1. Start your backend:
   ```bash
   cd backend
   uvicorn app.main:app --reload
   ```

2. Start Stripe webhook forwarding:
   ```bash
   stripe listen --forward-to localhost:8000/credits/webhook
   ```

3. Make a test purchase:
   ```bash
   curl -X POST http://localhost:8000/credits/purchase \
     -H "Content-Type: application/json" \
     -d '{
       "professional_id": "test-pro-id",
       "plan_id": "12-pack"
     }'
   ```

4. You'll get a Stripe Checkout URL
5. Open it in browser
6. Use test card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

7. Complete payment
8. Check webhook logs - you should see `checkout.session.completed`
9. Verify credits were added to professional's account

---

## Step 7: Stripe Test Cards

Use these for testing different scenarios:

| Card Number | Scenario |
|-------------|----------|
| 4242 4242 4242 4242 | Success |
| 4000 0025 0000 3155 | Requires authentication (3D Secure) |
| 4000 0000 0000 9995 | Declined (insufficient funds) |
| 4000 0000 0000 0002 | Declined (generic) |
| 4000 0000 0000 0069 | Expired card |
| 4000 0000 0000 0127 | Incorrect CVC |

---

## Step 8: Frontend Integration

The frontend is already set up! Here's how it works:

### Credit Purchase Flow

```typescript
// frontend/pages/credits.tsx
const handlePurchase = async (planId: string) => {
  // 1. Call backend to create Stripe session
  const response = await fetch('/api/credits/purchase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      professional_id: userId,
      plan_id: planId
    })
  });
  
  const { session_url } = await response.json();
  
  // 2. Redirect to Stripe Checkout
  window.location.href = session_url;
};
```

### Success/Cancel Pages

Create these pages:

**frontend/pages/credits/success.tsx**:
```typescript
export default function CreditPurchaseSuccess() {
  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        ✅ Purchase Successful!
      </h1>
      <p className="text-gray-600 mb-8">
        Your credits have been added to your account.
      </p>
      <a href="/dashboard" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
        Go to Dashboard
      </a>
    </div>
  );
}
```

**frontend/pages/credits/cancel.tsx**:
```typescript
export default function CreditPurchaseCancel() {
  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Purchase Cancelled
      </h1>
      <p className="text-gray-600 mb-8">
        Your purchase was cancelled. No charges were made.
      </p>
      <a href="/credits" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
        Try Again
      </a>
    </div>
  );
}
```

---

## Step 9: Security Best Practices

### Protect Your Secret Key
- ❌ NEVER commit `sk_live_...` to Git
- ❌ NEVER expose secret key in frontend
- ✅ Store in environment variables only
- ✅ Use `.env` file (already in `.gitignore`)

### Verify Webhook Signatures
```python
# Already implemented in backend/app/routers/credits.py
try:
    event = stripe.Webhook.construct_event(
        payload, sig_header, WEBHOOK_SECRET
    )
except stripe.error.SignatureVerificationError:
    raise HTTPException(status_code=400, detail="Invalid signature")
```

### Use HTTPS in Production
- Stripe requires HTTPS for webhooks
- Use Let's Encrypt for free SSL certificates

---

## Step 10: Go Live Checklist

Before switching to live mode:

- [ ] Test all payment flows
- [ ] Test webhook handling
- [ ] Test refund scenarios (if applicable)
- [ ] Verify email notifications work
- [ ] Check database transactions are atomic
- [ ] Review Stripe Dashboard settings
- [ ] Enable fraud detection (Stripe Radar)
- [ ] Set up email receipts in Stripe
- [ ] Configure tax settings (if applicable)
- [ ] Switch to live API keys
- [ ] Update webhook endpoint to production URL
- [ ] Test one real transaction with small amount

---

## Troubleshooting

### Webhook Not Receiving Events

**Problem**: Payments succeed but credits not added

**Solutions**:
1. Check webhook endpoint is accessible:
   ```bash
   curl https://qmetier.ca/credits/webhook
   ```

2. Check Stripe Dashboard → Webhooks → View logs

3. Verify webhook secret matches:
   ```bash
   echo $STRIPE_WEBHOOK_SECRET
   ```

4. Check backend logs for errors

### Payment Succeeds But Credits Not Added

**Problem**: Stripe shows payment but database not updated

**Solutions**:
1. Check webhook logs in Stripe Dashboard
2. Check backend logs for database errors
3. Verify `checkout.session.completed` event is enabled
4. Check database connection is working
5. Verify transaction is committed:
   ```python
   db.commit()  # Must be called!
   ```

### "Invalid API Key" Error

**Problem**: `stripe.error.AuthenticationError`

**Solutions**:
1. Verify API key starts with `sk_test_` or `sk_live_`
2. Check no extra spaces in `.env` file
3. Restart backend after changing `.env`
4. Verify key is from correct Stripe account

---

## Monitoring & Analytics

### Stripe Dashboard

Monitor these metrics:
- Total revenue
- Successful payments
- Failed payments
- Refunds
- Disputes/chargebacks

### Custom Analytics

Track in your database:
- Average purchase amount
- Most popular credit pack
- Purchase frequency per professional
- Credit usage rate
- Revenue per professional

---

## Pricing Strategy

### Current Pricing
- 12 credits: $17.99 ($1.50/credit)
- 24 credits: $34.99 ($1.46/credit) - 3% discount
- 60 credits: $84.99 ($1.42/credit) - 5% discount

### Optimization Tips
1. **A/B test pricing**: Try different price points
2. **Add more tiers**: Consider 6-pack ($9.99) for new users
3. **Bulk discounts**: Offer 100-pack for power users
4. **Promotions**: First-time buyer discount
5. **Seasonal sales**: Black Friday, New Year, etc.

---

## FAQ

**Q: Do we need Stripe Connect?**  
A: No. We only process credit purchases. Customer-to-professional payments are direct.

**Q: What about refunds?**  
A: Handled manually through Stripe Dashboard. Our policy is NO REFUNDS except technical errors.

**Q: Can professionals use credits across multiple accounts?**  
A: No. Credits are tied to one professional account and non-transferable.

**Q: What currency do we use?**  
A: CAD (Canadian Dollars). Stripe handles currency conversion automatically.

**Q: Do we need PCI compliance?**  
A: No. Stripe handles all card data. We never see or store card numbers.

**Q: What about taxes?**  
A: Configure in Stripe Dashboard → Settings → Tax. Stripe can auto-calculate Canadian taxes.

---

## Summary

**Stripe Integration Status**: ✅ COMPLETE

**What's Implemented**:
- Credit pack purchases
- Webhook handling
- Automatic credit addition
- Email confirmations
- Refund tracking

**What's NOT Implemented** (and we don't need):
- Stripe Connect (no escrow needed)
- Subscriptions (future feature)
- Invoicing (not needed for credits)

**Next Steps**:
1. Get Stripe account
2. Add API keys to `.env`
3. Test with Stripe CLI
4. Deploy to production
5. Switch to live keys
6. Make money! 💰

---

**Q-MÉTIER** - Powered by Stripe  
Built with ❤️ in Quebec, Canada 🇨🇦
