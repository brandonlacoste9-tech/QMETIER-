import Head from 'next/head'
import { useTranslation } from '../lib/i18n'
import SettingsLanguage from '../components/SettingsLanguage'

export default function SettingsPage() {
  const { t } = useTranslation()
  
  return (
    <>
      <Head>
        <title>{t('settings.title')} - Q-MÉTIER</title>
      </Head>
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">{t('settings.title')}</h1>
          
          <div className="space-y-6">
            <SettingsLanguage />
            
            {/* Add more settings sections here */}
          </div>
        </div>
      </div>
    </>
  )
}
