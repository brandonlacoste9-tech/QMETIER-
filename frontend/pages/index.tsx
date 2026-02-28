import { useState } from 'react'
import Head from 'next/head'
import { useTranslation } from '../lib/i18n'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function HomePage() {
  const { t } = useTranslation()
  
  return (
    <>
      <Head>
        <title>Q-MÉTIER - {t('home.subtitle')}</title>
      </Head>
      
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
