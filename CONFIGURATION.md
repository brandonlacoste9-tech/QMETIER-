# ⚙️ Guide de Configuration - DevisPro

Ce guide explique comment configurer et personnaliser DevisPro pour votre environnement.

## Configuration Principale

### Fichier: `config/app.config.json`

```json
{
  "appName": "DevisPro",
  "version": "1.0.0",
  "locale": "fr-CA",
  "region": "Quebec",
  "compliance": {
    "rbqValidation": true,
    "bill101Compliant": true,
    "codeConstruction": "Article 46"
  },
  "payment": {
    "provider": "Interac",
    "commissionRate": 0.15,
    "pricingModel": "commission-on-win"
  },
  "notifications": {
    "whatsapp": {
      "enabled": true,
      "apiEndpoint": "https://api.whatsapp.com/send"
    },
    "sms": {
      "enabled": true,
      "provider": "Twilio"
    }
  },
  "rbq": {
    "apiEndpoint": "https://www.rbq.gouv.qc.ca/services/api",
    "licenseTypes": ["CMEQ", "CMMTQ"],
    "validationInterval": 86400
  },
  "targetContractors": 40000,
  "supportedServices": [
    "Électricité",
    "Plomberie",
    "Chauffage",
    "Climatisation",
    "Rénovation",
    "Construction",
    "Toiture",
    "Fenêtres",
    "Isolation"
  ]
}
```

## Paramètres Détaillés

### 1. Paramètres d'Application

| Paramètre | Type | Description | Valeur par défaut |
|-----------|------|-------------|-------------------|
| `appName` | string | Nom de l'application | "DevisPro" |
| `version` | string | Version de l'application | "1.0.0" |
| `locale` | string | Langue principale | "fr-CA" |
| `region` | string | Région cible | "Quebec" |

**Exemple de modification:**
```json
{
  "appName": "DevisProMontreal",
  "locale": "fr-CA",
  "region": "Montréal"
}
```

### 2. Conformité

| Paramètre | Type | Description |
|-----------|------|-------------|
| `rbqValidation` | boolean | Activer validation RBQ |
| `bill101Compliant` | boolean | Conformité Loi 101 |
| `codeConstruction` | string | Article du code |

**⚠️ Important:** Ne pas désactiver `rbqValidation` en production!

### 3. Paiements

#### Taux de Commission

**Modifier le taux de commission:**
```json
{
  "payment": {
    "commissionRate": 0.15  // 15% (défaut)
  }
}
```

**Exemples de taux:**
- 0.10 = 10% (réduction)
- 0.15 = 15% (standard)
- 0.20 = 20% (premium)

#### Calcul Automatique

La commission est calculée automatiquement:
```
Commission = Valeur du Projet × Taux de Commission
```

**Exemples:**
```
8,500 CAD × 0.15 = 1,275 CAD
10,000 CAD × 0.15 = 1,500 CAD
50,000 CAD × 0.15 = 7,500 CAD
```

### 4. Notifications

#### WhatsApp

```json
{
  "whatsapp": {
    "enabled": true,
    "apiEndpoint": "https://api.whatsapp.com/send",
    "apiKey": "VOTRE_CLE_API",
    "businessAccountId": "VOTRE_ID"
  }
}
```

**Configuration WhatsApp Business:**
1. Créer compte WhatsApp Business
2. Obtenir API key
3. Configurer webhook
4. Mettre à jour `apiKey` et `businessAccountId`

#### SMS (Twilio)

```json
{
  "sms": {
    "enabled": true,
    "provider": "Twilio",
    "accountSid": "VOTRE_ACCOUNT_SID",
    "authToken": "VOTRE_AUTH_TOKEN",
    "fromNumber": "+15145551234"
  }
}
```

**Configuration Twilio:**
1. Créer compte Twilio
2. Obtenir Account SID et Auth Token
3. Acheter numéro de téléphone
4. Mettre à jour la configuration

### 5. Validation RBQ

```json
{
  "rbq": {
    "apiEndpoint": "https://www.rbq.gouv.qc.ca/services/api",
    "apiKey": "VOTRE_CLE_RBQ",
    "licenseTypes": ["CMEQ", "CMMTQ", "RBQ"],
    "validationInterval": 86400,  // 24 heures en secondes
    "cacheEnabled": true
  }
}
```

**Types de Licences Supportés:**
- **CMEQ**: Électriciens
- **CMMTQ**: Mécaniciens en bâtiment
- **RBQ**: Entrepreneurs généraux

**Intervalle de Validation:**
- 3600 = 1 heure
- 86400 = 24 heures (recommandé)
- 604800 = 7 jours

### 6. Services Supportés

**Ajouter de nouveaux services:**
```json
{
  "supportedServices": [
    "Électricité",
    "Plomberie",
    "Chauffage",
    "Climatisation",
    "Rénovation",
    "Construction",
    "Toiture",
    "Fenêtres",
    "Isolation",
    "Peinture",        // Nouveau
    "Planchers",       // Nouveau
    "Maçonnerie"       // Nouveau
  ]
}
```

## Configuration Avancée

### Variables d'Environnement

Créer fichier `.env`:
```bash
# DevisPro Configuration
DEVISPRO_ENV=production
DEVISPRO_PORT=8000
DEVISPRO_DEBUG=false

# API Keys (GARDER SECRET!)
WHATSAPP_API_KEY=votre_cle_ici
TWILIO_ACCOUNT_SID=votre_sid_ici
TWILIO_AUTH_TOKEN=votre_token_ici
RBQ_API_KEY=votre_cle_rbq_ici

# Interac e-Transfer
INTERAC_MERCHANT_ID=votre_merchant_id
INTERAC_API_KEY=votre_cle_interac

# Base de données (si utilisée)
DATABASE_URL=postgresql://user:pass@localhost:5432/devispro
```

**⚠️ Sécurité:** Ne jamais commiter `.env` dans Git!

### Localisation Personnalisée

#### Modifier les Traductions

Fichier: `src/localization/fr-CA.json`

**Ajouter de nouvelles traductions:**
```json
{
  "custom": {
    "welcomeMessage": "Bienvenue sur DevisPro!",
    "specialOffer": "Offre spéciale: 10% de réduction",
    "newFeature": "Nouvelle fonctionnalité disponible"
  }
}
```

**Utiliser dans le code:**
```javascript
const translations = loadJSON('src/localization/fr-CA.json');
console.log(translations.custom.welcomeMessage);
```

### Frontend Personnalisé

#### Couleurs

Fichier: `frontend/css/styles.css`

```css
:root {
    /* Personnaliser les couleurs */
    --primary-blue: #0051A5;      /* Bleu principal */
    --secondary-blue: #0066CC;     /* Bleu secondaire */
    --accent-gold: #FFD700;        /* Or accent */
    
    /* Changer pour votre marque */
    --primary-blue: #YOUR_COLOR;
    --secondary-blue: #YOUR_COLOR;
}
```

#### Logo

Remplacer l'emoji dans `frontend/pages/index.html`:
```html
<!-- Ancien -->
<h1>🏗️ DevisPro</h1>

<!-- Nouveau avec image -->
<h1><img src="../images/logo.png" alt="Logo"> DevisPro</h1>
```

## Configuration par Environnement

### Développement

`config/app.config.dev.json`:
```json
{
  "appName": "DevisPro Dev",
  "debug": true,
  "rbq": {
    "apiEndpoint": "https://sandbox.rbq.gouv.qc.ca/api",
    "validationInterval": 3600
  },
  "notifications": {
    "whatsapp": {
      "enabled": false  // Désactivé en dev
    }
  }
}
```

### Production

`config/app.config.prod.json`:
```json
{
  "appName": "DevisPro",
  "debug": false,
  "rbq": {
    "apiEndpoint": "https://www.rbq.gouv.qc.ca/services/api",
    "validationInterval": 86400
  },
  "notifications": {
    "whatsapp": {
      "enabled": true
    }
  },
  "security": {
    "sslEnabled": true,
    "corsEnabled": true,
    "rateLimit": 100
  }
}
```

## Sécurité

### Meilleures Pratiques

1. **Ne jamais exposer les clés API**
   ```json
   // ❌ Mauvais
   {
     "apiKey": "sk_live_123456789"
   }
   
   // ✅ Bon
   {
     "apiKey": "${WHATSAPP_API_KEY}"  // Variable d'environnement
   }
   ```

2. **Validation des entrées**
   - Toujours valider les numéros RBQ
   - Vérifier les montants de paiement
   - Échapper les entrées utilisateur

3. **HTTPS Obligatoire**
   - Toujours utiliser HTTPS en production
   - Activer SSL/TLS pour l'API RBQ

4. **Limitation de taux**
   ```json
   {
     "rateLimit": {
       "maxRequests": 100,
       "windowMinutes": 15
     }
   }
   ```

## Performance

### Cache RBQ

```json
{
  "rbq": {
    "cacheEnabled": true,
    "cacheTTL": 86400,  // 24 heures
    "maxCacheSize": 10000  // Nombre de licences
  }
}
```

### Optimisations

1. **Batch Processing**
   - Traiter plusieurs validations en lot
   - Réduire les appels API

2. **Compression**
   ```json
   {
     "compression": {
       "enabled": true,
       "level": 6
     }
   }
   ```

3. **CDN pour Frontend**
   - Héberger CSS/JS sur CDN
   - Réduire la charge serveur

## Monitoring

### Logs

```json
{
  "logging": {
    "level": "info",  // debug, info, warn, error
    "destination": "logs/devispro.log",
    "maxSize": "100MB",
    "retention": "30d"
  }
}
```

### Métriques

```json
{
  "metrics": {
    "enabled": true,
    "endpoint": "https://metrics.devispro.qc.ca",
    "interval": 60  // secondes
  }
}
```

## Support Multi-Tenant

Pour supporter plusieurs organisations:

```json
{
  "multiTenant": {
    "enabled": true,
    "tenants": [
      {
        "id": "montreal",
        "name": "DevisPro Montréal",
        "region": "Montréal",
        "commissionRate": 0.15
      },
      {
        "id": "quebec",
        "name": "DevisPro Québec",
        "region": "Québec",
        "commissionRate": 0.12
      }
    ]
  }
}
```

## Backup et Restauration

### Configuration Backup

```json
{
  "backup": {
    "enabled": true,
    "schedule": "0 2 * * *",  // 2h AM tous les jours
    "destination": "s3://devispro-backups/",
    "retention": "90d"
  }
}
```

## Checklist de Déploiement

- [ ] Mettre à jour toutes les clés API
- [ ] Configurer variables d'environnement
- [ ] Activer HTTPS
- [ ] Configurer les notifications (WhatsApp/SMS)
- [ ] Tester la validation RBQ en production
- [ ] Configurer les backups
- [ ] Activer le monitoring
- [ ] Tester le flux complet
- [ ] Documenter la configuration spécifique

---

**⚙️ Configuration complète = Déploiement réussi**
