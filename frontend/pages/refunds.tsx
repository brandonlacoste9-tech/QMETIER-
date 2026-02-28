import React from 'react';
import { useTranslation } from '../lib/i18n';

export default function RefundPolicy() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {t('legal.refunds.title', 'Refund Policy')}
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-sm text-gray-600 mb-8">
            <strong>Last Updated:</strong> February 28, 2026<br />
            <strong>Effective Date:</strong> February 28, 2026
          </p>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
            <h2 className="text-2xl font-bold text-red-900 mb-3">General Policy: NO REFUNDS</h2>
            <p className="text-red-800 mb-3">
              <strong>Credit purchases are FINAL and NON-REFUNDABLE</strong> except in specific 
              circumstances listed below.
            </p>
            <p className="text-red-700">
              Once credits are added to your account, no refunds are issued for unused credits, 
              change of mind, rejected quotes, or cancelled projects.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Exceptions (When Refunds ARE Issued)</h2>
            
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-green-900 mb-2">✅ Technical Errors</h3>
                <p className="text-green-800 mb-2">Full refund if:</p>
                <ul className="list-disc list-inside text-green-700 space-y-1">
                  <li>Payment processed but credits NOT added</li>
                  <li>Duplicate charge (charged twice)</li>
                  <li>Wrong credit amount delivered</li>
                  <li>System error during purchase</li>
                </ul>
                <p className="text-green-700 mt-2 text-sm">
                  <strong>Timeframe:</strong> Request within 48 hours of purchase
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-green-900 mb-2">✅ Unauthorized Charges</h3>
                <p className="text-green-800 mb-2">Full refund if:</p>
                <ul className="list-disc list-inside text-green-700 space-y-1">
                  <li>Your account was hacked</li>
                  <li>Someone used your payment method without permission</li>
                  <li>Fraudulent transaction</li>
                </ul>
                <p className="text-green-700 mt-2 text-sm">
                  <strong>Timeframe:</strong> Request within 30 days of charge
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-green-900 mb-2">✅ Service Unavailability</h3>
                <p className="text-green-800 mb-2">Partial refund if:</p>
                <ul className="list-disc list-inside text-green-700 space-y-1">
                  <li>Platform is down for 7+ consecutive days</li>
                  <li>You cannot access your account due to our error</li>
                  <li>Critical features are unavailable</li>
                </ul>
                <p className="text-green-700 mt-2 text-sm">
                  <strong>Refund Amount:</strong> Prorated based on downtime
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is NOT Refundable</h2>
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>❌ Used credits (quotes submitted)</li>
                <li>❌ Buyer's remorse (changed your mind)</li>
                <li>❌ Poor business performance (not getting jobs)</li>
                <li>❌ Rejected quotes</li>
                <li>❌ Cancelled projects</li>
                <li>❌ Account closure (voluntary)</li>
                <li>❌ Unused credits when closing account</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Request a Refund</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-3">
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:support@qmetier.ca" className="text-blue-600 hover:underline">
                  support@qmetier.ca
                </a>
              </li>
              <li><strong>Subject:</strong> "Refund Request"</li>
              <li>
                <strong>Include:</strong>
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>Your name and email</li>
                  <li>Transaction ID (from Stripe receipt)</li>
                  <li>Purchase date and amount</li>
                  <li>Reason for refund</li>
                  <li>Supporting documentation (screenshots)</li>
                </ul>
              </li>
              <li><strong>Response Time:</strong> 2-3 business days</li>
              <li><strong>Processing Time:</strong> 5-10 business days (if approved)</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Notes</h2>
            <div className="space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-yellow-900 font-semibold mb-2">Credits Never Expire</p>
                <p className="text-yellow-800">
                  You can use credits months or years after purchase. Think carefully before buying.
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-yellow-900 font-semibold mb-2">Chargebacks</p>
                <p className="text-yellow-800">
                  DO NOT file a chargeback without contacting us first. Your account will be 
                  suspended immediately if you do.
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-yellow-900 font-semibold mb-2">Minimum Refund</p>
                <p className="text-yellow-800">
                  We do not issue refunds under $5.00.
                </p>
              </div>
            </div>
          </section>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-8">
            <h3 className="text-xl font-bold text-blue-900 mb-3">Summary</h3>
            <p className="text-blue-800 mb-3">
              <strong>Standard Policy:</strong> NO REFUNDS
            </p>
            <p className="text-blue-800 mb-3">
              <strong>Exceptions:</strong> Technical errors, fraud, service outages
            </p>
            <p className="text-blue-800">
              <strong>Key Point:</strong> Credits are digital goods delivered instantly. 
              Purchase wisely.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Questions about refunds? Contact{' '}
              <a href="mailto:support@qmetier.ca" className="text-blue-600 hover:underline">
                support@qmetier.ca
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
