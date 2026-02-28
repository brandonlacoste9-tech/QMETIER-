# Vérification des Antécédents et Identité

Système de vérification automatisé pour professionnels via API tierce.

## Objectif

Créer un processus de vérification fluide, mobile-first, conforme aux lois québécoises, qui s'intègre dans le flux d'inscription.

## Fournisseurs Recommandés (Canada/Québec)

### 1. Certn (Recommandé pour Q-MÉTIER)
- ✅ Spécialisé startups canadiennes
- ✅ Base de données SOQUIJ (Québec)
- ✅ API moderne et bien documentée
- ✅ Mobile-first
- ✅ Résultats en 15 min - 48h
- 💰 ~15-25 $ CAD par vérification

### 2. Sterling Backcheck
- ✅ Leader établi au Canada
- ✅ Partenariat Canada Post
- ✅ Vérification en personne disponible
- 💰 ~20-35 $ CAD par vérification

### 3. Checkr
- ✅ Utilisé par Uber/Lyft
- ✅ API puissante avec adjudication automatique
- ✅ Règles personnalisables
- 💰 ~18-30 $ CAD par vérification

### 4. Commissionnaires du Québec
- ✅ Expertise locale québécoise
- ✅ Résultats rapides
- ✅ Connaissance des lois provinciales
- 💰 ~25-40 $ CAD par vérification

## Processus de Vérification

### Étape 1: Inscription Initiale
```
Professionnel s'inscrit → Profil créé (statut: "non vérifié")
```

### Étape 2: Déclenchement Vérification
```
Après inscription de base → Redirection vers vérification
```

### Étape 3: Vérification d'Identité (Biométrique)
1. Photo pièce d'identité (permis de conduire QC, passeport)
2. Selfie en direct
3. Comparaison biométrique IA
4. Validation instantanée (< 30 secondes)

### Étape 4: Consentement Légal
- Formulaire de consentement numérique
- Signature électronique
- Conforme Loi 25 (Québec)
- Conforme LPRPDE (Canada)

### Étape 5: Vérification Antécédents
- Recherche CPIC (RCMP)
- Vérification casier judiciaire
- Recherche SOQUIJ (Québec)
- Vérification permis/licences (optionnel)

### Étape 6: Résultat
- "Clear" → Badge vérifié automatique
- "Flagged" → Révision manuelle
- "Pending" → En attente (24-48h)

## Intégration Technique

### Backend API Endpoints

```python
# POST /professionals/verify/initiate
async def initiate_verification(professional_id: UUID):
    """Démarre le processus de vérification"""
    # 1. Créer session Certn
    # 2. Générer lien sécurisé
    # 3. Envoyer SMS/Email au pro
    # 4. Retourner session_id

# POST /professionals/verify/webhook
async def verification_webhook(payload: dict):
    """Reçoit résultats de Certn"""
    # 1. Valider signature webhook
    # 2. Extraire résultat
    # 3. Mettre à jour profil pro
    # 4. Envoyer notification

# GET /professionals/{id}/verification-status
async def get_verification_status(professional_id: UUID):
    """Statut actuel de vérification"""
    return {
        "status": "verified|pending|failed",
        "verified_at": "2024-02-28T10:00:00Z",
        "checks_completed": ["identity", "criminal_record"],
        "badge_level": "gold|silver|bronze"
    }
```

### Frontend Flow

```typescript
// Composant de vérification
const VerificationFlow = () => {
  const [step, setStep] = useState('intro')
  
  // Étapes:
  // 1. intro - Explication du processus
  // 2. consent - Consentement légal
  // 3. identity - Vérification ID + selfie
  // 4. background - Vérification antécédents
  // 5. complete - Confirmation
  
  return (
    <div className="verification-wizard">
      {step === 'intro' && <IntroStep />}
      {step === 'consent' && <ConsentStep />}
      {step === 'identity' && <IdentityVerification />}
      {step === 'background' && <BackgroundCheck />}
      {step === 'complete' && <VerificationComplete />}
    </div>
  )
}
```

## Modèle de Données

```python
class VerificationRecord(Base):
    __tablename__ = "verification_records"
    
    id = Column(UUID, primary_key=True)
    professional_id = Column(UUID, ForeignKey("professionals.id"))
    
    # Statut
    status = Column(Enum("pending", "verified", "failed", "expired"))
    
    # Vérification identité
    identity_verified = Column(Boolean, default=False)
    identity_verified_at = Column(DateTime)
    identity_provider = Column(String)  # "certn", "sterling"
    
    # Vérification antécédents
    background_check_status = Column(String)  # "clear", "flagged", "pending"
    background_check_completed_at = Column(DateTime)
    background_check_report_id = Column(String)
    
    # Détails
    checks_completed = Column(ARRAY(String))  # ["identity", "criminal", "license"]
    badge_level = Column(String)  # "gold", "silver", "bronze"
    
    # Renouvellement
    expires_at = Column(DateTime)  # Renouveler chaque année
    last_renewed_at = Column(DateTime)
    
    # Métadonnées
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.utcnow)
```

## Badges de Vérification

### Badge Or (Gold) 🥇
- ✅ Identité vérifiée
- ✅ Casier judiciaire vérifié (clear)
- ✅ Permis/licences vérifiés
- ✅ Assurance responsabilité
- ✅ Références vérifiées

### Badge Argent (Silver) 🥈
- ✅ Identité vérifiée
- ✅ Casier judiciaire vérifié (clear)
- ✅ Permis/licences vérifiés

### Badge Bronze 🥉
- ✅ Identité vérifiée
- ✅ Casier judiciaire vérifié (clear)

## Conformité Légale

### Loi 25 (Québec)
- ✅ Consentement explicite requis
- ✅ Droit de retrait
- ✅ Transparence sur utilisation données
- ✅ Stockage sécurisé
- ✅ Notification en cas de fuite

### LPRPDE (Canada)
- ✅ Collecte limitée au nécessaire
- ✅ Utilisation conforme à l'objectif
- ✅ Conservation limitée dans le temps
- ✅ Sécurité appropriée

### Loi C-27 (Projet)
- ✅ Prêt pour nouvelles exigences
- ✅ Portabilité des données
- ✅ Droit à l'oubli

## Coûts et Modèle Économique

### Option 1: Q-MÉTIER Paie
- Coût: 20 $ par vérification
- Avantage: Friction zéro pour pros
- Inconvénient: Coût initial élevé

### Option 2: Professionnel Paie
- Coût: 25 $ payé par le pro
- Avantage: Pas de coût pour plateforme
- Inconvénient: Friction dans inscription

### Option 3: Hybride (Recommandé)
- Premiers 100 pros: Gratuit (Q-MÉTIER paie)
- Ensuite: 15 $ pro + 5 $ Q-MÉTIER
- Renouvellement annuel: 10 $

## Expérience Utilisateur

### Pour le Professionnel

**Temps total:** 5-10 minutes

1. **Intro (30 sec)**
   - "Devenez un artisan vérifié"
   - Explication badges
   - Avantages vérification

2. **Consentement (1 min)**
   - Lecture conditions
   - Signature électronique
   - Confirmation

3. **Identité (2 min)**
   - Photo permis de conduire
   - Selfie en direct
   - Validation instantanée

4. **Antécédents (2 min)**
   - Informations personnelles
   - Adresses précédentes
   - Soumission

5. **Attente (15 min - 48h)**
   - Notification par SMS/Email
   - Statut visible dans profil

6. **Confirmation**
   - Badge ajouté au profil
   - Notification clients
   - Visibilité accrue

### Pour le Client

**Indicateurs de confiance:**
- Badge vérifié visible
- Date de vérification
- Niveau de badge (or/argent/bronze)
- "Identité et antécédents vérifiés"
- Tooltip explicatif

## Tests

```python
def test_verification_flow():
    """Test complet du flux de vérification"""
    # 1. Initier vérification
    # 2. Simuler webhook Certn
    # 3. Vérifier badge ajouté
    # 4. Vérifier notification envoyée

def test_expired_verification():
    """Test renouvellement après expiration"""
    # 1. Créer vérification expirée
    # 2. Vérifier badge retiré
    # 3. Vérifier notification renouvellement

def test_failed_verification():
    """Test échec vérification"""
    # 1. Simuler échec
    # 2. Vérifier statut
    # 3. Vérifier notification
```

## Monitoring

### Métriques Clés
- Taux de complétion vérification
- Temps moyen de vérification
- Taux de succès/échec
- Coût par vérification
- Impact sur conversions

### Alertes
- Taux d'échec > 10%
- Temps de vérification > 72h
- Coût > budget
- Expirations non renouvelées

## Roadmap

### Phase 1 (Mois 1)
- Intégration Certn API
- Flow de base (identité + antécédents)
- Badge bronze

### Phase 2 (Mois 2)
- Vérification permis/licences
- Badge argent
- Renouvellement automatique

### Phase 3 (Mois 3)
- Vérification assurance
- Vérification références
- Badge or

### Phase 4 (Mois 4+)
- Vérification continue
- Monitoring en temps réel
- Intégration Régie du bâtiment QC
