import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../lib/i18n';

interface DashboardStats {
  creditBalance: number;
  activeQuotes: number;
  acceptedQuotes: number;
  rating: number;
  reviewCount: number;
}

export default function ProfessionalDashboard() {
  const { t } = useTranslation();
  const [stats, setStats] = useState<DashboardStats>({
    creditBalance: 0,
    activeQuotes: 0,
    acceptedQuotes: 0,
    rating: 0,
    reviewCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch real data from API
    setTimeout(() => {
      setStats({
        creditBalance: 12,
        activeQuotes: 3,
        acceptedQuotes: 2,
        rating: 4.8,
        reviewCount: 24
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('common.loading', 'Loading...')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('dashboard.professional.title', 'Professional Dashboard')}
          </h1>
          <p className="mt-2 text-gray-600">
            {t('dashboard.professional.subtitle', 'Manage your quotes, credits, and profile')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Credit Balance */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {t('dashboard.credits', 'Credits')}
                </p>
                <p className="mt-2 text-3xl font-bold text-blue-600">{stats.creditBalance}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
              {t('dashboard.buyCredits', 'Buy Credits')}
            </button>
          </div>

          {/* Active Quotes */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {t('dashboard.activeQuotes', 'Active Quotes')}
                </p>
                <p className="mt-2 text-3xl font-bold text-yellow-600">{stats.activeQuotes}</p>
              </div>
              <div className="bg-yellow-100 rounded-full p-3">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Accepted Quotes */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {t('dashboard.acceptedQuotes', 'Accepted Quotes')}
                </p>
                <p className="mt-2 text-3xl font-bold text-green-600">{stats.acceptedQuotes}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {t('dashboard.rating', 'Rating')}
                </p>
                <div className="mt-2 flex items-baseline">
                  <p className="text-3xl font-bold text-purple-600">{stats.rating}</p>
                  <p className="ml-2 text-sm text-gray-500">/ 5.0</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {stats.reviewCount} {t('dashboard.reviews', 'reviews')}
                </p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {t('dashboard.recentActivity', 'Recent Activity')}
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {/* Activity items would go here */}
              <p className="text-gray-500 text-center py-8">
                {t('dashboard.noActivity', 'No recent activity')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
