# Dual Platform Launch Checklist 🚀

**Launching Q-MÉTIER and Q-EMPLOIS simultaneously**

---

## 🎯 LAUNCH STRATEGY

### Why Launch Both?

✅ Shared infrastructure = minimal extra cost  
✅ Cross-promotion opportunities  
✅ Cover both markets (professional + gig)  
✅ Diversified revenue streams  
✅ Test which gains traction faster  
✅ Double down on winner  

### Timeline

**Week 0:** Pre-launch setup  
**Week 1-4:** Beta recruitment (50 users each)  
**Month 2:** Public launch (start charging)  
**Month 3-6:** Scale to 500 users each  

---

## ✅ PRE-LAUNCH CHECKLIST (Week 0)

### 1. Domain & Hosting

**Domains:**
- [ ] Purchase qmetier.ca
- [ ] Purchase q-emplois.ca
- [ ] Set up DNS records
- [ ] Configure SSL certificates

**Hosting:**
- [ ] Deploy Q-MÉTIER frontend to Vercel
- [ ] Deploy Q-MÉTIER backend to Railway
- [ ] Deploy Q-EMPLOIS frontend to Vercel
- [ ] Deploy Q-EMPLOIS backend to Railway
- [ ] Test both production URLs

### 2. Database Setup

**Q-MÉTIER:**
- [ ] Create Supabase project
- [ ] Run Prisma migrations
- [ ] Seed initial data (service categories)
- [ ] Set up backups

**Q-EMPLOIS:**
- [ ] Create Supabase project
- [ ] Run Prisma migrations
- [ ] Seed initial data (task categories)
- [ ] Set up backups

### 3. Stripe Configuration

**Q-MÉTIER:**
- [ ] Create Stripe account (or use existing)
- [ ] Set up credit pack products
  - [ ] 12 credits = $17.99
  - [ ] 24 credits = $34.99
  - [ ] 60 credits = $84.99
- [ ] Configure webhooks
- [ ] Test payment flow
- [ ] Add Stripe keys to .env

**Q-EMPLOIS:**
- [ ] Use same Stripe account
- [ ] Set up credit pack products
  - [ ] 12 credits = $17.99
  - [ ] 24 credits = $34.99
  - [ ] 60 credits = $84.99
- [ ] Configure webhooks
- [ ] Test payment flow
- [ ] Add Stripe keys to .env

### 4. Email Service

**Setup (Resend):**
- [ ] Create Resend account
- [ ] Verify domain (qmetier.ca)
- [ ] Verify domain (q-emplois.ca)
- [ ] Create email templates
  - [ ] Welcome email
  - [ ] Verification email
  - [ ] Credit purchase confirmation
  - [ ] Task/project notifications
- [ ] Test email sending

### 5. WhatsApp Integration (Q-EMPLOIS)

**Setup:**
- [ ] Create WhatsApp Business account
- [ ] Get WhatsApp Business API access
- [ ] Set up webhook endpoint
- [ ] Configure Max (Ti-Guy) bot
- [ ] Test message sending/receiving
- [ ] Add WhatsApp number to .env

### 6. Beta Program Setup

**Q-MÉTIER:**
- [ ] Add "BETA" label to website
- [ ] Create beta landing page
- [ ] Set up 60 free credits for first 50 users
- [ ] Create "Founding Professional" badge
- [ ] Write beta welcome emails
- [ ] Create Telegram group: "Q-MÉTIER Beta - Founding Pros"

**Q-EMPLOIS:**
- [ ] Add "BETA" label to website
- [ ] Create beta landing page
- [ ] Set up 60 free credits for first 50 users
- [ ] Create "Founding Tasker" badge
- [ ] Write beta welcome emails
- [ ] Create Telegram group: "Q-EMPLOIS Beta - Founding Taskers"

### 7. Legal Documents

**Q-MÉTIER:**
- [ ] Review Terms of Service
- [ ] Review Privacy Policy
- [ ] Review Refund Policy
- [ ] Review Liability Disclaimer
- [ ] Add to website footer
- [ ] Require acceptance on signup

**Q-EMPLOIS:**
- [ ] Review Terms of Service
- [ ] Review Privacy Policy
- [ ] Review Refund Policy
- [ ] Review Liability Disclaimer
- [ ] Add to website footer
- [ ] Require acceptance on signup

### 8. Analytics & Monitoring

**Both Platforms:**
- [ ] Set up Google Analytics
- [ ] Set up error tracking (Sentry)
- [ ] Set up uptime monitoring (UptimeRobot)
- [ ] Set up performance monitoring
- [ ] Create admin dashboards

### 9. Social Media Accounts

**Q-MÉTIER:**
- [ ] Create Facebook page
- [ ] Create LinkedIn page
- [ ] Create Instagram account
- [ ] Create Twitter/X account
- [ ] Prepare launch posts

**Q-EMPLOIS:**
- [ ] Create Facebook page
- [ ] Create LinkedIn page
- [ ] Create Instagram account
- [ ] Create Twitter/X account
- [ ] Prepare launch posts

### 10. Marketing Materials

**Q-MÉTIER:**
- [ ] Create logo files (PNG, SVG)
- [ ] Create OG image (1200x630)
- [ ] Create favicon
- [ ] Write launch announcement
- [ ] Prepare email templates
- [ ] Create Facebook group posts

**Q-EMPLOIS:**
- [ ] Create logo files (PNG, SVG)
- [ ] Create OG image (1200x630)
- [ ] Create favicon
- [ ] Write launch announcement
- [ ] Prepare email templates
- [ ] Create Facebook group posts

---

## 🚀 WEEK 1: SOFT LAUNCH (10 Users Each)

### Q-MÉTIER

**Day 1-2: Personal Network (5 pros)**
- [ ] Message 10 LinkedIn connections (licensed pros)
- [ ] Email 5 contractor friends
- [ ] Post in personal Facebook
- [ ] Ask for referrals

**Day 3-4: LinkedIn Outreach (3 pros)**
- [ ] Search for licensed pros in Montreal
- [ ] Send 20 personalized connection requests
- [ ] Follow up with beta invite
- [ ] Join contractor groups

**Day 5-7: Trade Associations (2 pros)**
- [ ] Contact CMEQ members
- [ ] Contact RBQ members
- [ ] Post in trade forums
- [ ] Attend networking event (if available)

**Daily Tasks:**
- [ ] Respond to all inquiries within 1 hour
- [ ] Manually verify each signup
- [ ] Add 60 credits to accounts
- [ ] Welcome each user personally
- [ ] Monitor for bugs
- [ ] Collect feedback

### Q-EMPLOIS

**Day 1-2: Personal Network (5 taskers)**
- [ ] Message friends/family who do odd jobs
- [ ] Post in personal Facebook
- [ ] Email students you know
- [ ] Ask for referrals

**Day 3-4: Facebook Groups (3 taskers)**
- [ ] Post in "Emplois Québec"
- [ ] Post in "Petits boulots Montréal"
- [ ] Post in "Travail autonome Québec"
- [ ] Join more job groups

**Day 5-7: University Job Boards (2 taskers)**
- [ ] Post on McGill job board
- [ ] Post on Concordia job board
- [ ] Post on UQAM job board
- [ ] Visit campus bulletin boards

**Daily Tasks:**
- [ ] Respond to all inquiries within 1 hour
- [ ] Manually verify each signup
- [ ] Add 60 credits to accounts
- [ ] Welcome each user personally
- [ ] Monitor for bugs
- [ ] Collect feedback

### Week 1 Goals

**Q-MÉTIER:**
- [ ] 10 pros signed up
- [ ] 5 pros verified
- [ ] 3 projects posted
- [ ] 5 quotes submitted
- [ ] 0 critical bugs

**Q-EMPLOIS:**
- [ ] 10 taskers signed up
- [ ] 5 taskers verified
- [ ] 10 tasks posted
- [ ] 5 tasks claimed
- [ ] 0 critical bugs

---

## 📈 WEEK 2-3: PUBLIC BETA (30 Users Each)

### Q-MÉTIER

**Recruitment Channels:**
- [ ] LinkedIn (10 pros)
  - [ ] Daily posts about beta
  - [ ] Direct outreach (20/day)
  - [ ] Join contractor groups
  - [ ] Share success stories

- [ ] Facebook Groups (10 pros)
  - [ ] "Entrepreneurs Québec"
  - [ ] "Contractors Montreal"
  - [ ] "RBQ Professionals"
  - [ ] Daily posts

- [ ] Trade Associations (5 pros)
  - [ ] CMEQ newsletter
  - [ ] RBQ forums
  - [ ] CMMTQ groups
  - [ ] Industry events

- [ ] Word of Mouth (5 pros)
  - [ ] Referral bonuses (+10 credits)
  - [ ] Ask beta users to invite friends
  - [ ] Share testimonials

**Daily Tasks:**
- [ ] Post in 2 Facebook groups
- [ ] Message 20 LinkedIn connections
- [ ] Respond to all inquiries
- [ ] Verify new signups
- [ ] Monitor platform usage
- [ ] Fix bugs
- [ ] Collect feedback

### Q-EMPLOIS

**Recruitment Channels:**
- [ ] Facebook Groups (10 taskers)
  - [ ] "Emplois Québec"
  - [ ] "Petits boulots Montréal"
  - [ ] "Travail autonome Québec"
  - [ ] "Jobs étudiants"
  - [ ] Daily posts

- [ ] Kijiji (5 taskers)
  - [ ] Post in Jobs section
  - [ ] "Beta testers wanted - Get paid"
  - [ ] Repost every 2 days

- [ ] Reddit (5 taskers)
  - [ ] r/Quebec
  - [ ] r/montreal
  - [ ] r/QuebecFinance
  - [ ] r/beermoney

- [ ] University Job Boards (5 taskers)
  - [ ] McGill, Concordia, UQAM
  - [ ] Student job boards
  - [ ] Campus bulletin boards
  - [ ] Student Facebook groups

- [ ] Word of Mouth (5 taskers)
  - [ ] Referral bonuses (+10 credits)
  - [ ] Ask beta users to invite friends
  - [ ] Share testimonials

**Daily Tasks:**
- [ ] Post in 2 Facebook groups
- [ ] Post on Kijiji
- [ ] Post on Reddit (2-3x/week)
- [ ] Respond to all inquiries
- [ ] Verify new signups
- [ ] Monitor platform usage
- [ ] Fix bugs
- [ ] Collect feedback

### Week 2-3 Goals

**Q-MÉTIER:**
- [ ] 30 pros total
- [ ] 25 pros verified
- [ ] 50 projects posted
- [ ] 100 quotes submitted
- [ ] 10 projects completed
- [ ] 5 customer reviews

**Q-EMPLOIS:**
- [ ] 30 taskers total
- [ ] 25 taskers verified
- [ ] 100 tasks posted
- [ ] 50 tasks claimed
- [ ] 20 tasks completed
- [ ] 10 customer reviews

---

## 🎯 WEEK 4: FINAL PUSH (50 Users Each)

### Q-MÉTIER

**Accelerate Recruitment:**
- [ ] Create urgency: "Only 20 spots left!"
- [ ] Update all posts with countdown
- [ ] Leverage early users for testimonials
- [ ] Increase referral bonus to +20 credits
- [ ] Local outreach (construction sites, trade shows)
- [ ] Press release to local media

**Daily Tasks:**
- [ ] Post in 3 Facebook groups
- [ ] Message 30 LinkedIn connections
- [ ] Follow up with interested pros
- [ ] Share success stories
- [ ] Update "spots remaining" counter
- [ ] Respond to all inquiries

### Q-EMPLOIS

**Accelerate Recruitment:**
- [ ] Create urgency: "Only 20 spots left!"
- [ ] Update all posts with countdown
- [ ] Leverage early users for testimonials
- [ ] Increase referral bonus to +20 credits
- [ ] Local outreach (community centers, libraries)
- [ ] Press release to local media

**Daily Tasks:**
- [ ] Post in 3 Facebook groups
- [ ] Post on Kijiji (multiple cities)
- [ ] Post on Reddit
- [ ] Visit university campuses
- [ ] Share success stories
- [ ] Update "spots remaining" counter
- [ ] Respond to all inquiries

### Week 4 Goals

**Q-MÉTIER:**
- [ ] 50 pros total (BETA FULL)
- [ ] 45 pros verified
- [ ] 100 projects posted
- [ ] 200 quotes submitted
- [ ] 20 projects completed
- [ ] 15 customer reviews
- [ ] 4.5+ star average rating

**Q-EMPLOIS:**
- [ ] 50 taskers total (BETA FULL)
- [ ] 45 taskers verified
- [ ] 200 tasks posted
- [ ] 100 tasks claimed
- [ ] 50 tasks completed
- [ ] 30 customer reviews
- [ ] 4.5+ star average rating

---

## 🎉 END OF BETA (Month 1)

### Beta Completion Checklist

**Q-MÉTIER:**
- [ ] 50 pros recruited
- [ ] Close beta signups
- [ ] Update website: "Beta Full - Public Launch Soon"
- [ ] Collect testimonials from all active users
- [ ] Fix all critical bugs
- [ ] Prepare public launch announcement
- [ ] Thank founding pros in Telegram group

**Q-EMPLOIS:**
- [ ] 50 taskers recruited
- [ ] Close beta signups
- [ ] Update website: "Beta Full - Public Launch Soon"
- [ ] Collect testimonials from all active users
- [ ] Fix all critical bugs
- [ ] Prepare public launch announcement
- [ ] Thank founding taskers in Telegram group

### Beta Success Metrics

**Q-MÉTIER:**
- [ ] 50 pros signed up
- [ ] 200+ projects posted
- [ ] 500+ quotes submitted
- [ ] 50+ projects completed
- [ ] 30+ customer reviews
- [ ] 4.5+ star average rating
- [ ] $0 spent (all free tiers)

**Q-EMPLOIS:**
- [ ] 50 taskers signed up
- [ ] 300+ tasks posted
- [ ] 200+ tasks claimed
- [ ] 100+ tasks completed
- [ ] 50+ customer reviews
- [ ] 4.5+ star average rating
- [ ] $0 spent (all free tiers)

---

## 🚀 MONTH 2: PUBLIC LAUNCH

### Pre-Launch Preparation

**Both Platforms:**
- [ ] Remove "BETA" label from websites
- [ ] Update all marketing materials
- [ ] Prepare launch announcement
- [ ] Schedule social media posts
- [ ] Prepare email to beta users
- [ ] Set up paid advertising (optional)

### Launch Day

**Q-MÉTIER:**
- [ ] Remove beta restrictions
- [ ] Open signups to everyone
- [ ] Post launch announcement (all channels)
- [ ] Email all beta pros
- [ ] Press release to media
- [ ] Monitor for issues
- [ ] Respond to inquiries

**Q-EMPLOIS:**
- [ ] Remove beta restrictions
- [ ] Open signups to everyone
- [ ] Post launch announcement (all channels)
- [ ] Email all beta taskers
- [ ] Press release to media
- [ ] Monitor for issues
- [ ] Respond to inquiries

### Post-Launch (Week 1)

**Both Platforms:**
- [ ] Monitor user signups
- [ ] Track revenue (beta users buying credits)
- [ ] Fix any bugs
- [ ] Respond to support requests
- [ ] Collect feedback
- [ ] Adjust marketing based on results

### Month 2 Goals

**Q-MÉTIER:**
- [ ] 75 pros total (50 beta + 25 new)
- [ ] $1,200 revenue (beta users buying credits)
- [ ] 100 projects/month
- [ ] 50 projects completed/month
- [ ] 4.5+ star rating maintained

**Q-EMPLOIS:**
- [ ] 75 taskers total (50 beta + 25 new)
- [ ] $1,200 revenue (beta users buying credits)
- [ ] 200 tasks/month
- [ ] 100 tasks completed/month
- [ ] 4.5+ star rating maintained

---

## 📊 MONTH 3-6: SCALE

### Growth Strategy

**Q-MÉTIER:**
- [ ] Paid advertising (Google Ads, Facebook Ads)
- [ ] SEO optimization
- [ ] Content marketing (blog posts)
- [ ] Partnership with trade associations
- [ ] Referral program expansion
- [ ] Target: 500 pros by Month 6

**Q-EMPLOIS:**
- [ ] Paid advertising (Google Ads, Facebook Ads)
- [ ] SEO optimization
- [ ] Content marketing (blog posts)
- [ ] Partnership with universities
- [ ] Referral program expansion
- [ ] Target: 500 taskers by Month 6

### Month 6 Goals

**Q-MÉTIER:**
- [ ] 500 pros
- [ ] $15,000/month revenue
- [ ] 1,000 projects/month
- [ ] 500 projects completed/month
- [ ] Expand to Quebec City

**Q-EMPLOIS:**
- [ ] 500 taskers
- [ ] $15,000/month revenue
- [ ] 2,000 tasks/month
- [ ] 1,000 tasks completed/month
- [ ] Expand to Quebec City

---

## 💰 FINANCIAL TRACKING

### Month 1 (Beta)

**Revenue:**
- Q-MÉTIER: $0
- Q-EMPLOIS: $0
- **Total: $0**

**Costs:**
- Hosting: $0 (free tiers)
- Domain: $30 (both domains)
- **Total: $30**

**Profit: -$30**

### Month 2 (Public Launch)

**Revenue:**
- Q-MÉTIER: $1,200
- Q-EMPLOIS: $1,200
- **Total: $2,400**

**Costs:**
- Hosting: $0 (still free tiers)
- Domain: $0
- **Total: $0**

**Profit: $2,400**

### Month 3

**Revenue:**
- Q-MÉTIER: $4,500
- Q-EMPLOIS: $4,500
- **Total: $9,000**

**Costs:**
- Hosting: $100 (upgrade both)
- Marketing: $200
- **Total: $300**

**Profit: $8,700**

### Month 6

**Revenue:**
- Q-MÉTIER: $15,000
- Q-EMPLOIS: $15,000
- **Total: $30,000/month**

**Costs:**
- Hosting: $500
- Marketing: $1,000
- Support: $500
- **Total: $2,000**

**Profit: $28,000/month**

### Year 1 Projection

**Revenue:**
- Q-MÉTIER: $257,000
- Q-EMPLOIS: $257,000
- **Total: $514,000**

**Costs:**
- Hosting: $6,000
- Marketing: $12,000
- Support: $6,000
- Legal: $2,000
- Misc: $4,000
- **Total: $30,000**

**Profit: $484,000**

---

## 🎯 SUCCESS CRITERIA

### Beta Success (Month 1)

**Must Have:**
- ✅ 50 users on each platform
- ✅ 100+ transactions on each platform
- ✅ 4.0+ star rating on each platform
- ✅ 0 critical bugs
- ✅ $0 spent (bootstrap success)

**Nice to Have:**
- ✅ 20+ testimonials on each platform
- ✅ Media coverage
- ✅ Viral social media post

### Public Launch Success (Month 2)

**Must Have:**
- ✅ $2,000+ revenue (both platforms)
- ✅ 50+ new users (both platforms)
- ✅ 4.5+ star rating maintained
- ✅ Break-even on costs

**Nice to Have:**
- ✅ $5,000+ revenue
- ✅ 100+ new users
- ✅ Partnership deals

### Scale Success (Month 6)

**Must Have:**
- ✅ $25,000+ revenue (both platforms)
- ✅ 500+ users on each platform
- ✅ 4.5+ star rating maintained
- ✅ Profitable

**Nice to Have:**
- ✅ $50,000+ revenue
- ✅ 1,000+ users on each platform
- ✅ Expand to other cities

---

## 🚨 RISK MITIGATION

### Technical Risks

**Risk:** Platform crashes during launch
- **Mitigation:** Load testing before launch
- **Backup:** Uptime monitoring, quick rollback

**Risk:** Payment processing fails
- **Mitigation:** Test Stripe thoroughly
- **Backup:** Manual credit addition

**Risk:** Database issues
- **Mitigation:** Daily backups
- **Backup:** Quick restore process

### Business Risks

**Risk:** Not enough users sign up
- **Mitigation:** Multiple recruitment channels
- **Backup:** Extend beta period, increase incentives

**Risk:** Users don't buy credits after beta
- **Mitigation:** Engagement during beta, value demonstration
- **Backup:** Discount offers, referral bonuses

**Risk:** Quality issues (bad pros/taskers)
- **Mitigation:** Verification process, reviews
- **Backup:** Ban bad actors, refund credits

### Legal Risks

**Risk:** Liability claims
- **Mitigation:** Clear disclaimers, $100 max liability
- **Backup:** Insurance (if needed)

**Risk:** Regulatory issues
- **Mitigation:** Compliance with Quebec laws
- **Backup:** Legal consultation

---

## 📞 SUPPORT PLAN

### Support Channels

**Q-MÉTIER:**
- Email: support@qmetier.ca
- Telegram: Q-MÉTIER Beta group
- Phone: (optional, for verified pros)

**Q-EMPLOIS:**
- Email: support@q-emplois.ca
- Telegram: Q-EMPLOIS Beta group
- WhatsApp: Max (Ti-Guy) bot

### Response Times

**Beta Period:**
- Critical issues: < 1 hour
- High priority: < 4 hours
- Normal: < 24 hours

**Post-Launch:**
- Critical issues: < 2 hours
- High priority: < 8 hours
- Normal: < 48 hours

### Support Team

**Month 1-2:** You (founder)
**Month 3-6:** You + 1 part-time support
**Month 6+:** You + 2 full-time support

---

## ✅ FINAL PRE-LAUNCH CHECKLIST

### Technical

- [ ] Both frontends deployed and working
- [ ] Both backends deployed and working
- [ ] Databases set up and migrated
- [ ] Stripe configured and tested
- [ ] Email service working
- [ ] WhatsApp bot working (Q-EMPLOIS)
- [ ] All environment variables set
- [ ] SSL certificates active
- [ ] Analytics tracking
- [ ] Error monitoring

### Content

- [ ] All legal documents reviewed
- [ ] Beta landing pages ready
- [ ] Welcome emails written
- [ ] Social media posts prepared
- [ ] Launch announcements ready
- [ ] FAQ pages complete
- [ ] Help documentation ready

### Marketing

- [ ] Social media accounts created
- [ ] Telegram groups created
- [ ] Email lists set up
- [ ] Recruitment posts written
- [ ] Referral program configured
- [ ] Press release drafted

### Operations

- [ ] Support email addresses set up
- [ ] Support processes documented
- [ ] Bug tracking system ready
- [ ] Feedback collection system ready
- [ ] User verification process tested
- [ ] Credit addition process tested

---

## 🎉 LAUNCH DAY SCHEDULE

### Morning (9 AM)

- [ ] Final system checks (both platforms)
- [ ] Deploy any last-minute fixes
- [ ] Test all critical flows
- [ ] Prepare for launch

### Noon (12 PM)

- [ ] **LAUNCH Q-MÉTIER**
- [ ] Post on all social media
- [ ] Send launch emails
- [ ] Post in Facebook groups
- [ ] Post on LinkedIn

### Afternoon (3 PM)

- [ ] **LAUNCH Q-EMPLOIS**
- [ ] Post on all social media
- [ ] Send launch emails
- [ ] Post in Facebook groups
- [ ] Post on Reddit

### Evening (6 PM)

- [ ] Monitor both platforms
- [ ] Respond to inquiries
- [ ] Fix any issues
- [ ] Celebrate! 🎉

### Night (9 PM)

- [ ] Final check before bed
- [ ] Set up alerts for critical issues
- [ ] Prepare for Day 2

---

## 🎯 SUMMARY

### The Plan

**Week 0:** Set up everything  
**Week 1-4:** Recruit 50 beta users each  
**Month 2:** Public launch, start charging  
**Month 3-6:** Scale to 500 users each  

### The Investment

**Total: $30** (just domain names)

### The Return

**Month 2:** $2,400 revenue  
**Month 6:** $30,000/month revenue  
**Year 1:** $484,000 profit  

### The Goal

Build two successful Quebec-first platforms that serve different markets but share infrastructure and cross-promote each other.

---

**Ready to launch? Let's do this! 🚀**

**Built with ❤️ in Quebec, Canada 🇨🇦**

**Fait au Québec, pour le Québec**
