import { useState } from 'react'
import { useTranslation } from '../lib/i18n'
import SEOHead from '../components/SEOHead'

export default function HomePage() {
  const { t } = useTranslation()
  
  return (
    <>
      <SEOHead
        titleFr="Q-MÉTIER - Trouvez des Professionnels au Québec | Plombier, Électricien, Rénovation"
        titleEn="Q-MÉTIER - Find Professionals in Quebec | Plumber, Electrician, Renovation"
        descriptionFr="Plateforme québécoise pour trouver des professionnels vérifiés. Plombiers, électriciens, entrepreneurs en rénovation à Montréal, Québec et partout au Québec. Sans commission."
        descriptionEn="Quebec platform to find verified professionals. Plumbers, electricians, renovation contractors in Montreal, Quebec City and across Quebec. No commission."
        keywordsFr="plombier Montréal, électricien Montréal, rénovation Québec, entrepreneur général, déménagement, nettoyage, professionnel vérifié, plateforme québécoise"
        keywordsEn="plumber Montreal, electrician Montreal, renovation Quebec, general contractor, moving, cleaning, verified professional, Quebec platform"
        canonical="https://qmetier.ca"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Q-MÉTIER",
          "description": "Plateforme québécoise pour connecter professionnels et clients",
          "url": "https://qmetier.ca",
          "foundingDate": "2026",
          "foundingLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Montréal",
              "addressRegion": "QC",
              "addressCountry": "CA"
            }
          },
          "areaServed": {
            "@type": "State",
            "name": "Quebec"
          }
        }}
      />
      
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Q-MÉTIER</h1>
              <p className="text-gray-600">{t('home.subtitle')}</p>
            </div>
            {/* Language switcher moved to settings */}
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-12 px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t('home.title')}</h2>
            <p className="text-xl text-gray-600">{t('home.subtitle')}</p>
            <button className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700">
              {t('home.cta')}
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              title={t('home.feature1Title')}
              description={t('home.feature1Desc')}
            />
            <FeatureCard 
              title={t('home.feature2Title')}
              description={t('home.feature2Desc')}
            />
            <FeatureCard 
              title={t('home.feature3Title')}
              description={t('home.feature3Desc')}
            />
          </div>
        </main>
      </div>
    </>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
