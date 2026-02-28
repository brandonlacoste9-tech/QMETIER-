# DevisPro API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
Currently, the API does not require authentication for public endpoints. Future versions will implement JWT-based authentication for contractor and admin endpoints.

---

## Endpoints

### Health Check

Check API status and configuration.

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "OK",
  "app": "DevisPro",
  "version": "1.0.0",
  "language": "fr-CA",
  "timestamp": "2026-02-28T07:18:00.000Z"
}
```

---

### Get Configuration

Retrieve public application configuration.

**Endpoint:** `GET /api/config`

**Response:**
```json
{
  "app": {
    "name": "DevisPro",
    "version": "1.0.0",
    "port": 3000,
    "language": "fr-CA"
  },
  "payments": {
    "method": "interac-e-transfer",
    "commissionRate": 0.15,
    "model": "commission-on-win"
  },
  "compliance": {
    "bill101": true,
    "codeConstruction": {
      "article": 46,
      "enforced": true
    }
  }
}
```

---

### Validate RBQ License

Validate a Quebec construction license in real-time.

**Endpoint:** `POST /api/rbq/validate`

**Request Body:**
```json
{
  "licenseNumber": "1234-5678-90",
  "licenseType": "CMEQ"
}
```

**Parameters:**
- `licenseNumber` (string, required): RBQ license number in format `\d{4}-\d{4}-\d{2}`
- `licenseType` (string, required): License type, either "CMEQ" or "CMMTQ"

**Success Response (200):**
```json
{
  "valid": true,
  "licensee": "Entrepreneur Certifié",
  "status": "Actif",
  "expiryDate": "2027-02-28",
  "specializations": ["Électricité", "Plomberie"],
  "article46Compliant": true
}
```

**Error Response (400):**
```json
{
  "valid": false,
  "error": "Format de licence invalide / Invalid license format"
}
```

---

### Register Contractor

Register a new contractor with RBQ license verification.

**Endpoint:** `POST /api/contractors/register`

**Request Body:**
```json
{
  "name": "Jean Tremblay",
  "businessName": "Électricité Tremblay Inc.",
  "email": "jean@example.com",
  "phone": "514-555-1234",
  "whatsapp": "514-555-1234",
  "rbqLicenseNumber": "1234-5678-90",
  "rbqLicenseType": "CMEQ",
  "specializations": ["Électricité"],
  "serviceAreas": ["Montreal", "Laval"]
}
```

**Parameters:**
- `name` (string, required): Contact person name
- `businessName` (string, optional): Business name (defaults to name)
- `email` (string, required): Contact email
- `phone` (string, required): Contact phone number
- `whatsapp` (string, optional): WhatsApp number (defaults to phone)
- `rbqLicenseNumber` (string, required): RBQ license number
- `rbqLicenseType` (string, required): License type (CMEQ or CMMTQ)
- `specializations` (array, required): List of specializations
- `serviceAreas` (array, required): List of service areas

**Success Response (201):**
```json
{
  "message": "Entrepreneur enregistré avec succès / Contractor registered successfully",
  "contractor": {
    "id": "CTR-1709100000000",
    "name": "Jean Tremblay",
    "rbqLicense": {
      "number": "1234-5678-90",
      "type": "CMEQ",
      "valid": true,
      "status": "Actif"
    }
  }
}
```

**Error Responses:**

*Missing fields (400):*
```json
{
  "error": "Champs requis manquants / Required fields missing"
}
```

*Invalid license (400):*
```json
{
  "error": "Licence RBQ invalide / Invalid RBQ license",
  "details": "Invalid license format or expired"
}
```

*Duplicate registration (400):*
```json
{
  "error": "Entrepreneur déjà enregistré / Contractor already registered"
}
```

---

### List Contractors

Get list of all active contractors (public information only).

**Endpoint:** `GET /api/contractors`

**Response:**
```json
{
  "contractors": [
    {
      "id": "CTR-1709100000000",
      "name": "Électricité Tremblay Inc.",
      "specializations": ["Électricité"],
      "serviceAreas": ["Montreal", "Laval"],
      "rating": 4.8,
      "completedProjects": 156,
      "rbqLicenseType": "CMEQ",
      "rbqValid": true
    }
  ],
  "count": 1
}
```

---

### Submit Lead

Submit a new customer lead for quotes.

**Endpoint:** `POST /api/leads/submit`

**Request Body:**
```json
{
  "customerName": "Marie Dupont",
  "email": "marie@example.com",
  "phone": "514-555-5678",
  "serviceType": "Électricité",
  "description": "Rénovation électrique complète d'une maison",
  "location": "123 Rue Principale, Montréal, QC",
  "region": "Montreal",
  "estimatedBudget": "5000$ - 10000$",
  "urgency": "normal"
}
```

**Parameters:**
- `customerName` (string, required): Customer full name
- `email` (string, required): Customer email
- `phone` (string, required): Customer phone number
- `serviceType` (string, required): Type of service needed
- `description` (string, required): Detailed project description
- `location` (string, required): Full address
- `region` (string, required): Quebec region
- `estimatedBudget` (string, optional): Budget range
- `urgency` (string, optional): Urgency level (normal, high, low)

**Success Response (201):**
```json
{
  "message": "Demande soumise avec succès / Request submitted successfully",
  "lead": {
    "id": "LEAD-1709100000000",
    "serviceType": "Électricité",
    "status": "new"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Champs requis manquants / Required fields missing"
}
```

---

### List Leads

Get all leads (admin/contractor view).

**Endpoint:** `GET /api/leads`

**Response:**
```json
{
  "leads": [
    {
      "id": "LEAD-1709100000000",
      "customer": {
        "name": "Marie Dupont",
        "email": "marie@example.com",
        "phone": "514-555-5678"
      },
      "serviceType": "Électricité",
      "description": "Rénovation électrique complète",
      "location": "123 Rue Principale, Montréal, QC",
      "region": "Montreal",
      "estimatedBudget": "5000$ - 10000$",
      "urgency": "normal",
      "status": "new",
      "commission": 1125,
      "createdAt": "2026-02-28T07:00:00.000Z"
    }
  ],
  "count": 1
}
```

---

### Calculate Commission Preview

Preview commission calculation for a project value.

**Endpoint:** `POST /api/payments/commission-preview`

**Request Body:**
```json
{
  "projectValue": 10000
}
```

**Success Response (200):**
```json
{
  "projectValue": 10000,
  "commissionRate": "15%",
  "commission": 1500,
  "contractorEarnings": 8500,
  "paymentMethod": "interac-e-transfer",
  "model": "commission-on-win"
}
```

**Error Response (400):**
```json
{
  "error": "Valeur de projet invalide / Invalid project value"
}
```

---

## Status Codes

- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request parameters
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

---

## Rate Limiting

Currently, there are no rate limits. Future versions will implement rate limiting to prevent abuse.

---

## CORS

The API currently accepts requests from all origins. In production, configure CORS to accept requests only from your frontend domain.

---

## Support

For API support, contact: support@devispro.qc.ca
