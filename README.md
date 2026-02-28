# DevisPro - Quebec Construction Marketplace 🏗️

A localized Thumbtack/HomeAdvisor clone built specifically for Quebec's construction market. Unlike generic platforms, DevisPro verifies RBQ licenses (CMEQ/CMMTQ) in real-time, ensuring legal compliance with Quebec's Code de construction (Article 46).

## 🎯 Key Features

### 🤖 OpenClaw Automation Engine
- PowerShell-based lead distribution system
- Automated matching of leads to qualified contractors
- Real-time notification via WhatsApp/SMS
- Intelligent routing based on specialization and service area

### ✅ Automated RBQ License Validation
- Real-time verification of CMEQ/CMMTQ licenses
- Integration with RBQ government database
- Ensures Article 46 compliance (Code de construction du Québec)
- Automatic re-validation at regular intervals

### 💳 Interac e-Transfer Integration
- Quebec's preferred payment method
- 15% commission-on-win model (not pay-per-lead)
- Lower risk for contractors
- Secure and instant transactions

### 🇫🇷 French-First Localization (fr-CA)
- Complete French Quebec interface
- Bill 101 (Loi 101) compliant
- French as default language
- Proper Quebec terminology and expressions

### 📱 Multi-Channel Notifications
- WhatsApp integration for instant alerts
- SMS notifications for new leads
- Real-time updates on lead status
- Contractor dashboard

### 💰 Fair Commission Model
- 15% commission only on successful contracts
- No upfront payment required
- Pay-per-win instead of pay-per-lead
- Transparent pricing

## 🎯 Target Market

- **40,000+** RBQ-licensed contractors in Quebec
- Focus on CMEQ (Électricité) and CMMTQ (Mécanique du bâtiment)
- All regions of Quebec
- Residential and commercial projects

## 🛠️ Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Automation**: PowerShell (OpenClaw Engine)
- **Data Layer**: JSON-based storage
- **Notifications**: WhatsApp API + SMS (Twilio)

## 📦 Installation

### Prerequisites

- Node.js 16+ and npm
- PowerShell 7+ (for automation engine)
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/brandonlacoste9-tech/thumbstack-.git
   cd thumbstack-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure the application**
   
   Edit `src/config/config.json` with your settings:
   - RBQ API credentials
   - WhatsApp API key
   - SMS provider credentials
   - Payment gateway settings

4. **Start the backend server**
   ```bash
   npm start
   ```
   
   The server will run on `http://localhost:3000`

5. **Start the OpenClaw automation engine** (in a separate terminal)
   ```bash
   npm run automation
   ```
   
   Or manually:
   ```bash
   pwsh src/automation/openclaw-engine.ps1
   ```

## 🚀 Usage

### For Contractors

1. **Register**: Visit `http://localhost:3000/register`
2. **Enter RBQ License**: Provide your CMEQ or CMMTQ license number
3. **Automatic Validation**: System verifies your license in real-time
4. **Complete Profile**: Add specializations and service areas
5. **Receive Leads**: Get notified via WhatsApp/SMS when matching leads arrive

### For Customers

1. **Submit Request**: Visit `http://localhost:3000/submit-lead`
2. **Describe Project**: Provide project details and requirements
3. **Get Matched**: OpenClaw distributes to up to 3 qualified contractors
4. **Receive Quotes**: Contractors respond with detailed quotes
5. **Choose Best Offer**: Compare and select the best contractor

### For Administrators

- Monitor system via `/api/health`
- View all contractors: `/api/contractors`
- View all leads: `/api/leads`

## 📚 API Documentation

### Health Check
```
GET /api/health
```
Returns system status and configuration

### Validate RBQ License
```
POST /api/rbq/validate
Content-Type: application/json

{
  "licenseNumber": "1234-5678-90",
  "licenseType": "CMEQ"
}
```

### Register Contractor
```
POST /api/contractors/register
Content-Type: application/json

{
  "name": "Jean Tremblay",
  "email": "jean@example.com",
  "phone": "514-555-1234",
  "rbqLicenseNumber": "1234-5678-90",
  "rbqLicenseType": "CMEQ",
  "specializations": ["Électricité"],
  "serviceAreas": ["Montreal"]
}
```

### Submit Lead
```
POST /api/leads/submit
Content-Type: application/json

{
  "customerName": "Marie Dupont",
  "email": "marie@example.com",
  "phone": "514-555-5678",
  "serviceType": "Électricité",
  "description": "Rénovation électrique complète",
  "location": "Montreal, QC",
  "region": "Montreal"
}
```

### Calculate Commission
```
POST /api/payments/commission-preview
Content-Type: application/json

{
  "projectValue": 10000
}
```

## 🔧 Configuration

### RBQ License Validation

The system validates licenses against these formats:
- **CMEQ**: `\d{4}-\d{4}-\d{2}` (e.g., 1234-5678-90)
- **CMMTQ**: `\d{4}-\d{4}-\d{2}` (e.g., 1234-5678-90)

In production, connect to the official RBQ API at:
`https://api.rbq.gouv.qc.ca/licenses`

### OpenClaw Engine

The automation engine runs continuously and:
- Checks for new leads every 30 seconds
- Matches leads with qualified contractors
- Sends notifications via WhatsApp/SMS
- Updates lead status automatically

### Notification Settings

Configure in `src/config/config.json`:
```json
{
  "notifications": {
    "whatsapp": {
      "enabled": true,
      "apiKey": "YOUR_WHATSAPP_API_KEY"
    },
    "sms": {
      "enabled": true,
      "provider": "twilio",
      "apiKey": "YOUR_SMS_API_KEY"
    }
  }
}
```

## 📋 Project Structure

```
thumbstack-/
├── src/
│   ├── automation/
│   │   └── openclaw-engine.ps1      # PowerShell automation engine
│   ├── backend/
│   │   └── server.js                # Express server with APIs
│   ├── config/
│   │   └── config.json              # Application configuration
│   └── data/
│       ├── contractors.json         # Contractor database
│       └── leads.json               # Leads database
├── public/
│   ├── index.html                   # Homepage
│   ├── register.html                # Contractor registration
│   └── submit-lead.html             # Lead submission form
├── package.json                     # Node.js dependencies
└── README.md                        # This file
```

## 🔒 Compliance

### Bill 101 (Loi 101) - Charte de la langue française
- ✅ French as primary interface language
- ✅ All user-facing content in French
- ✅ French terminology for Quebec construction industry
- ✅ Bilingual support with French priority

### Code de construction du Québec - Article 46
- ✅ Mandatory RBQ license verification
- ✅ Only licensed contractors can receive leads
- ✅ Regular license status validation
- ✅ Compliance tracking and reporting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@devispro.qc.ca or open an issue on GitHub.

## 🙏 Acknowledgments

- Régie du bâtiment du Québec (RBQ) for license verification standards
- Quebec construction industry professionals
- Open source community

---

**Made with ❤️ for Quebec's construction professionals**
