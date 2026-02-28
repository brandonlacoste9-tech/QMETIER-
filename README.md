# 🏗️ DevisPro - Plateforme Québécoise pour Entrepreneurs RBQ

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Quebec](https://img.shields.io/badge/Québec-Spécialisé-blue.svg)](https://www.quebec.ca)
[![RBQ](https://img.shields.io/badge/RBQ-Vérifié-green.svg)](https://www.rbq.gouv.qc.ca)
[![Loi 101](https://img.shields.io/badge/Loi_101-Conforme-success.svg)](https://www.oqlf.gouv.qc.ca)

Une plateforme localisée de type Thumbtack/HomeAdvisor construite spécifiquement pour le marché de la construction du Québec. Contrairement aux plateformes génériques, DevisPro vérifie les licences RBQ (CMEQ/CMMTQ) en temps réel, assurant la conformité légale avec le Code de construction du Québec (Article 46).

## 🎯 Caractéristiques Principales

- **🤖 Moteur d'automatisation OpenClaw** - Distribution intelligente des contrats via PowerShell
- **✅ Validation RBQ automatisée** - Vérification en temps réel des licences CMEQ/CMMTQ
- **💳 Intégration Interac e-Transfer** - Méthode de paiement préférée au Québec
- **🇫🇷 Localisation français-priorité (fr-CA)** - Conformité Bill 101 complète
- **📱 Notifications WhatsApp/SMS** - Alertes instantanées pour entrepreneurs
- **💰 Commission 15% à la réussite** - Vs. paiement par contrat (risque moindre pour les pros)

## 🎯 Marché Cible

- **40,000+ entrepreneurs licenciés RBQ** au Québec
- Entrepreneurs électriciens (CMEQ)
- Mécaniciens en bâtiment (CMMTQ)
- Entrepreneurs généraux (RBQ)
- Tous les corps de métiers de la construction

## 🛠️ Stack Technique

- **Backend**: PowerShell automation engine
- **Data Layer**: JSON-based storage
- **Frontend**: HTML5 + CSS3 + JavaScript
- **Intégrations**: 
  - RBQ API (validation licences)
  - Interac e-Transfer (paiements)
  - WhatsApp Business API
  - Twilio SMS

## 📂 Structure du Projet

```
thumbstack-/
├── config/
│   └── app.config.json              # Configuration de l'application
├── src/
│   ├── automation/
│   │   └── openclaw-engine.ps1      # Moteur de distribution de contrats
│   ├── validation/
│   │   └── rbq-validator.ps1        # Validation RBQ en temps réel
│   ├── payment/
│   │   └── interac-integration.ps1  # Intégration Interac e-Transfer
│   ├── notifications/
│   │   └── notification-service.ps1 # Service WhatsApp/SMS
│   └── localization/
│       └── fr-CA.json               # Traductions françaises (Bill 101)
├── data/
│   ├── contractors/                 # Base de données entrepreneurs
│   ├── leads/                       # Contrats et demandes
│   └── payments/                    # Historique paiements
├── frontend/
│   ├── pages/
│   │   └── index.html              # Page d'accueil
│   ├── css/
│   │   └── styles.css              # Styles CSS
│   └── js/
│       └── app.js                   # Application JavaScript
└── scripts/                         # Scripts utilitaires
```

## 🚀 Installation et Démarrage

### Prérequis

- PowerShell 7.0+ (pour Windows/Linux/macOS)
- Navigateur web moderne
- (Optionnel) Serveur web local (pour tester le frontend)

### Installation

1. **Cloner le repository**
```bash
git clone https://github.com/brandonlacoste9-tech/thumbstack-.git
cd thumbstack-
```

2. **Vérifier PowerShell**
```powershell
pwsh --version
```

3. **Ouvrir le frontend**
```bash
# Option 1: Ouvrir directement dans le navigateur
open frontend/pages/index.html

# Option 2: Utiliser un serveur web local (Python)
cd frontend/pages
python -m http.server 8000
# Puis ouvrir http://localhost:8000
```

## 📘 Utilisation

### 1. Validation RBQ

Valider une licence RBQ d'entrepreneur:

```powershell
cd src/validation
pwsh rbq-validator.ps1 -LicenseNumber "5234-8976-01" -LicenseType "CMEQ"
```

**Sortie:**
```
═══════════════════════════════════════════════
  Validation RBQ - DevisPro Quebec
  Code de construction du Québec - Article 46
═══════════════════════════════════════════════

✓ LICENCE VALIDE
  Entreprise: Entreprise Construction Exemple Inc.
  Statut: Actif
  Type: Entrepreneur électricien
  Expiration: 2027-12-31
  Conformité Article 46: True
```

### 2. Distribution de Contrats (OpenClaw)

Distribuer un nouveau contrat aux entrepreneurs qualifiés:

```powershell
cd src/automation
pwsh openclaw-engine.ps1
```

**Fonctionnalités:**
- Recherche automatique d'entrepreneurs qualifiés RBQ
- Matching basé sur spécialités et région
- Notation par score de correspondance (rating × taux de réponse)
- Distribution aux 3 meilleurs entrepreneurs
- Notifications instantanées WhatsApp/SMS

### 3. Traitement des Paiements

Traiter une commission Interac e-Transfer:

```powershell
cd src/payment
pwsh interac-integration.ps1
```

**Commission de 15% calculée automatiquement:**
- Projet de 8,500 CAD → Commission 1,275 CAD
- Paiement sécurisé par Interac e-Transfer
- Email envoyé automatiquement à l'entrepreneur

### 4. Notifications

Envoyer des notifications aux entrepreneurs:

```powershell
cd src/notifications
pwsh notification-service.ps1 -Channel "Both"
```

**Canaux disponibles:**
- WhatsApp (Business API)
- SMS (Twilio)
- Both (WhatsApp + SMS)

## 🔐 Conformité et Sécurité

### Code de Construction du Québec - Article 46

DevisPro assure la conformité avec l'Article 46 du Code de construction:

> *"Seuls les entrepreneurs titulaires d'une licence appropriée délivrée par la Régie du bâtiment du Québec (RBQ) peuvent exécuter des travaux de construction."*

**Notre validation inclut:**
- ✅ Numéro de licence RBQ valide
- ✅ Statut actif vérifié
- ✅ Spécialité appropriée (CMEQ/CMMTQ/RBQ)
- ✅ Date d'expiration valide
- ✅ Conformité Article 46

### Loi 101 (Charte de la langue française)

**Conformité complète:**
- 🇫🇷 Interface en français (fr-CA)
- 🇫🇷 Documentation en français
- 🇫🇷 Notifications en français
- 🇫🇷 Contrats et soumissions en français
- 🇬🇧 Traduction anglaise disponible en option

## 📊 Modèle de Commission

### Commission à la Réussite (15%)

DevisPro utilise un modèle **commission-on-win** plutôt que pay-per-lead:

| Aspect | DevisPro | Plateformes Traditionnelles |
|--------|----------|----------------------------|
| **Modèle** | 15% à la réussite | $20-50 par contrat |
| **Risque** | Faible - payez si vous gagnez | Élevé - payez à chaque fois |
| **Licence RBQ** | ✅ Vérification auto | ❌ Manuel ou aucune |
| **Paiement** | Interac e-Transfer | Carte de crédit |
| **Langue** | 🇫🇷 Français priorité | 🇬🇧 Anglais seulement |

**Exemple:**
- Projet: 8,500 CAD
- Commission DevisPro: **1,275 CAD** (seulement si vous gagnez)
- Plateforme traditionnelle: **$30-50 par contrat** (même si vous perdez)

## 🤝 Contribution

Les contributions sont les bienvenues! Voici comment contribuer:

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Contact

**DevisPro Québec**
- 📧 Email: info@devispro.qc.ca
- 📱 Téléphone: +1-514-555-0100
- 🌐 Site web: https://devispro.qc.ca
- 📍 Adresse: Montréal, Québec, Canada

## 🙏 Remerciements

- **RBQ (Régie du bâtiment du Québec)** - Pour l'API de validation des licences
- **Gouvernement du Québec** - Pour le Code de construction
- **OQLF (Office québécois de la langue française)** - Pour les normes linguistiques
- **Communauté des entrepreneurs du Québec** - Pour les retours et suggestions

## 📈 Roadmap

### Version 1.0 (Actuelle)
- ✅ Validation RBQ automatisée
- ✅ Distribution de contrats OpenClaw
- ✅ Intégration Interac e-Transfer
- ✅ Notifications WhatsApp/SMS
- ✅ Interface français-priorité

### Version 1.1 (À venir)
- 🔜 Application mobile iOS/Android
- 🔜 Système de notation et avis
- 🔜 Chatbot d'assistance (français)
- 🔜 Analytics et rapports détaillés

### Version 2.0 (Futur)
- 🔮 Intelligence artificielle pour matching
- 🔮 Plateforme de gestion de projets
- 🔮 Intégration comptable (QuickBooks)
- 🔮 Programme de fidélité entrepreneurs

---

**🇨🇦 Fait au Québec, pour le Québec**

*DevisPro - Votre succès, notre mission*
