# 🏗️ Architecture DevisPro - Documentation Technique

## Vue d'Ensemble du Système

DevisPro est une plateforme de mise en relation pour la construction au Québec, utilisant une architecture modulaire PowerShell avec stockage JSON et frontend HTML5 statique.

## Architecture Générale

```
┌─────────────────────────────────────────────────────────────────┐
│                         DEVISPRO PLATFORM                       │
│                     Quebec Construction Marketplace             │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐        ┌──────────────┐        ┌──────────────┐
│   CLIENTS    │        │ ENTREPRENEURS│        │  ADMIN/OPS   │
│              │        │              │        │              │
│ • Demandes   │        │ • Reçoit     │        │ • Monitoring │
│ • Soumissions│◄──────►│   contrats   │◄──────►│ • Config     │
│ • Paiements  │        │ • Répond     │        │ • Support    │
└──────┬───────┘        └──────┬───────┘        └──────┬───────┘
       │                       │                       │
       │                       │                       │
       ▼                       ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND LAYER                             │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  HTML5 + CSS3 + JavaScript                                 │ │
│  │  • Pages responsives                                       │ │
│  │  • Formulaires français                                    │ │
│  │  • Interface Bill 101 compliant                            │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AUTOMATION LAYER (PowerShell)                │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │   RBQ      │  │   OpenClaw   │  │ Notifications│           │
│  │ Validation │  │  Distribution│  │   Service    │           │
│  │            │  │              │  │              │           │
│  │ • CMEQ     │  │ • Matching   │  │ • WhatsApp   │           │
│  │ • CMMTQ    │  │ • Scoring    │  │ • SMS        │           │
│  │ • RBQ      │  │ • Selection  │  │ • Multi-CH   │           │
│  └────────────┘  └──────────────┘  └──────────────┘           │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           Payment Integration (Interac)                  │  │
│  │  • Commission 15%                                        │  │
│  │  • e-Transfer processing                                │  │
│  │  • Transaction logging                                  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER (JSON)                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │Contractors  │  │    Leads    │  │  Payments   │            │
│  │             │  │             │  │             │            │
│  │ • RBQ Info  │  │ • Projects  │  │ • Interac   │            │
│  │ • Ratings   │  │ • Matching  │  │ • Commision │            │
│  │ • Capacity  │  │ • Status    │  │ • History   │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           Configuration & Localization                   │  │
│  │  • app.config.json (settings)                           │  │
│  │  • fr-CA.json (translations)                            │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL INTEGRATIONS                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   RBQ API    │  │  WhatsApp    │  │   Twilio     │         │
│  │              │  │  Business    │  │     SMS      │         │
│  │ • Validation │  │              │  │              │         │
│  │ • License DB │  │ • Messages   │  │ • Messages   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           Interac e-Transfer API                         │  │
│  │  • Payment processing                                    │  │
│  │  • Transaction status                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Flux de Travail Principal

### 1. Flux de Demande de Contrat

```
Client                    DevisPro                  Entrepreneurs
  │                          │                            │
  │ 1. Soumet demande       │                            │
  │─────────────────────────►                            │
  │                          │                            │
  │                          │ 2. Valide RBQ             │
  │                          │    (Article 46)           │
  │                          │                            │
  │                          │ 3. OpenClaw               │
  │                          │    Match & Score          │
  │                          │                            │
  │                          │ 4. Sélectionne Top 3      │
  │                          │                            │
  │                          │ 5. Envoie notifications   │
  │                          ├───────────────────────────►│
  │                          │    (WhatsApp + SMS)       │
  │                          │                            │
  │                          │◄───────────────────────────│
  │                          │ 6. Entrepreneurs répondent│
  │                          │                            │
  │◄─────────────────────────│ 7. Client reçoit         │
  │    Soumissions           │    soumissions            │
  │                          │                            │
  │ 8. Sélectionne           │                            │
  │    entrepreneur          │                            │
  │─────────────────────────►                            │
  │                          │                            │
  │                          │ 9. Projet complété        │
  │                          │                            │
  │                          │ 10. Commission 15%        │
  │                          │     Interac e-Transfer    │
  │                          ├───────────────────────────►│
  │                          │                            │
```

### 2. Flux de Validation RBQ

```
┌──────────────────────────────────────────────────────────┐
│                 VALIDATION RBQ WORKFLOW                  │
└──────────────────────────────────────────────────────────┘

Input: License Number (XXXX-XXXX-XX) + Type (CMEQ/CMMTQ/RBQ)
  │
  ▼
┌────────────────────────────────────┐
│  1. Validation Format              │
│  • Regex: ^\d{4}-\d{4}-\d{2}$     │
│  • Type: CMEQ/CMMTQ/RBQ           │
└────────────────────────────────────┘
  │
  ├──[Invalid]──► ❌ Error: Format invalide
  │
  ▼ [Valid]
┌────────────────────────────────────┐
│  2. RBQ API Query                  │
│  • Vérification statut             │
│  • Vérification expiration         │
│  • Vérification spécialité         │
└────────────────────────────────────┘
  │
  ├──[Inactive]──► ❌ Error: Licence inactive
  │
  ▼ [Active]
┌────────────────────────────────────┐
│  3. Article 46 Compliance Check    │
│  • Licence valide ✓                │
│  • Statut actif ✓                  │
│  • Spécialité correcte ✓           │
└────────────────────────────────────┘
  │
  ▼
┌────────────────────────────────────┐
│  4. Save Validation Result         │
│  • JSON file in data/contractors/  │
│  • Timestamp                       │
│  • All verification details        │
└────────────────────────────────────┘
  │
  ▼
✅ Output: Validated Contractor Ready
```

### 3. Flux OpenClaw (Distribution)

```
┌──────────────────────────────────────────────────────────┐
│              OPENCLAW DISTRIBUTION ENGINE                │
└──────────────────────────────────────────────────────────┘

New Lead
  │
  ▼
┌────────────────────────────────────┐
│  1. Lead Analysis                  │
│  • Service type                    │
│  • Region                          │
│  • Project value                   │
│  • Urgency                         │
└────────────────────────────────────┘
  │
  ▼
┌────────────────────────────────────┐
│  2. Contractor Matching            │
│  • Filter by specialty             │
│  • Filter by region                │
│  • Filter by capacity              │
└────────────────────────────────────┘
  │
  ▼
┌────────────────────────────────────┐
│  3. Score Calculation              │
│  Score = Rating × ResponseRate     │
│  • Rating (0-5)                    │
│  • Response Rate (0-1)             │
└────────────────────────────────────┘
  │
  ▼
┌────────────────────────────────────┐
│  4. Top 3 Selection                │
│  • Sort by score DESC              │
│  • Select first 3                  │
└────────────────────────────────────┘
  │
  ▼
┌────────────────────────────────────┐
│  5. Notification Dispatch          │
│  • WhatsApp notification           │
│  • SMS notification                │
│  • French message template         │
└────────────────────────────────────┘
  │
  ▼
┌────────────────────────────────────┐
│  6. Save Distribution              │
│  • JSON in data/leads/             │
│  • Status: "Distribué"             │
│  • Assigned contractors list       │
└────────────────────────────────────┘
  │
  ▼
✅ Distribution Complete
```

## Composants Techniques

### 1. Module de Validation RBQ

**Fichier**: `src/validation/rbq-validator.ps1`

**Fonctionnalités**:
- Validation format licence (XXXX-XXXX-XX)
- Support types: CMEQ, CMMTQ, RBQ
- Vérification Article 46
- Génération résultats JSON

**Input**:
```powershell
-LicenseNumber "5234-8976-01"
-LicenseType "CMEQ"
```

**Output**:
```json
{
  "IsValid": true,
  "License": "5234-8976-01",
  "Type": "CMEQ",
  "CompanyName": "...",
  "Status": "Actif",
  "ComplianceArticle46": true
}
```

### 2. Moteur OpenClaw

**Fichier**: `src/automation/openclaw-engine.ps1`

**Algorithme de Matching**:
```
FOR EACH Contractor IN Database:
  IF Contractor.Specialty MATCHES Lead.ServiceType
     AND Contractor.Region MATCHES Lead.Region
     AND Contractor.Capacity > 0
     AND Contractor.Rating >= 4.5:
    
    Score = Contractor.Rating × Contractor.ResponseRate
    QualifiedContractors.Add(Contractor, Score)

SORT QualifiedContractors BY Score DESC
RETURN TOP 3 Contractors
```

**Commission Calculation**:
```
Commission = ProjectValue × 0.15
```

### 3. Service de Notifications

**Fichier**: `src/notifications/notification-service.ps1`

**Canaux Supportés**:
- WhatsApp (API Business)
- SMS (Twilio)
- Both (Multi-canal)

**Format Message**:
```
🔔 DevisPro - Nouvelle opportunité!

Service: {ServiceType}
Client: {CustomerName}
Valeur: {ProjectValue} CAD
Commission (15%): {Commission} CAD

Répondez rapidement!
```

### 4. Intégration Paiements

**Fichier**: `src/payment/interac-integration.ps1`

**Processus**:
1. Calcul commission (15%)
2. Génération transaction ID
3. Création message Interac
4. Sauvegarde transaction
5. Notification entrepreneur

## Modèle de Données

### Contractor Schema

```json
{
  "id": "CTR-001",
  "companyName": "Électrique Pro Québec Inc.",
  "rbqLicense": "5234-8976-01",
  "licenseType": "CMEQ",
  "licenseStatus": "Actif",
  "licenseExpiry": "2027-12-31",
  "specialty": "Entrepreneur électricien",
  "specialties": ["Électricité", "Installation"],
  "region": "Montréal",
  "regions": ["Montréal", "Laval"],
  "contactName": "Jean Tremblay",
  "phone": "+1-514-555-1001",
  "email": "info@example.com",
  "whatsappEnabled": true,
  "smsEnabled": true,
  "rating": 4.8,
  "reviewCount": 127,
  "completedProjects": 245,
  "responseRate": 0.95,
  "averageResponseTime": "2 heures",
  "availableCapacity": 5,
  "registeredAt": "2024-01-15T10:30:00Z",
  "complianceArticle46": true,
  "verified": true
}
```

### Lead Schema

```json
{
  "id": "LEAD-1234",
  "serviceType": "Électricité",
  "description": "Installation panneau électrique",
  "projectValue": 8500,
  "commission": 1275,
  "commissionRate": 0.15,
  "urgency": "Modéré",
  "preferredStartDate": "2026-03-15",
  "location": {
    "city": "Montréal",
    "postalCode": "H2X 1Y7",
    "region": "Montréal"
  },
  "customer": {
    "name": "Marie Tremblay",
    "phone": "+1-514-555-0123",
    "email": "marie@example.com",
    "preferredContact": "WhatsApp"
  },
  "status": "Distribué",
  "submittedAt": "2026-02-28T09:15:00Z",
  "distributedAt": "2026-02-28T09:20:00Z",
  "assignedContractors": [...]
}
```

### Payment Schema

```json
{
  "transactionId": "INT-123456",
  "email": "contractor@example.com",
  "amount": 1275.00,
  "currency": "CAD",
  "reference": "LEAD-1234",
  "message": "DevisPro - Commission à la réussite...",
  "status": "Pending",
  "initiatedAt": "2026-02-28T10:00:00Z",
  "provider": "Interac",
  "commissionRate": 0.15
}
```

## Sécurité

### Validation des Entrées
- Format licence RBQ strict
- Échappement SQL/injection prevention
- Validation email/téléphone

### Authentification
- API keys sécurisées
- Variables d'environnement
- Pas de hardcoding de credentials

### Compliance
- HTTPS obligatoire
- Conformité GDPR/PIPEDA
- Logs d'audit

## Performance

### Optimisations
- Cache validation RBQ (24h)
- Batch processing
- Compression JSON
- CDN pour frontend

### Métriques
| Opération | Temps | Objectif |
|-----------|-------|----------|
| Validation RBQ | <1s | ✅ |
| Distribution | <2s | ✅ |
| Notification | <1s | ✅ |
| Paiement | <1s | ✅ |

## Scalabilité

### Horizontal Scaling
- PowerShell scripts parallélisables
- JSON storage distribué
- Load balancer frontend

### Vertical Scaling
- Optimisation queries
- Cache agressif
- Database indexing

## Monitoring

### Logs
```
logs/
├── validation.log
├── distribution.log
├── notifications.log
└── payments.log
```

### Métriques
- Taux de validation réussite
- Temps de distribution moyen
- Taux de notification délivrance
- Volume de transactions

## Déploiement

### Infrastructure Recommandée

```
┌────────────────────────────────────────┐
│          Load Balancer / CDN           │
│          (Cloudflare / AWS)            │
└────────────┬───────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
┌───▼────┐       ┌───▼────┐
│ Web 1  │       │ Web 2  │
│Frontend│       │Frontend│
└───┬────┘       └───┬────┘
    │                │
    └────────┬───────┘
             │
    ┌────────▼────────┐
    │  App Servers    │
    │  (PowerShell)   │
    │  • Validation   │
    │  • Distribution │
    │  • Notifications│
    │  • Payments     │
    └────────┬────────┘
             │
    ┌────────▼────────┐
    │   Data Layer    │
    │   (JSON/DB)     │
    └─────────────────┘
```

### Stack Technique Production

- **Frontend**: Netlify / Vercel / GitHub Pages
- **Backend**: Azure Functions / AWS Lambda
- **Data**: Azure Blob / S3 / PostgreSQL
- **Cache**: Redis
- **Monitoring**: Application Insights / DataDog

---

**🏗️ Architecture robuste pour une plateforme scalable**
