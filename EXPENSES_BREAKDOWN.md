# Q-MÉTIER - Complete Expense Breakdown

**Last Updated**: February 28, 2026

---

## 💸 MONTHLY EXPENSES

### Fixed Platform Costs

| Item | Cost/Month | Provider | Notes |
|------|------------|----------|-------|
| **Server Hosting** | $200 | DigitalOcean/AWS | Kubernetes cluster |
| **Database (PostgreSQL)** | $100 | Managed service | With pgvector support |
| **Redis Cache** | $50 | Redis Cloud | Session & caching |
| **Monitoring** | $50 | Prometheus/Grafana | Uptime & alerts |
| **Domain & SSL** | $20 | Namecheap/Cloudflare | qmetier.ca + SSL cert |
| **Email Service** | $30 | SendGrid/Mailgun | Transactional emails |
| **CDN** | $25 | Cloudflare | Static assets |
| **Backup Storage** | $25 | AWS S3 | Database backups |
| **TOTAL FIXED** | **$500/month** | | **$6,000/year** |

### Per-Professional Variable Costs

| Item | Cost | Frequency | Notes |
|------|------|-----------|-------|
| **Tier 1 Verification** | $1.50 | One-time (signup) | Certn ID check |
| **Database Storage** | $0.30 | Per month | Profile + embeddings |
| **Bandwidth** | $0.20 | Per month | API calls |
| **Support** | $1.00 | Per month | Customer service |
| **TOTAL PER PRO** | **~$3/month** | | After initial $1.50 signup |

---

## 📊 COST BY SCALE

### Scenario 1: Small Scale (100 professionals)
**Monthly Costs:**
- Fixed: $500
- Variable: 100 × $3 = $300
- **Total: $800/month** ($9,600/year)

**One-Time Costs:**
- Tier 1 verifications: 100 × $1.50 = $150

**Monthly Revenue (estimated):**
- 100 pros × $30 avg = $3,000/month

**Monthly Profit:**
- $3,000 - $800 = **$2,200/month** ($26,400/year)

---

### Scenario 2: Medium Scale (500 professionals)
**Monthly Costs:**
- Fixed: $500
- Variable: 500 × $3 = $1,500
- **Total: $2,000/month** ($24,000/year)

**One-Time Costs:**
- Tier 1 verifications: 500 × $1.50 = $750

**Monthly Revenue (estimated):**
- 500 pros × $30 avg = $15,000/month

**Monthly Profit:**
- $15,000 - $2,000 = **$13,000/month** ($156,000/year)

---

### Scenario 3: Large Scale (2,000 professionals)
**Monthly Costs:**
- Fixed: $500 (may increase to $800 with more servers)
- Variable: 2,000 × $3 = $6,000
- **Total: $6,500/month** ($78,000/year)

**One-Time Costs:**
- Tier 1 verifications: 2,000 × $1.50 = $3,000

**Monthly Revenue (estimated):**
- 2,000 pros × $30 avg = $60,000/month

**Monthly Profit:**
- $60,000 - $6,500 = **$53,500/month** ($642,000/year)

---

### Scenario 4: Very Large Scale (10,000 professionals)
**Monthly Costs:**
- Fixed: $1,200 (scaled infrastructure)
- Variable: 10,000 × $3 = $30,000
- **Total: $31,200/month** ($374,400/year)

**One-Time Costs:**
- Tier 1 verifications: 10,000 × $1.50 = $15,000

**Monthly Revenue (estimated):**
- 10,000 pros × $30 avg = $300,000/month

**Monthly Profit:**
- $300,000 - $31,200 = **$268,800/month** ($3.2M/year)

---

## 🚀 LAUNCH EXPENSES (One-Time)

### Pre-Launch Setup

| Item | Cost | Notes |
|------|------|-------|
| **Business Registration** | $300 | Quebec incorporation |
| **Legal Review** | $2,000 | Terms, privacy policy review |
| **Logo & Branding** | $500 | Already have logo |
| **Initial Marketing Materials** | $1,000 | Website copy, graphics |
| **Domain Purchase** | $50 | qmetier.ca for 3 years |
| **Stripe Setup** | $0 | Free to set up |
| **Telegram Bot Setup** | $0 | Free |
| **Initial Testing** | $500 | Test transactions, QA |
| **TOTAL PRE-LAUNCH** | **$4,350** | |

### First 6 Months Marketing (Quebec Launch)

| Month | Budget | Focus | Expected Professionals |
|-------|--------|-------|----------------------|
| **Month 1** | $15,000 | Montreal beta | 50 |
| **Month 2** | $20,000 | Montreal expansion | 100 |
| **Month 3** | $25,000 | Quebec City + Laval | 250 |
| **Month 4** | $30,000 | Rest of Quebec | 400 |
| **Month 5** | $35,000 | Consolidation | 600 |
| **Month 6** | $25,000 | Optimization | 800 |
| **TOTAL** | **$150,000** | 6-month campaign | 800 pros |

**Marketing Breakdown:**
- Facebook/Instagram Ads: 40% ($60,000)
- Google Ads: 30% ($45,000)
- Partnerships: 15% ($22,500)
- PR/Media: 10% ($15,000)
- Events/Sponsorships: 5% ($7,500)

---

## 💰 REVENUE BREAKDOWN

### Credit Pack Sales (Primary Revenue)

**Stripe Fees:**
- 2.9% + $0.30 per transaction

| Pack | Price | Stripe Fee | Net Revenue |
|------|-------|------------|-------------|
| 12 credits | $17.99 | $0.54 | $17.45 |
| 24 credits | $34.99 | $1.05 | $33.94 |
| 60 credits | $84.99 | $2.55 | $82.44 |

**Average Professional Spending:**
- Submits ~20 quotes/month
- Buys credits 1-2 times/month
- **Average: $30/month per professional**

### Verification Upgrades (Secondary Revenue)

| Tier | Professional Pays | You Pay (Certn) | Your Profit |
|------|------------------|-----------------|-------------|
| Tier 1 | $0 (FREE) | $1.50 | -$1.50 (cost) |
| Tier 2 | $25 | $20 | $5 |

**Tier 2 Conversion Rate:** ~30-40% of professionals

**Example with 1,000 professionals:**
- 350 upgrade to Tier 2
- 350 × $5 profit = $1,750 additional revenue

---

## 📈 BREAK-EVEN ANALYSIS

### Monthly Break-Even Point

**Fixed costs:** $500/month

**Revenue per professional:** $30/month
**Cost per professional:** $3/month
**Net profit per professional:** $27/month

**Break-even calculation:**
- $500 ÷ $27 = **19 professionals**

**You need just 19 active professionals to break even on operating costs!**

### Total Break-Even (Including Marketing)

**Total investment needed:**
- Pre-launch: $4,350
- 6-month marketing: $150,000
- 6 months operating costs: ~$15,000
- **Total: $169,350**

**At $27 profit per professional per month:**
- Need 6,272 professional-months
- With 800 professionals after 6 months
- 800 × $27 = $21,600/month profit
- Break-even in ~8 months from launch

---

## 🎯 YEAR 1 FINANCIAL PROJECTION

### Revenue

| Quarter | Professionals | Monthly Revenue | Quarterly Revenue |
|---------|--------------|-----------------|-------------------|
| Q1 | 100 | $3,000 | $9,000 |
| Q2 | 500 | $15,000 | $45,000 |
| Q3 | 1,500 | $45,000 | $135,000 |
| Q4 | 3,000 | $90,000 | $270,000 |
| **TOTAL** | | | **$459,000** |

### Expenses

| Quarter | Fixed Costs | Variable Costs | Marketing | Total Expenses |
|---------|------------|----------------|-----------|----------------|
| Q1 | $1,500 | $900 | $35,000 | $37,400 |
| Q2 | $1,500 | $4,500 | $55,000 | $61,000 |
| Q3 | $1,500 | $13,500 | $40,000 | $55,000 |
| Q4 | $1,500 | $27,000 | $20,000 | $48,500 |
| **TOTAL** | $6,000 | $45,900 | $150,000 | **$201,900** |

### Year 1 Profit

**Total Revenue:** $459,000
**Total Expenses:** $201,900
**Net Profit:** **$257,100**

*(Note: This is more conservative than the $550K projection in other docs)*

---

## 💡 COST OPTIMIZATION TIPS

### Ways to Reduce Costs

1. **Start with Smaller Infrastructure**
   - Use DigitalOcean instead of AWS (cheaper)
   - Start with $100/month server instead of $200
   - **Savings: $1,200/year**

2. **Self-Host Some Services**
   - Run your own email server (risky but free)
   - Use free tier of monitoring tools
   - **Savings: $720/year**

3. **Negotiate Certn Pricing**
   - Volume discounts after 100 verifications
   - Could get Tier 1 down to $1.00
   - **Savings: $0.50 × professionals**

4. **Reduce Marketing Spend**
   - Focus on organic growth
   - Referral program instead of ads
   - **Savings: $50,000-100,000**

5. **Use Free Alternatives**
   - Cloudflare free tier (CDN + SSL)
   - GitHub Actions (free CI/CD)
   - PostgreSQL on same server as API
   - **Savings: $1,200/year**

### Minimum Viable Launch Budget

**If you want to launch with minimal investment:**

| Item | Cost |
|------|------|
| Business registration | $300 |
| Legal review | $1,000 |
| Server (6 months) | $600 |
| Domain | $50 |
| Initial marketing | $5,000 |
| **TOTAL** | **$6,950** |

**Strategy:**
- Start with 1 server for everything
- Organic marketing (Facebook groups, LinkedIn)
- Referral program instead of ads
- Bootstrap to 100 professionals
- Then raise money for scaling

---

## 🚨 HIDDEN COSTS TO WATCH OUT FOR

### Potential Additional Expenses

| Item | Estimated Cost | When |
|------|---------------|------|
| **Customer Support** | $2,000/month | After 500 users |
| **Fraud Prevention** | $500/month | After 1,000 transactions |
| **Legal Issues** | $5,000/year | Ongoing |
| **Accounting/Bookkeeping** | $300/month | From day 1 |
| **Insurance** | $2,000/year | Recommended |
| **Payment Disputes** | $1,000/year | Occasional |
| **Server Scaling** | +$500/month | After 5,000 pros |
| **Additional Features** | $10,000/year | Ongoing development |

---

## 📊 SUMMARY

### Minimum to Launch
- **$6,950** (bootstrap mode)
- **$169,350** (full Quebec launch)

### Monthly Operating Costs
- **$500** (fixed platform costs)
- **$3 per professional** (variable costs)

### Break-Even
- **19 professionals** (operating costs only)
- **8 months** (including marketing investment)

### Profit Margins
- **90% gross margin** (revenue - variable costs)
- **70-80% net margin** (after all costs)

### Year 1 Projection
- **Revenue:** $459,000
- **Expenses:** $201,900
- **Profit:** $257,100

### Year 2 Projection (Canada-wide)
- **Revenue:** $3.6M
- **Expenses:** $1.2M
- **Profit:** $2.4M

---

## 🎯 RECOMMENDED APPROACH

### Option 1: Bootstrap ($7K)
- Minimal infrastructure
- Organic marketing
- Slow growth (100 pros in 6 months)
- Profitable from month 1
- **Risk:** Slow growth, may miss market opportunity

### Option 2: Moderate Launch ($50K)
- Good infrastructure
- Targeted marketing
- Medium growth (500 pros in 6 months)
- Break-even in 3-4 months
- **Risk:** Moderate investment, moderate returns

### Option 3: Full Launch ($170K)
- Best infrastructure
- Aggressive marketing
- Fast growth (800-1,000 pros in 6 months)
- Break-even in 8 months
- **Risk:** High investment, but high returns

**Recommendation:** Option 3 (Full Launch)
- Market opportunity is NOW
- Competition will come
- Quebec market is ready
- ROI is excellent (257K profit year 1)
- Can raise money easily with traction

---

## 💼 FUNDING OPTIONS

### Bootstrap (No External Funding)
- Use personal savings
- Start small, grow organically
- Keep 100% ownership
- Slower growth

### Friends & Family ($50K-100K)
- Quick to raise
- Flexible terms
- Give away 10-20% equity
- Enough for moderate launch

### Angel Investors ($250K-500K)
- Professional investors
- Get mentorship + connections
- Give away 15-25% equity
- Enough for full launch + runway

### Quebec Government Programs
- **Investissement Québec ESSOR:** Up to $500K
- **Anges Québec:** Network of investors
- **Fonds de solidarité FTQ:** Labor-sponsored fund
- **BDC (Bank of Development Canada):** Loans + equity

**Recommended:** Raise $250K-500K from angels + Quebec programs
- Gives you 12-18 months runway
- Enough for full Quebec launch
- Prove model before Series A

---

**Q-MÉTIER** - Built to Scale 📈  
Built with ❤️ in Quebec, Canada 🇨🇦

