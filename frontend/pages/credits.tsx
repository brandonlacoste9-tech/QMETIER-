import { useState } from 'react'
import Head from 'next/head'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useTranslation } from '../lib/i18n'
import LanguageSwitcher from '../components/LanguageSwitcher'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!)

const CREDIT_PACKS = [
  { id: '12-pack', credits: 12, price: 17.99, perCredit: 1.50 },
  { id: '24-pack', credits: 24, price: 34.99, perCredit: 1.46 },
  { id: '60-pack', credits: 60, price: 84.99, perCredit: 1.42 }
]

export default function CreditsPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const { t } = useTranslation()
  
  const handlePurchase = async (planId: string) => {
    setLoading(planId)
    try {
      const response = await axios.post('/api/credits/purchase', {
        professional_id: 'YOUR_PROFESSIONAL_ID', // TODO: Get from auth
        plan_id: planId
      })
      
      const stripe = await stripePromise
      await stripe?.redirectToCheckout({ sessionId: response.data.session_url })
    } catch (error) {
      console.error('Purchase failed:', error)
      alert('Purchase failed. Please try again.')
    } finally {
      setLoading(null)
    }
  }
  
  return (
    <>
      <Head>
        <title>{t('credits.title')} - Q-MÉTIER</title>
      </Head>
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-end mb-4">
            <LanguageSwitcher />
          </div>
          <h1 className="text-4xl font-bold text-center mb-8">{t('credits.title')}</h1>
          <p className="text-center text-gray-600 mb-12">
            {t('credits.subtitle')}
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {CREDIT_PACKS.map(pack => (
              <CreditPackCard
                key={pack.id}
                pack={pack}
                loading={loading === pack.id}
                onPurchase={() => handlePurchase(pack.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function CreditPackCard({ pack, loading, onPurchase }: any) {
  const { t } = useTranslation()
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">{pack.credits} {t('credits.credits')}</h3>
        <div className="text-4xl font-bold text-blue-600 mb-2">
          ${pack.price}
        </div>
        <p className="text-gray-600 mb-6">
          ${pack.perCredit.toFixed(2)} {t('credits.perCredit')}
        </p>
        <button
          onClick={onPurchase}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? t('credits.processing') : t('credits.purchase')}
        </button>
      </div>
    </div>
  )
}
