# Stripe Quick Start - Get Your Keys Now!

Since you already have a Stripe account, let's get you set up in 5 minutes:

---

## 1. Get Your API Keys (2 minutes)

### Go to Stripe Dashboard:
👉 https://dashboard.stripe.com/test/apikeys

### Copy These Keys:

**Publishable Key** (safe to expose in frontend):
```
pk_test_51...
```

**Secret Key** (NEVER expose, backend only):
```
sk_test_51...
```

---

## 2. Add to .env File (1 minute)

Create a `.env` file in your project root:

```bash
# Copy from .env.example
cp .env.example .env
```

Then edit `.env` and replace:

```bash
# Stripe (Get from: https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_KEY_HERE
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
BASE_URL=http://localhost:3000
```

---

## 3. Set Up Webhook (2 minutes)

### Option A: Local Testing (Stripe CLI)

**Install Stripe CLI**:
```bash
# Windows
scoop install stripe

# Mac
brew install stripe/stripe-cli/stripe

# Or download from: https://github.com/stripe/stripe-cli/releases
```

**Login and Forward Webhooks**:
```bash
stripe login
stripe listen --forward-to localhost:8000/credits/webhook
```

**Copy the webhook secret** (starts with `whsec_...`) and add to `.env`

### Option B: Skip for Now
You can test payments without webhooks, but credits won't be added automatically.

---

## 4. Test It! (30 seconds)

**Start your backend**:
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Test purchase endpoint**:
```bash
curl -X POST http://localhost:8000/credits/purchase \
  -H "Content-Type: application/json" \
  -d '{
    "professional_id": "test-123",
    "plan_id": "12-pack"
  }'
```

You should get back a Stripe Checkout URL!

**Open the URL in browser and use test card**:
- Card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

---

## 5. Verify It Works

After completing test payment:

1. Check Stripe Dashboard → Payments (should see $17.99)
2. Check your webhook logs (if using Stripe CLI)
3. Check your database (credits should be added)

---

## Your Current Setup:

```
✅ Stripe account (you have this)
⏳ API keys (get from dashboard)
⏳ .env file (create and add keys)
⏳ Webhook (optional for testing)
✅ Backend code (already done)
✅ Frontend code (already done)
```

---

## Need Help?

**Can't find API keys?**
- Go to: https://dashboard.stripe.com/test/apikeys
- Make sure "Test mode" toggle is ON (top right)

**Webhook not working?**
- Skip it for now, test payments still work
- Credits just won't be added automatically
- Set up later when deploying to production

**Want to go live?**
- Switch "Test mode" to OFF in Stripe Dashboard
- Get live keys (pk_live_... and sk_live_...)
- Update .env with live keys
- Set up production webhook endpoint

---

## What's Next?

Once Stripe is working:
1. ✅ Test all 3 credit packs (12, 24, 60)
2. ✅ Test verification upgrade payment ($25)
3. ✅ Deploy to production
4. ✅ Switch to live keys
5. ✅ Make real money! 💰

---

**Ready to paste your keys?** Just update the `.env` file and you're good to go!

**Q-MÉTIER** - Powered by Stripe 💳  
Built with ❤️ in Quebec, Canada 🇨🇦
