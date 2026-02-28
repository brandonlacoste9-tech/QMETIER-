import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from '../../lib/i18n';

export default function CreditPurchaseSuccess() {
  const router = useRouter();
  const { t } = useTranslation();
  const { session_id } = router.query;

  useEffect(() => {
    // TODO: Verify session with backend
    if (session_id) {
      console.log('Payment successful:', session_id);
    }
  }, [session_id]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {t('credits.success.title', 'Purchase Successful!')}
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-8">
          {t('credits.success.message', 'Your credits have been added to your account. You can now submit quotes on projects!')}
        </p>

        {/* Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{t('credits.success.status', 'Status')}</span>
            <span className="text-green-600 font-semibold">{t('credits.success.confirmed', 'Confirmed')}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-gray-600">{t('credits.success.receipt', 'Receipt')}</span>
            <span className="text-blue-600 font-semibold">{t('credits.success.emailSent', 'Sent to email')}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => router.push('/dashboard/professional')}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {t('credits.success.dashboard', 'Go to Dashboard')}
          </button>
          <button
            onClick={() => router.push('/projects')}
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            {t('credits.success.browseProjects', 'Browse Projects')}
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-8">
          {t('credits.success.footer', 'Transaction ID')}: {session_id || 'N/A'}
        </p>
      </div>
    </div>
  );
}
