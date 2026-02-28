# 🚀 Guide de Démarrage Rapide - DevisPro

## Installation Rapide (5 minutes)

### 1. Cloner le Projet
```bash
git clone https://github.com/brandonlacoste9-tech/thumbstack-.git
cd thumbstack-
```

### 2. Vérifier PowerShell
```bash
pwsh --version
# Version 7.0+ requise
```

### 3. Lancer la Démo Complète
```bash
cd scripts
pwsh demo.ps1
```

## Utilisation des Modules Individuels

### 🔍 Validation RBQ
```bash
cd src/validation
pwsh rbq-validator.ps1 -LicenseNumber "5234-8976-01" -LicenseType "CMEQ"
```

**Résultat attendu:**
- ✅ Vérification du format de licence
- ✅ Validation du type (CMEQ/CMMTQ/RBQ)
- ✅ Conformité Article 46
- ✅ Fichier JSON de validation créé

### 🤖 Distribution de Contrats (OpenClaw)
```bash
cd src/automation
pwsh openclaw-engine.ps1
```

**Ce que fait OpenClaw:**
1. Crée un nouveau contrat exemple
2. Recherche les entrepreneurs qualifiés RBQ
3. Calcule le score de correspondance (rating × taux de réponse)
4. Sélectionne les 3 meilleurs entrepreneurs
5. Envoie les notifications WhatsApp/SMS
6. Sauvegarde la distribution dans `data/leads/`

### 💳 Traitement de Paiement
```bash
cd src/payment
pwsh interac-integration.ps1
```

**Fonctionnalités:**
- Calcul automatique de la commission (15%)
- Génération de transaction Interac e-Transfer
- Sauvegarde dans `data/payments/`

### 📱 Notifications
```bash
cd src/notifications
pwsh notification-service.ps1 -Channel "Both"
```

**Options de canal:**
- `WhatsApp` - Notification WhatsApp uniquement
- `SMS` - SMS uniquement
- `Both` - Les deux (recommandé)

## Visualiser le Frontend

### Option 1: Navigateur Direct
```bash
# macOS
open frontend/pages/index.html

# Linux
xdg-open frontend/pages/index.html

# Windows
start frontend/pages/index.html
```

### Option 2: Serveur Local
```bash
cd frontend/pages
python -m http.server 8000
# Ouvrir http://localhost:8000
```

## Structure des Données

### Entrepreneurs (data/contractors/)
```json
{
  "id": "CTR-001",
  "companyName": "Électrique Pro Québec Inc.",
  "rbqLicense": "5234-8976-01",
  "licenseType": "CMEQ",
  "rating": 4.8,
  "responseRate": 0.95
}
```

### Contrats (data/leads/)
```json
{
  "id": "LEAD-1234",
  "serviceType": "Électricité",
  "projectValue": 8500,
  "commission": 1275,
  "status": "Distribué"
}
```

### Paiements (data/payments/)
```json
{
  "transactionId": "INT-123456",
  "amount": 1275.00,
  "currency": "CAD",
  "provider": "Interac"
}
```

## Scénario de Test Complet

### 1. Valider un Entrepreneur
```bash
pwsh src/validation/rbq-validator.ps1 -LicenseNumber "5234-8976-01" -LicenseType "CMEQ"
```
✅ Entrepreneur validé et conforme Article 46

### 2. Créer et Distribuer un Contrat
```bash
pwsh src/automation/openclaw-engine.ps1
```
✅ Contrat distribué aux 3 meilleurs entrepreneurs

### 3. Envoyer des Notifications
```bash
pwsh src/notifications/notification-service.ps1 -Channel "Both"
```
✅ Notifications envoyées par WhatsApp et SMS

### 4. Traiter le Paiement
```bash
pwsh src/payment/interac-integration.ps1
```
✅ Commission de 1,275 CAD (15%) traitée par Interac

## Personnalisation

### Modifier la Configuration
Éditez `config/app.config.json`:
```json
{
  "commissionRate": 0.15,
  "locale": "fr-CA",
  "rbq": {
    "licenseTypes": ["CMEQ", "CMMTQ", "RBQ"]
  }
}
```

### Ajouter des Entrepreneurs
Ajoutez-les dans `data/contractors/sample-contractors.json`

### Modifier les Traductions
Éditez `src/localization/fr-CA.json`

## Dépannage

### PowerShell ne démarre pas
```bash
# Installer PowerShell 7+
# macOS
brew install powershell

# Linux (Ubuntu/Debian)
sudo apt install -y powershell

# Windows
winget install Microsoft.PowerShell
```

### Les scripts ne s'exécutent pas
```powershell
# Autoriser l'exécution de scripts (Windows)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Erreur de chemin
```bash
# Toujours exécuter depuis le bon répertoire
cd /chemin/vers/thumbstack-/src/validation
pwsh rbq-validator.ps1
```

## Prochaines Étapes

1. ✅ Testez tous les modules
2. 📝 Personnalisez la configuration
3. 🎨 Modifiez le frontend selon vos besoins
4. 🚀 Déployez en production
5. 📈 Surveillez les métriques

## Support

- 📧 Email: info@devispro.qc.ca
- 📖 Documentation: README.md
- 🐛 Problèmes: GitHub Issues
- 💬 Discussions: GitHub Discussions

---

**🇨🇦 DevisPro - Fait au Québec, pour le Québec**
