# DevisPro Quick Start Guide

## For Contractors / Pour les Entrepreneurs

### 1. Registration / Inscription

Visit: `http://localhost:3000/register`

**Required Information:**
- Business name / Nom de l'entreprise
- Contact name / Nom du contact
- Email / Courriel
- Phone / Téléphone
- RBQ License Number / Numéro de licence RBQ (format: 1234-5678-90)
- License Type / Type de licence (CMEQ or CMMTQ)
- Specializations / Spécialisations
- Service Areas / Régions desservies

**Example:**
```
Business: Électricité Tremblay Inc.
Contact: Jean Tremblay
Email: jean@example.com
Phone: 514-555-1234
License: 1234-5678-90
Type: CMEQ
Specializations: Électricité
Regions: Montreal, Laval
```

### 2. Receiving Leads / Recevoir des Leads

Once registered, you'll receive notifications via:
- 📱 WhatsApp
- 💬 SMS
- 📧 Email (future)

**Lead Information Includes:**
- Customer contact details
- Project description
- Location
- Estimated budget
- Urgency level

### 3. Responding to Leads / Répondre aux Leads

1. Review lead details
2. Contact customer within 24 hours
3. Provide detailed quote
4. Win the contract
5. Pay 15% commission on completion

---

## For Customers / Pour les Clients

### 1. Submit Project Request / Soumettre une Demande

Visit: `http://localhost:3000/submit-lead`

**Required Information:**
- Full name / Nom complet
- Email / Courriel
- Phone / Téléphone
- Service type / Type de service
- Project description / Description du projet
- Address / Adresse
- Region / Région

**Example:**
```
Name: Marie Dupont
Email: marie@example.com
Phone: 514-555-5678
Service: Électricité
Description: Rénovation électrique complète d'une maison de 2 étages
Address: 123 Rue Principale, Montréal, QC H1A 1A1
Region: Montreal
Budget: 5000$ - 10000$
```

### 2. What Happens Next / Prochaines Étapes

1. ✅ Your request is validated
2. 🤖 OpenClaw matches qualified contractors
3. 📱 Up to 3 contractors are notified
4. 📞 Contractors contact you within 24-48h
5. 💼 You receive and compare quotes
6. 🎯 Choose the best contractor
7. ✨ Project gets done!

**Advantages:**
- ✅ All contractors are RBQ verified
- ✅ Compliant with Article 46
- ✅ Free service for customers
- ✅ Compare multiple quotes
- ✅ Quebec-focused professionals

---

## For Administrators / Pour les Administrateurs

### API Endpoints

**Health Check:**
```bash
curl http://localhost:3000/api/health
```

**View All Contractors:**
```bash
curl http://localhost:3000/api/contractors
```

**View All Leads:**
```bash
curl http://localhost:3000/api/leads
```

**Validate RBQ License:**
```bash
curl -X POST http://localhost:3000/api/rbq/validate \
  -H "Content-Type: application/json" \
  -d '{"licenseNumber":"1234-5678-90","licenseType":"CMEQ"}'
```

**Calculate Commission:**
```bash
curl -X POST http://localhost:3000/api/payments/commission-preview \
  -H "Content-Type: application/json" \
  -d '{"projectValue":10000}'
```

### Starting Services

**Option 1: All-in-One Script**
```bash
./start.sh
```

**Option 2: Manual Start**
```bash
# Terminal 1: Backend
npm start

# Terminal 2: Automation
npm run automation
```

**Option 3: Production (systemd)**
```bash
sudo systemctl start devispro-backend
sudo systemctl start devispro-automation
```

### Monitoring

**Check Service Status:**
```bash
sudo systemctl status devispro-backend
sudo systemctl status devispro-automation
```

**View Logs:**
```bash
sudo journalctl -u devispro-backend -f
sudo journalctl -u devispro-automation -f
```

**View Data:**
```bash
cat src/data/contractors.json | jq
cat src/data/leads.json | jq
```

---

## Common Tasks / Tâches Courantes

### Add Sample Contractor

```bash
curl -X POST http://localhost:3000/api/contractors/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jean Tremblay",
    "businessName": "Électricité Pro",
    "email": "jean@example.com",
    "phone": "514-555-1234",
    "rbqLicenseNumber": "1234-5678-90",
    "rbqLicenseType": "CMEQ",
    "specializations": ["Électricité"],
    "serviceAreas": ["Montreal"]
  }'
```

### Add Sample Lead

```bash
curl -X POST http://localhost:3000/api/leads/submit \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Marie Dupont",
    "email": "marie@example.com",
    "phone": "514-555-5678",
    "serviceType": "Électricité",
    "description": "Rénovation électrique",
    "location": "Montreal, QC",
    "region": "Montreal"
  }'
```

### Reset Data

```bash
# Backup first
cp src/data/contractors.json src/data/contractors.backup.json
cp src/data/leads.json src/data/leads.backup.json

# Reset to empty
echo '{"contractors":[],"lastUpdated":"'$(date -Iseconds)'"}' > src/data/contractors.json
echo '{"leads":[],"lastUpdated":"'$(date -Iseconds)'"}' > src/data/leads.json
```

---

## Troubleshooting / Dépannage

### Server Won't Start
```bash
# Check if port 3000 is in use
lsof -i :3000
# or
netstat -tuln | grep 3000

# Kill existing process if needed
kill -9 $(lsof -t -i:3000)
```

### OpenClaw Not Running
```bash
# Check if PowerShell is installed
pwsh --version

# If not, install PowerShell
# macOS:
brew install powershell

# Ubuntu:
sudo apt install powershell
```

### API Not Responding
```bash
# Check backend logs
tail -f logs/*.log

# Test with curl
curl -v http://localhost:3000/api/health
```

### Data Not Persisting
```bash
# Check file permissions
ls -la src/data/

# Fix permissions if needed
chmod 644 src/data/*.json
```

---

## Configuration / Configuration

### Change Port
Edit `src/config/config.json`:
```json
{
  "app": {
    "port": 8080
  }
}
```

### Change Commission Rate
Edit `src/config/config.json`:
```json
{
  "payments": {
    "commissionRate": 0.20
  }
}
```

### Enable/Disable Notifications
Edit `src/config/config.json`:
```json
{
  "notifications": {
    "whatsapp": {
      "enabled": false
    },
    "sms": {
      "enabled": true
    }
  }
}
```

---

## Support / Soutien

- 📧 Email: support@devispro.qc.ca
- 📚 Documentation: See `/docs` folder
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions

---

**Made with ❤️ for Quebec contractors / Fait avec ❤️ pour les entrepreneurs du Québec**
