# 🧪 Guide de Tests - DevisPro

Ce document décrit comment tester toutes les fonctionnalités de la plateforme DevisPro.

## Table des Matières

1. [Tests des Modules PowerShell](#tests-des-modules-powershell)
2. [Tests d'Intégration](#tests-dintégration)
3. [Tests Frontend](#tests-frontend)
4. [Tests de Conformité](#tests-de-conformité)
5. [Scénarios de Test Complets](#scénarios-de-test-complets)

## Tests des Modules PowerShell

### 1. Test de Validation RBQ

#### Test 1.1: Licence Valide CMEQ
```powershell
cd src/validation
pwsh rbq-validator.ps1 -LicenseNumber "5234-8976-01" -LicenseType "CMEQ"
```

**Résultat attendu:**
```
✓ LICENCE VALIDE
  Entreprise: Entreprise Construction Exemple Inc.
  Statut: Actif
  Type: Entrepreneur électricien
  Conformité Article 46: True
```

#### Test 1.2: Licence Format Invalide
```powershell
pwsh rbq-validator.ps1 -LicenseNumber "INVALID" -LicenseType "CMEQ"
```

**Résultat attendu:**
```
✗ LICENCE INVALIDE
  Erreur: Format de numéro de licence invalide
```

#### Test 1.3: Licence CMMTQ
```powershell
pwsh rbq-validator.ps1 -LicenseNumber "6543-2109-02" -LicenseType "CMMTQ"
```

**Résultat attendu:**
```
✓ LICENCE VALIDE
  Type: Entrepreneur en mécanique du bâtiment
```

### 2. Test Distribution OpenClaw

#### Test 2.1: Distribution Standard
```powershell
cd src/automation
pwsh openclaw-engine.ps1
```

**Vérifications:**
- [x] Génération d'un ID de contrat unique (LEAD-XXXX)
- [x] Calcul correct de la commission (15% de 8500 = 1275 CAD)
- [x] Sélection de 3 entrepreneurs qualifiés
- [x] Envoi de notifications simulées
- [x] Création du fichier JSON dans `data/leads/`

#### Test 2.2: Vérifier le Fichier de Sortie
```powershell
Get-Content data/leads/lead-*.json | ConvertFrom-Json | Format-List
```

**Champs attendus:**
- LeadId
- ServiceType
- CommissionAmount (15% du ProjectValue)
- AssignedContractors (array avec 1-3 entrepreneurs)
- Status: "Distribué"

### 3. Test Notifications

#### Test 3.1: WhatsApp Seulement
```powershell
cd src/notifications
pwsh notification-service.ps1 -Channel "WhatsApp"
```

**Vérifications:**
- [x] Notification WhatsApp envoyée
- [x] ID de notification généré (WA-XXXXXX)
- [x] Message en français
- [x] Langue: fr-CA

#### Test 3.2: SMS Seulement
```powershell
pwsh notification-service.ps1 -Channel "SMS"
```

**Vérifications:**
- [x] SMS envoyé
- [x] ID de notification (SMS-XXXXXX)
- [x] Message tronqué (< 160 caractères)

#### Test 3.3: Les Deux Canaux
```powershell
pwsh notification-service.ps1 -Channel "Both"
```

**Vérifications:**
- [x] 2 notifications créées
- [x] WhatsApp + SMS
- [x] Fichier JSON sauvegardé

### 4. Test Paiements Interac

#### Test 4.1: Paiement Standard
```powershell
cd src/payment
pwsh interac-integration.ps1
```

**Vérifications:**
- [x] Transaction ID généré (INT-XXXXXX)
- [x] Commission calculée: 1275 CAD (15% de 8500)
- [x] Provider: "Interac"
- [x] Status: "Pending"
- [x] Fichier JSON créé dans `data/payments/`

#### Test 4.2: Calcul de Commission
```powershell
# Vérifier que la commission est exactement 15%
# 8500 × 0.15 = 1275.00
```

## Tests d'Intégration

### Scénario 1: Cycle Complet de Contrat

```powershell
# 1. Valider entrepreneur
pwsh src/validation/rbq-validator.ps1 -LicenseNumber "5234-8976-01" -LicenseType "CMEQ"

# 2. Distribuer contrat
pwsh src/automation/openclaw-engine.ps1

# 3. Envoyer notifications
pwsh src/notifications/notification-service.ps1 -Channel "Both"

# 4. Traiter paiement
pwsh src/payment/interac-integration.ps1
```

**Résultat final:**
- ✅ 4 fichiers JSON créés
- ✅ Toutes les étapes réussies
- ✅ Commission correctement calculée

### Scénario 2: Plusieurs Entrepreneurs

```powershell
# Vérifier que plusieurs entrepreneurs peuvent être validés
pwsh src/validation/rbq-validator.ps1 -LicenseNumber "5234-8976-01" -LicenseType "CMEQ"
pwsh src/validation/rbq-validator.ps1 -LicenseNumber "6543-2109-02" -LicenseType "CMMTQ"
pwsh src/validation/rbq-validator.ps1 -LicenseNumber "7821-4536-03" -LicenseType "RBQ"
```

**Vérification:**
- Tous doivent être validés avec succès
- 3 fichiers de validation créés

## Tests Frontend

### Test 1: Ouverture de la Page
```bash
# Ouvrir dans navigateur
open frontend/pages/index.html
```

**Vérifications visuelles:**
- [x] Page charge sans erreurs
- [x] Header avec logo DevisPro visible
- [x] Navigation fonctionne
- [x] Section hero avec titre en français
- [x] 9 cartes de services affichées
- [x] Footer avec informations

### Test 2: Responsive Design
```
Tester sur différentes résolutions:
- Desktop: 1920×1080
- Tablette: 768×1024
- Mobile: 375×667
```

**Vérifications:**
- [x] Mise en page s'adapte
- [x] Navigation mobile fonctionne
- [x] Cartes empilées verticalement sur mobile

### Test 3: JavaScript
```javascript
// Ouvrir console navigateur (F12)
// Vérifier absence d'erreurs JavaScript
// Tester fonctions:
validateRBQLicense("5234-8976-01") // devrait retourner true
calculateCommission(8500) // devrait retourner 1275
formatCurrency(8500) // devrait retourner "8 500,00 $"
```

## Tests de Conformité

### Test Bill 101 (Loi 101)

**Vérifications:**
- [x] Interface principale en français
- [x] Fichier de localisation fr-CA.json existe
- [x] Tous les textes UI en français
- [x] Documentation en français
- [x] Messages d'erreur en français

**Commande de vérification:**
```bash
# Compter les mots français vs anglais dans le frontend
grep -r "français\|québec\|entrepreneur" frontend/ | wc -l
```

### Test Article 46 - Code de Construction

**Vérifications:**
- [x] Validation RBQ obligatoire
- [x] Vérification des types de licence (CMEQ/CMMTQ/RBQ)
- [x] Champ ComplianceArticle46: true
- [x] Statut de licence vérifié

### Test Commission 15%

**Vérifications mathématiques:**
```
Projet 1,000 CAD → Commission 150 CAD
Projet 5,000 CAD → Commission 750 CAD
Projet 8,500 CAD → Commission 1,275 CAD
Projet 10,000 CAD → Commission 1,500 CAD
Projet 50,000 CAD → Commission 7,500 CAD
```

## Scénarios de Test Complets

### Scénario A: Client Demande Électricien

1. Client visite frontend
2. Sélectionne service "Électricité"
3. Remplit formulaire (nom, projet, budget 8500$)
4. Système valide entrepreneurs CMEQ
5. OpenClaw distribue aux 3 meilleurs
6. Notifications envoyées (WhatsApp/SMS)
7. Entrepreneur accepte
8. Projet complété
9. Commission 1,275$ (15%) via Interac

**Commandes:**
```powershell
pwsh src/validation/rbq-validator.ps1 -LicenseNumber "5234-8976-01" -LicenseType "CMEQ"
pwsh src/automation/openclaw-engine.ps1
pwsh src/notifications/notification-service.ps1 -Channel "Both"
pwsh src/payment/interac-integration.ps1
```

### Scénario B: Multiple Contractors

1. Valider 5 entrepreneurs différents
2. Distribuer 3 contrats simultanément
3. Vérifier que les distributions sont équitables
4. Vérifier que les meilleurs sont sélectionnés

### Scénario C: Validation de Sécurité

**Test de format de licence:**
```powershell
# Formats valides
"1234-5678-90"  ✅
"0000-0000-00"  ✅

# Formats invalides
"123-456-78"    ❌
"ABCD-EFGH-IJ"  ❌
"12345678"      ❌
```

## Métriques de Performance

### Temps d'Exécution Attendus

| Module | Temps | Statut |
|--------|-------|--------|
| Validation RBQ | < 1s | ✅ |
| Distribution OpenClaw | < 2s | ✅ |
| Notifications | < 1s | ✅ |
| Paiement | < 1s | ✅ |
| Frontend Load | < 2s | ✅ |

## Rapport de Test

### Template de Rapport

```markdown
# Rapport de Test - DevisPro
Date: [DATE]
Testeur: [NOM]

## Résumé
- Tests réussis: X/Y
- Tests échoués: X/Y
- Taux de réussite: XX%

## Détails

### Module Validation RBQ
- [ ] Test 1.1: Licence valide CMEQ
- [ ] Test 1.2: Format invalide
- [ ] Test 1.3: Licence CMMTQ

### Module OpenClaw
- [ ] Test 2.1: Distribution standard
- [ ] Test 2.2: Fichier de sortie

### Module Notifications
- [ ] Test 3.1: WhatsApp
- [ ] Test 3.2: SMS
- [ ] Test 3.3: Les deux

### Module Paiements
- [ ] Test 4.1: Paiement standard
- [ ] Test 4.2: Calcul commission

### Conformité
- [ ] Bill 101
- [ ] Article 46
- [ ] Commission 15%

## Problèmes Identifiés
[Liste des problèmes]

## Recommandations
[Recommandations]
```

## Automatisation des Tests

### Script de Test Automatique

Créer `scripts/run-tests.ps1`:
```powershell
Write-Host "🧪 Exécution des tests DevisPro..." -ForegroundColor Cyan

$tests = @(
    @{ Name = "Validation RBQ"; Script = "src/validation/rbq-validator.ps1"; Args = @("-LicenseNumber", "5234-8976-01", "-LicenseType", "CMEQ") },
    @{ Name = "OpenClaw"; Script = "src/automation/openclaw-engine.ps1"; Args = @() },
    @{ Name = "Notifications"; Script = "src/notifications/notification-service.ps1"; Args = @("-Channel", "Both") },
    @{ Name = "Paiements"; Script = "src/payment/interac-integration.ps1"; Args = @() }
)

$passed = 0
$failed = 0

foreach ($test in $tests) {
    Write-Host "`nTest: $($test.Name)" -ForegroundColor Yellow
    try {
        & $test.Script @($test.Args)
        $passed++
        Write-Host "✅ PASS" -ForegroundColor Green
    } catch {
        $failed++
        Write-Host "❌ FAIL" -ForegroundColor Red
    }
}

Write-Host "`n╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║        RÉSULTATS DES TESTS             ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host "  Réussis: $passed" -ForegroundColor Green
Write-Host "  Échoués: $failed" -ForegroundColor Red
Write-Host "  Total: $($passed + $failed)" -ForegroundColor White
```

---

**🧪 Tests complets = Qualité garantie**
