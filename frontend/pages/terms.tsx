import React from 'react';
import { useTranslation } from '../lib/i18n';

export default function TermsOfService() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {t('legal.terms.title', 'Terms of Service')}
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-sm text-gray-600 mb-8">
            <strong>Last Updated:</strong> February 28, 2026<br />
            <strong>Effective Date:</strong> February 28, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing or using Q-MÉTIER, you agree to be bound by these Terms of Service. 
              If you do not agree, do not use the Platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Platform Description</h2>
            <p className="text-gray-700 mb-4">
              Q-MÉTIER is a <strong>marketplace platform</strong> that connects customers with independent professionals.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-800 font-semibold">IMPORTANT:</p>
              <p className="text-red-700">
                Q-MÉTIER is a connection service only. We do NOT employ professionals, perform services, 
                process payments between users, or guarantee work quality.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Payment Disclaimer</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <p className="text-yellow-900 font-bold mb-2">
                ALL PAYMENTS FOR SERVICES ARE MADE DIRECTLY BETWEEN CUSTOMERS AND PROFESSIONALS.
              </p>
              <ul className="list-disc list-inside text-yellow-800 space-y-1">
                <li>We do NOT process customer-to-professional payments</li>
                <li>We do NOT hold money in escrow</li>
                <li>We do NOT take commissions on work performed</li>
                <li>We are NOT liable for payment disputes</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              Q-MÉTIER's total liability is limited to the <strong>lesser of $100 CAD or the amount 
              you paid us in the past 12 months</strong>.
            </p>
            <p className="text-gray-700">
              We are NOT liable for indirect, consequential, or punitive damages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Dispute Resolution</h2>
            <p className="text-gray-700 mb-4">
              <strong>Any dispute must be resolved through binding arbitration</strong>, not court litigation.
            </p>
            <p className="text-gray-700">
              <strong>You waive your right to participate in class action lawsuits.</strong>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Credit System</h2>
            <p className="text-gray-700 mb-4">
              Credits are virtual tokens used to submit quotes. They are:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Non-refundable (except for technical errors)</li>
              <li>Non-transferable</li>
              <li>Non-expiring</li>
              <li>Not redeemable for cash</li>
            </ul>
          </section>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-8">
            <h3 className="text-xl font-bold text-blue-900 mb-3">Summary</h3>
            <p className="text-blue-800 mb-3">
              <strong>Q-MÉTIER is a connection platform only.</strong> We connect customers with professionals 
              but are not involved in payments, work quality, or disputes.
            </p>
            <p className="text-blue-800">
              <strong>Your responsibilities:</strong> Verify credentials, get contracts, ensure insurance, 
              resolve disputes yourself.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              For the complete Terms of Service, please contact{' '}
              <a href="mailto:legal@qmetier.ca" className="text-blue-600 hover:underline">
                legal@qmetier.ca
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
