import React from 'react';
import { useTranslation } from '../lib/i18n';

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {t('legal.privacy.title', 'Privacy Policy')}
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-sm text-gray-600 mb-8">
            <strong>Last Updated:</strong> February 28, 2026<br />
            <strong>Effective Date:</strong> February 28, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700">
              Q-MÉTIER respects your privacy. This policy explains how we collect, use, and protect 
              your personal information.
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-4">
              <p className="text-green-800">
                <strong>Compliance:</strong> We comply with Quebec Law 25, PIPEDA, and GDPR.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Account Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Name, email, phone number</li>
                  <li>Password (encrypted)</li>
                  <li>Profile photo (optional)</li>
                  <li>Preferred language</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Location Data</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>GPS coordinates (with permission)</li>
                  <li>IP-based location (approximate)</li>
                  <li>Saved location preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Payment Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Credit card details (processed by Stripe, NOT stored by us)</li>
                  <li>Purchase history</li>
                  <li>Credit balance</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>To provide and improve our services</li>
              <li>To match customers with professionals</li>
              <li>To process credit purchases</li>
              <li>To verify identities and conduct background checks</li>
              <li>To send notifications and updates</li>
              <li>To prevent fraud and ensure safety</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How We Share Your Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">With Other Users</h3>
                <p className="text-gray-700">
                  Limited information is shared to facilitate connections (name, location, ratings).
                  Full contact details are only shared after quote acceptance.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">With Service Providers</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li><strong>Certn:</strong> Identity verification and background checks</li>
                  <li><strong>Stripe:</strong> Payment processing</li>
                  <li><strong>Hosting providers:</strong> Data storage (encrypted)</li>
                </ul>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-800">
                  <strong>We do NOT sell your personal data.</strong>
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Access:</strong> Request a copy of your data</li>
              <li><strong>Correction:</strong> Fix inaccurate information</li>
              <li><strong>Deletion:</strong> Request account deletion</li>
              <li><strong>Portability:</strong> Export your data</li>
              <li><strong>Objection:</strong> Opt out of marketing</li>
            </ul>
            <p className="text-gray-700 mt-4">
              To exercise your rights, email{' '}
              <a href="mailto:privacy@qmetier.ca" className="text-blue-600 hover:underline">
                privacy@qmetier.ca
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>TLS/SSL encryption for data in transit</li>
              <li>AES-256 encryption for data at rest</li>
              <li>Regular security audits</li>
              <li>Multi-factor authentication</li>
              <li>72-hour breach notification</li>
            </ul>
          </section>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-8">
            <h3 className="text-xl font-bold text-blue-900 mb-3">Summary</h3>
            <p className="text-blue-800 mb-3">
              We collect only necessary information to provide our services. We protect your data 
              with industry-standard security measures and comply with all privacy laws.
            </p>
            <p className="text-blue-800">
              <strong>You have full control over your data.</strong> Contact us anytime to access, 
              correct, or delete your information.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              For the complete Privacy Policy or to file a complaint, contact{' '}
              <a href="mailto:privacy@qmetier.ca" className="text-blue-600 hover:underline">
                privacy@qmetier.ca
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
