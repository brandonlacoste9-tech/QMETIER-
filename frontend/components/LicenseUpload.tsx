import React, { useState } from 'react';
import { useTranslation } from '../lib/i18n';

interface LicenseUploadProps {
  professionalId: string;
  onSuccess?: () => void;
}

export default function LicenseUpload({ professionalId, onSuccess }: LicenseUploadProps) {
  const { t } = useTranslation();
  const [licenseType, setLicenseType] = useState('rbq');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [frontPhoto, setFrontPhoto] = useState<File | null>(null);
  const [backPhoto, setBackPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Upload license data
      const response = await fetch('/api/licenses/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          professional_id: professionalId,
          license_type: licenseType,
          license_number: licenseNumber,
          issuing_authority: licenseType.toUpperCase(),
          expiry_date: expiryDate,
          categories_covered: []
        })
      });

      if (!response.ok) throw new Error('Failed to upload license');

      const data = await response.json();
      const licenseId = data.license_id;

      // Upload photos
      if (frontPhoto) {
        const formData = new FormData();
        formData.append('file', frontPhoto);
        await fetch(`/api/licenses/upload-document/${licenseId}?side=front`, {
          method: 'POST',
          body: formData
        });
      }

      if (backPhoto) {
        const formData = new FormData();
        formData.append('file', backPhoto);
        await fetch(`/api/licenses/upload-document/${licenseId}?side=back`, {
          method: 'POST',
          body: formData
        });
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('license.upload.title', 'Upload Professional License')}
        </h2>
        <p className="text-gray-600">
          {t('license.upload.subtitle', 'Required for regulated trades in Quebec')}
        </p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* License Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('license.type', 'License Type')}
          </label>
          <select
            value={licenseType}
            onChange={(e) => setLicenseType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="rbq">RBQ (Régie du bâtiment du Québec)</option>
            <option value="cmeq">CMEQ (Maîtres électriciens)</option>
            <option value="cmmtq">CMMTQ (Maîtres mécaniciens en tuyauterie)</option>
            <option value="red_seal">Red Seal</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* License Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('license.number', 'License Number')}
          </label>
          <input
            type="text"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            placeholder={licenseType === 'rbq' ? 'RBQ-XXXX-XXXX-XX' : 'License number'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('license.expiry', 'Expiry Date')}
          </label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Front Photo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('license.photo.front', 'License Photo (Front)')}
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFrontPhoto(e.target.files?.[0] || null)}
              className="hidden"
              id="front-photo"
            />
            <label htmlFor="front-photo" className="cursor-pointer">
              {frontPhoto ? (
                <div className="text-green-600">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-medium">{frontPhoto.name}</p>
                </div>
              ) : (
                <div className="text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="font-medium">Click to upload front photo</p>
                  <p className="text-sm">PNG, JPG up to 10MB</p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Back Photo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('license.photo.back', 'License Photo (Back)')}
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBackPhoto(e.target.files?.[0] || null)}
              className="hidden"
              id="back-photo"
            />
            <label htmlFor="back-photo" className="cursor-pointer">
              {backPhoto ? (
                <div className="text-green-600">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-medium">{backPhoto.name}</p>
                </div>
              ) : (
                <div className="text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="font-medium">Click to upload back photo</p>
                  <p className="text-sm">PNG, JPG up to 10MB</p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Verification Process</p>
              <ul className="list-disc list-inside space-y-1">
                <li>We verify your license with the issuing authority</li>
                <li>Verification usually takes 24-48 hours</li>
                <li>You'll receive an email when approved</li>
                <li>You cannot submit quotes until verified</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !licenseNumber || !expiryDate || !frontPhoto}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('common.uploading', 'Uploading...')}
            </span>
          ) : (
            t('license.submit', 'Submit for Verification')
          )}
        </button>
      </form>
    </div>
  );
}
