# Q-MÉTIER Payment Flow & Revenue Model

## How Money Flows Through the Platform

### Simple Overview

Q-MÉTIER makes money from **credit pack sales only**. We do NOT take a commission on the actual work between customers and professionals.

```
Customer → Posts Project (FREE)
Professional → Buys Credits → Submits Quote (costs 1 credit)
Customer → Accepts Quote
Customer → Pays Professional DIRECTLY (cash, e-transfer, etc.)
Q-MÉTIER → NOT involved in this payment
```

---

## Revenue Sources

### 1. Credit Pack Sales (Primary Revenue)

Professionals buy credits to submit quotes:

| Pack | Price | Credits | Stripe Fee | Net Profit |
|------|-------|---------|------------|------------|
| Small | $17.99 | 12 | $0.54 | $17.45 |
| Medium | $34.99 | 24 | $1.05 | $33.94 |
| Large | $84.99 | 60 | $2.55 | $82.44 |

**Stripe Fee Calculation**: 2.9% + $0.30 per transaction

**Example**: 
- Professional buys 24-pack for $34.99
- Stripe takes: ($34.99 × 0.029) + $0.30 = $1.05
- Q-MÉTIER receives: $34.99 - $1.05 = $33.94

### 2. Verification Upgrades (Secondary Revenue)

Two-tier verification system:

#### Tier 1: Basic ID Verification (FREE for professionals)
- Photo of government ID + live selfie
- AI biometric matching
- **Cost to Q-MÉTIER**: $1.50 per professional
- **Cost to Professional**: FREE (required for all)
- **Badge**: Basic "Verified" ✓

#### Tier 2: Full Background Check (PAID by professionals)
- Everything in Tier 1 PLUS:
- Criminal record check (CPIC database)
- Quebec SOQUIJ database search
- License verification
- **Cost to Q-MÉTIER**: $20 (Certn API)
- **Price to Professional**: $25
- **Profit per Upgrade**: $5
- **Badge**: Premium "Trusted Pro" 🥇

**Why professionals pay for Tier 2**:
- Premium badge increases trust
- Higher visibility in search results
- More quote acceptances
- Worth the investment for serious pros

### 3. Future Revenue Streams (Not Yet Implemented)

- Premium subscriptions: $20-50/month
- Featured listings: $10-30/month
- Advertising: Sponsored categories
- Insurance partnerships: Referral fees

---

## Complete Payment Flow

### Step 1: Professional Buys Credits

```
1. Professional clicks "Buy Credits" in app or Telegram
2. Selects pack (12, 24, or 60 credits)
3. Redirected to Stripe Checkout
4. Enters payment info
5. Stripe processes payment
6. Money goes to Q-MÉTIER bank account
7. Webhook confirms payment
8. Credits added to professional's balance
9. Professional receives confirmation
```

**Technical Implementation**:
- Endpoint: `POST /credits/purchase`
- Creates Stripe Checkout Session
- Stores purchase record in database
- Webhook: `POST /credits/webhook`
- Updates credit balance atomically

**Code Location**: `backend/app/routers/credits.py`

### Step 2: Professional Submits Quote

```
1. Professional sees project notification
2. Clicks "Submit Quote"
3. System checks credit balance
4. If balance >= 1:
   - Deduct 1 credit
   - Submit quote
   - Notify customer
5. If balance < 1:
   - Show "Buy Credits" prompt
   - Cannot submit quote
```

**Important**: No money changes hands here. The professional already paid for credits in Step 1.

**Code Location**: `backend/app/routers/quotes.py`

### Step 3: Customer Accepts Quote

```
1. Customer reviews quotes
2. Checks professional ratings/reviews
3. Accepts a quote
4. Gets professional's contact info
5. Arranges work details
6. Pays professional DIRECTLY
```

**Payment Methods (Customer → Professional)**:
- Cash
- Interac e-Transfer
- Cheque
- Credit card (if pro has terminal)
- PayPal/Venmo (if agreed)

**Q-MÉTIER is NOT involved in this payment**. We don't:
- Hold money in escrow
- Process customer payments
- Take a commission
- Handle refunds/disputes

### Step 4: Work Completion & Reviews

```
1. Professional completes work
2. Customer marks project as "Completed"
3. Both parties can leave reviews
4. Ratings update automatically
```

---

## Cost Structure

### Per Professional Costs

| Item | Cost | Frequency |
|------|------|-----------|
| Tier 1 ID Verification | $1.50 | One-time (signup) |
| Hosting (database, storage) | $0.50 | Per month |
| Support (customer service) | $1.00 | Per month |
| **Total Monthly Cost** | **~$3.00** | Per active pro |

### Platform Costs (Fixed)

| Item | Cost | Frequency |
|------|------|-----------|
| Server hosting (Kubernetes) | $200 | Per month |
| Database (PostgreSQL) | $100 | Per month |
| Redis cache | $50 | Per month |
| Monitoring (Prometheus) | $50 | Per month |
| Domain & SSL | $20 | Per month |
| **Total Fixed Costs** | **$420** | Per month |

**Break-even**: Need ~140 active professionals to cover fixed costs ($420 ÷ $3 = 140)

---

## Profit Calculations

### Per Professional (Monthly Average)

**Assumptions**:
- Average professional submits 20 quotes/month
- Needs to buy credits 1-2 times/month
- Average spend: $30/month

**Revenue**: $30 (credit purchases)
**Costs**: $3 (hosting + support)
**Profit**: $27 per professional per month

### Platform Scale Examples

#### Small Scale (500 professionals)
- Revenue: 500 × $30 = $15,000/month
- Variable costs: 500 × $3 = $1,500/month
- Fixed costs: $420/month
- **Net profit**: $13,080/month ($157,000/year)

#### Medium Scale (2,000 professionals)
- Revenue: 2,000 × $30 = $60,000/month
- Variable costs: 2,000 × $3 = $6,000/month
- Fixed costs: $420/month
- **Net profit**: $53,580/month ($643,000/year)

#### Large Scale (10,000 professionals)
- Revenue: 10,000 × $30 = $300,000/month
- Variable costs: 10,000 × $3 = $30,000/month
- Fixed costs: $420/month
- **Net profit**: $269,580/month ($3.2M/year)

---

## Why This Model Works

### Advantages

1. **Simple & Transparent**
   - Professionals know exactly what they pay
   - No hidden fees or commissions
   - Clear value proposition

2. **Low Friction**
   - Customers don't pay to post projects
   - No escrow complexity
   - Direct payment is familiar

3. **Scalable**
   - Revenue grows with professional count
   - Costs grow linearly
   - High profit margins (80%+)

4. **Fair to All Parties**
   - Professionals control their spending
   - Customers get free access
   - Platform earns predictable revenue

5. **Cash Flow Positive**
   - Professionals pay upfront for credits
   - No payment processing delays
   - No chargebacks on actual work

### Comparison to Commission Model

| Aspect | Q-MÉTIER (Credits) | Thumbtack (Commission) |
|--------|-------------------|------------------------|
| Professional pays | $1.50 per quote | 15-25% of job value |
| Customer pays | Nothing | Nothing |
| Payment processing | Not involved | Not involved |
| Predictability | High (fixed cost) | Low (varies by job) |
| Professional preference | ✅ Prefer | ❌ Dislike |

**Example**: $1,000 plumbing job
- Q-MÉTIER: Professional pays $1.50 (0.15%)
- Thumbtack: Professional pays $150-250 (15-25%)

---

## Verification Revenue Details

### Tier 1: Basic ID Verification

**Who Pays**: Q-MÉTIER (platform)
**Cost**: $1.50 per professional
**When**: During signup (required)
**Provider**: Certn API
**What's Checked**:
- Government ID photo
- Live selfie
- Biometric face matching
- ID authenticity

**Why we pay**:
- Required for platform trust
- One-time cost
- Prevents fraud
- Industry standard

### Tier 2: Full Background Check

**Who Pays**: Professional (optional upgrade)
**Cost to Professional**: $25
**Cost to Q-MÉTIER**: $20 (Certn API)
**Profit**: $5 per upgrade
**When**: After signup (optional)
**Provider**: Certn API
**What's Checked**:
- Everything in Tier 1
- Criminal record (CPIC)
- Quebec SOQUIJ database
- License verification
- Employment history

**Why professionals pay**:
- Premium "Trusted Pro" badge 🥇
- Higher search ranking
- More customer trust
- More quote acceptances
- ROI: Pays for itself in 1-2 jobs

**Conversion Rate Estimate**: 30-40% of professionals upgrade
- 1,000 professionals × 35% = 350 upgrades
- 350 × $5 profit = $1,750 additional revenue

---

## Financial Projections

### Year 1 (Quebec Launch)

| Quarter | Professionals | Monthly Revenue | Monthly Profit |
|---------|--------------|-----------------|----------------|
| Q1 | 100 | $3,000 | $2,280 |
| Q2 | 500 | $15,000 | $13,080 |
| Q3 | 1,500 | $45,000 | $40,080 |
| Q4 | 3,000 | $90,000 | $81,080 |

**Year 1 Total Profit**: ~$550,000

### Year 2 (Canada-Wide)

| Quarter | Professionals | Monthly Revenue | Monthly Profit |
|---------|--------------|-----------------|----------------|
| Q1 | 5,000 | $150,000 | $135,420 |
| Q2 | 8,000 | $240,000 | $217,080 |
| Q3 | 12,000 | $360,000 | $324,420 |
| Q4 | 15,000 | $450,000 | $405,420 |

**Year 2 Total Profit**: ~$3.2M

---

## Key Metrics to Track

### Revenue Metrics
- Monthly Recurring Revenue (MRR)
- Average Revenue Per Professional (ARPU)
- Credit pack conversion rate
- Tier 2 upgrade rate
- Churn rate

### Cost Metrics
- Customer Acquisition Cost (CAC)
- Cost per verification
- Hosting cost per professional
- Support cost per ticket

### Profitability Metrics
- Gross margin (should be 80%+)
- Net margin (should be 70%+)
- Payback period (should be < 3 months)
- Lifetime Value (LTV) / CAC ratio (should be > 3:1)

---

## FAQ

### Q: Why don't you take a commission on the actual work?

**A**: Several reasons:
1. Professionals hate commissions (see Thumbtack complaints)
2. We'd need to process payments (complexity, liability)
3. We'd need escrow (holding money, disputes)
4. Credit model is simpler and more predictable
5. Higher profit margins with less risk

### Q: What if a professional buys credits but never uses them?

**A**: That's pure profit for us. Credits don't expire, but unused credits are essentially free money. However, we want professionals to succeed, so we'll send reminders and tips to help them use credits effectively.

### Q: What if a customer and professional have a payment dispute?

**A**: Not our problem. Since we don't process the payment, we're not liable. We can:
- Provide mediation/advice
- Adjust ratings if fraud is proven
- Ban users who repeatedly cause issues
- But we don't handle refunds or chargebacks

### Q: How do you prevent professionals from contacting customers outside the platform?

**A**: We don't. Once a quote is accepted, they can communicate however they want. We've already made our money from the credit purchase. This is actually a feature - less platform lock-in means happier users.

### Q: What's the average quote acceptance rate?

**A**: Industry average is 10-20%. So if a professional submits 20 quotes (20 credits = $30), they should get 2-4 jobs. If each job is worth $500-1,000, that's $1,000-4,000 in revenue for $30 in platform costs. Great ROI.

---

## Summary

**Q-MÉTIER Revenue Model**:
- Professionals buy credits ($17.99 - $84.99)
- 1 credit = 1 quote submission
- Customers pay professionals directly
- Platform earns ~$27/month per professional
- Optional verification upgrades add $5 profit each
- 80%+ profit margins
- Scalable to millions in revenue

**Key Insight**: We're selling access to customers, not taking a cut of the work. This aligns our incentives with professionals (we want them to succeed) and keeps the model simple.

---

**Last Updated**: February 28, 2026
**Document Owner**: Q-MÉTIER Finance Team
