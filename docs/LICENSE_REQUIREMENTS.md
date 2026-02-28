# Q-MÉTIER License Requirements

**Last Updated**: February 28, 2026

## Overview

Certain trades in Quebec and Canada require professional licenses. Q-MÉTIER requires professionals to upload proof of licensing for regulated categories.

---

## Regulated Trades in Quebec

### Régie du bâtiment du Québec (RBQ)

**License Required For**:
- ✅ Electricians (Électricien)
- ✅ Plumbers (Plombier)
- ✅ Gas fitters (Gazier)
- ✅ General contractors (Entrepreneur général)
- ✅ Specialized contractors (Entrepreneur spécialisé)
- ✅ HVAC technicians (Chauffage, ventilation, climatisation)

**License Format**: RBQ-XXXX-XXXX-XX

**Verification**: Upload photo of RBQ card + we verify with RBQ database

### Corporation des maîtres électriciens du Québec (CMEQ)

**License Required For**:
- ✅ Master electricians
- ✅ Electrical contractors

**License Format**: CMEQ-XXXXX

### Corporation des maîtres mécaniciens en tuyauterie du Québec (CMMTQ)

**License Required For**:
- ✅ Master plumbers
- ✅ Plumbing contractors

**License Format**: CMMTQ-XXXXX

---

## Non-Regulated Trades (No License Required)

- ❌ Painters
- ❌ Carpenters (residential, non-structural)
- ❌ Landscapers
- ❌ Cleaners
- ❌ Handymen (minor repairs)
- ❌ Movers
- ❌ Snow removal
- ❌ Furniture assembly

**Note**: Even if not legally required, professionals can still upload certifications to build trust.

---

## License Verification Process

### Step 1: Professional Uploads License
- Photo of license card (front and back)
- License number
- Expiry date
- Issuing authority

### Step 2: Automated Verification
- OCR extracts license number
- API call to RBQ/CMEQ/CMMTQ database
- Verify license is active and not suspended
- Verify expiry date

### Step 3: Manual Review (if needed)
- Admin reviews unclear photos
- Contacts issuing authority if needed
- Approves or rejects

### Step 4: Badge Display
- ✅ "Licensed Professional" badge on profile
- License number displayed (last 4 digits only)
- Expiry date shown
- Issuing authority shown

---

## Category-License Mapping

| Category | License Required | Issuing Authority |
|----------|------------------|-------------------|
| Electrical Work | Yes | RBQ + CMEQ |
| Plumbing | Yes | RBQ + CMMTQ |
| HVAC | Yes | RBQ |
| Gas Fitting | Yes | RBQ |
| General Contracting | Yes | RBQ |
| Roofing | Yes | RBQ |
| Painting | No | - |
| Carpentry (minor) | No | - |
| Landscaping | No | - |
| Cleaning | No | - |

---

## Enforcement

### Before License Upload
- ❌ Cannot submit quotes in regulated categories
- ❌ Profile shows "License Required"
- ❌ Customers warned if they try to hire unlicensed

### After License Verified
- ✅ Can submit quotes
- ✅ "Licensed" badge displayed
- ✅ Higher search ranking
- ✅ More customer trust

### If License Expires
- ⚠️ 30-day warning before expiry
- ⚠️ 7-day warning
- ❌ Account suspended if not renewed
- ❌ Cannot submit new quotes
- ✅ Can complete existing projects

### If License Suspended/Revoked
- ❌ Immediate account suspension
- ❌ All active quotes cancelled
- ❌ Customers notified
- ❌ Cannot reactivate until license restored

---

## Legal Protection

### Q-MÉTIER's Responsibility
- ✅ Verify licenses are uploaded
- ✅ Check license numbers with authorities
- ✅ Display license status to customers
- ✅ Suspend accounts with expired licenses

### Q-MÉTIER is NOT Responsible For
- ❌ Professional's actual competence
- ❌ Work quality
- ❌ Code compliance
- ❌ Insurance coverage
- ❌ Fraudulent licenses (if they pass verification)

### Customer's Responsibility
- ✅ Verify license is appropriate for work
- ✅ Check license is current
- ✅ Ensure proper permits obtained
- ✅ Inspect work quality

---

## API Integration

### RBQ License Verification
```python
# Check if RBQ license is valid
import requests

def verify_rbq_license(license_number: str) -> dict:
    """Verify RBQ license with official database"""
    url = "https://www.rbq.gouv.qc.ca/api/verify"
    response = requests.post(url, json={
        "license_number": license_number
    })
    
    if response.status_code == 200:
        data = response.json()
        return {
            "valid": data["status"] == "active",
            "expiry_date": data["expiry_date"],
            "categories": data["categories"],
            "restrictions": data.get("restrictions", [])
        }
    return {"valid": False}
```

### CMEQ License Verification
```python
def verify_cmeq_license(license_number: str) -> dict:
    """Verify CMEQ license"""
    # Similar API call to CMEQ database
    pass
```

---

## User Interface

### Professional Profile
```
┌─────────────────────────────────────┐
│ Jean Tremblay                       │
│ Électricien                         │
│                                     │
│ ✅ Licensed Professional            │
│ RBQ: ****-****-**-45               │
│ CMEQ: *****-789                    │
│ Valid until: Dec 31, 2026          │
│                                     │
│ ⭐⭐⭐⭐⭐ 4.9 (127 reviews)          │
└─────────────────────────────────────┘
```

### License Upload Form
```
┌─────────────────────────────────────┐
│ Upload Professional License         │
│                                     │
│ License Type:                       │
│ [Dropdown: RBQ, CMEQ, CMMTQ, Other]│
│                                     │
│ License Number:                     │
│ [Text input: RBQ-XXXX-XXXX-XX]     │
│                                     │
│ Expiry Date:                        │
│ [Date picker]                       │
│                                     │
│ Upload Photo:                       │
│ [Drag & drop or click to upload]   │
│                                     │
│ [Submit for Verification]           │
└─────────────────────────────────────┘
```

### Customer Warning (Unlicensed)
```
┌─────────────────────────────────────┐
│ ⚠️ WARNING                          │
│                                     │
│ This professional has NOT uploaded  │
│ a license for electrical work.      │
│                                     │
│ In Quebec, electrical work requires │
│ an RBQ license. Hiring unlicensed   │
│ professionals may:                  │
│ - Void your insurance               │
│ - Violate building codes            │
│ - Create safety hazards             │
│                                     │
│ [I Understand the Risks]            │
└─────────────────────────────────────┘
```

---

## Penalties for Violations

### For Professionals
- Submitting fake license: **Permanent ban**
- Working without license: **Account suspension**
- Expired license: **Temporary suspension until renewed**

### For Q-MÉTIER (if we fail to verify)
- Fines from RBQ: Up to $50,000
- Legal liability: If unlicensed work causes damage
- Reputation damage: Loss of trust

**That's why we verify rigorously!**

---

## Implementation Checklist

### Backend
- [ ] Add `licenses` table to database
- [ ] Add license upload endpoint
- [ ] Integrate RBQ API
- [ ] Integrate CMEQ API
- [ ] Integrate CMMTQ API
- [ ] Add license expiry checker (cron job)
- [ ] Add license suspension logic

### Frontend
- [ ] License upload form
- [ ] License display on profile
- [ ] License badge component
- [ ] Warning modal for unlicensed
- [ ] License expiry notifications

### Admin
- [ ] Manual license review interface
- [ ] License approval/rejection
- [ ] Bulk license verification
- [ ] Expired license reports

---

## FAQ

**Q: What if my license is from another province?**  
A: Upload it! We'll verify with that province's authority. You may need Quebec reciprocity.

**Q: What if I have multiple licenses?**  
A: Upload all of them! More licenses = more trust = more jobs.

**Q: What if my license is pending renewal?**  
A: Upload proof of renewal application. We'll give you 30 days grace period.

**Q: What if I work in a non-regulated trade?**  
A: No license required! But you can upload certifications (Red Seal, trade school, etc.) to build trust.

**Q: Can I work while my license is being verified?**  
A: No. Verification takes 24-48 hours. We must verify before you can submit quotes.

**Q: What if RBQ suspends my license?**  
A: Your account is immediately suspended. Resolve the issue with RBQ, then contact us to reactivate.

---

## Summary

**License verification protects**:
- ✅ Customers (from unlicensed work)
- ✅ Professionals (from unfair competition)
- ✅ Q-MÉTIER (from legal liability)
- ✅ Public safety (code compliance)

**Key Point**: We verify licenses, but we're still NOT responsible for work quality. Customers must still do their due diligence.

---

**Q-MÉTIER** - Licensed Professionals Only (Where Required)  
Built with ❤️ in Quebec, Canada 🇨🇦
