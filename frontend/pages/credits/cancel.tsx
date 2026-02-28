import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from '../../lib/i18n';

export default function CreditPurchaseCancel() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Cancel Icon */}
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {t('credits.cancel.title', 'Purchase Cancelled')}
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-8">
          {t('credits.cancel.message', 'Your purchase was cancelled. No charges were made to your account.')}
        </p>

        {/* Info Box */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 text-left">
          <div className="flex">
            <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">{t('credits.cancel.needHelp', 'Need help?')}</p>
              <p>{t('credits.cancel.helpText', 'If you experienced any issues during checkout, please contact our support team.')}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => router.push('/credits')}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {t('credits.cancel.tryAgain', 'Try Again')}
          </button>
          <button
            onClick={() => router.push('/dashboard/professional')}
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            {t('credits.cancel.dashboard', 'Go to Dashboard')}
          </button>
          <button
            onClick={() => router.push('/support')}
            className="w-full text-gray-600 py-2 px-6 rounded-lg font-medium hover:text-gray-900 transition"
          >
            {t('credits.cancel.contactSupport', 'Contact Support')}
          </button>
        </div>
      </div>
    </div>
  );
}
