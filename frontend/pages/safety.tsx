import Head from 'next/head'
import { useTranslation } from '../lib/i18n'

import SEOHead from '../components/SEOHead'

export default function SafetyPage() {
  const { t } = useTranslation()
  
  return (
    <>
      <SEOHead
        titleFr="Sécurité et Vérification - Q-MÉTIER | Professionnels Vérifiés au Québec"
        titleEn="Safety and Verification - Q-MÉTIER | Verified Professionals in Quebec"
        descriptionFr="Tous nos professionnels sont vérifiés. Vérification d'identité gratuite et vérification complète disponible. Évaluations et avis vérifiés. Confiance et sécurité garanties."
        descriptionEn="All our professionals are verified. Free identity verification and full background check available. Verified reviews and ratings. Trust and safety guaranteed."
        keywordsFr="professionnel vérifié Québec, vérification antécédents, sécurité, confiance, évaluations vérifiées, background check, Certn, RBQ, plombier vérifié, électricien vérifié"
        keywordsEn="verified professional Quebec, background check, safety, trust, verified reviews, Certn, RBQ, verified plumber, verified electrician"
        canonical="https://qmetier.ca/safety"
      />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🛡️</div>
            <h1 className="text-4xl font-bold mb-4">
              Sécurité et Confiance
            </h1>
            <p className="text-xl text-gray-600">
              Votre sécurité est notre priorité absolue
            </p>
          </div>

          {/* Processus de Vérification */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">
              Comment nous vérifions nos artisans
            </h2>
            
            <div className="space-y-6">
              {/* Étape 1 */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Vérification d'identité biométrique
                  </h3>
                  <p className="text-gray-600">
                    Chaque professionnel doit prendre une photo de sa pièce d'identité gouvernementale 
                    (permis de conduire du Québec ou passeport) et un selfie en direct. Notre technologie 
                    d'intelligence artificielle compare les deux pour confirmer l'identité en quelques secondes.
                  </p>
                </div>
              </div>

              {/* Étape 2 */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Vérification des antécédents judiciaires
                  </h3>
                  <p className="text-gray-600">
                    Avec le consentement écrit du professionnel, nous effectuons une vérification complète 
                    des antécédents criminels via la base de données du Centre d'information de la police 
                    canadienne (CIPC) géré par la GRC, ainsi que la base SOQUIJ pour le Québec.
                  </p>
                </div>
              </div>

              {/* Étape 3 */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Vérification des permis et licences
                  </h3>
                  <p className="text-gray-600">
                    Pour les métiers réglementés, nous vérifions que le professionnel détient les permis 
                    et licences requis auprès de la Régie du bâtiment du Québec (RBQ) et des corporations 
                    professionnelles pertinentes.
                  </p>
                </div>
              </div>

              {/* Étape 4 */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Badge de confiance
                  </h3>
                  <p className="text-gray-600">
                    Une fois toutes les vérifications complétées avec succès, le professionnel reçoit 
                    notre badge de confiance Q-MÉTIER, visible sur son profil. Ce badge est renouvelé 
                    annuellement pour garantir une sécurité continue.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Badges */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">
              Niveaux de vérification
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Badge Or */}
              <div className="border-2 border-yellow-500 rounded-lg p-6 text-center">
                <div className="text-5xl mb-3">🥇</div>
                <h3 className="text-xl font-bold mb-3">Badge Or</h3>
                <ul className="text-sm text-left space-y-2">
                  <li>✅ Identité vérifiée</li>
                  <li>✅ Antécédents vérifiés</li>
                  <li>✅ Permis/licences vérifiés</li>
                  <li>✅ Assurance responsabilité</li>
                  <li>✅ Références vérifiées</li>
                </ul>
              </div>

              {/* Badge Argent */}
              <div className="border-2 border-gray-400 rounded-lg p-6 text-center">
                <div className="text-5xl mb-3">🥈</div>
                <h3 className="text-xl font-bold mb-3">Badge Argent</h3>
                <ul className="text-sm text-left space-y-2">
                  <li>✅ Identité vérifiée</li>
                  <li>✅ Antécédents vérifiés</li>
                  <li>✅ Permis/licences vérifiés</li>
                </ul>
              </div>

              {/* Badge Bronze */}
              <div className="border-2 border-orange-600 rounded-lg p-6 text-center">
                <div className="text-5xl mb-3">🥉</div>
                <h3 className="text-xl font-bold mb-3">Badge Bronze</h3>
                <ul className="text-sm text-left space-y-2">
                  <li>✅ Identité vérifiée</li>
                  <li>✅ Antécédents vérifiés</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Conformité */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">
              Conformité et protection des données
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">🇨🇦 Loi 25 (Québec)</h3>
                <p className="text-gray-600">
                  Nous respectons toutes les exigences de la Loi 25 sur la protection des 
                  renseignements personnels, incluant le consentement explicite, la transparence 
                  et le droit de retrait.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">🔒 LPRPDE (Canada)</h3>
                <p className="text-gray-600">
                  Conformité totale avec la Loi sur la protection des renseignements personnels 
                  et les documents électroniques du Canada.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">🛡️ Sécurité des données</h3>
                <p className="text-gray-600">
                  Toutes les données sont stockées sur des serveurs canadiens avec chiffrement 
                  de bout en bout. Nous ne partageons jamais vos informations avec des tiers 
                  sans votre consentement explicite.
                </p>
              </div>
            </div>
          </section>

          {/* Garanties */}
          <section className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">
              Nos garanties
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">💯 Vérification rigoureuse</h3>
                <p className="text-gray-600">
                  Chaque professionnel est vérifié avant d'être accepté sur la plateforme.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">🔄 Renouvellement annuel</h3>
                <p className="text-gray-600">
                  Les vérifications sont renouvelées chaque année pour maintenir la confiance.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">⭐ Système d'évaluation</h3>
                <p className="text-gray-600">
                  Les évaluations bidirectionnelles assurent la qualité continue.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">🚨 Signalement facile</h3>
                <p className="text-gray-600">
                  Signalez tout problème en un clic. Nous agissons rapidement.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
