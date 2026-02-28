import { useState, useEffect } from 'react'
import { useTranslation } from '../lib/i18n'
import { getLocationWithFallback, Location, clearSavedLocation } from '../lib/geolocation'

interface Props {
  onLocationDetected: (location: Location) => void
  autoDetect?: boolean
}

export default function LocationDetector({ onLocationDetected, autoDetect = false }: Props) {
  const { t } = useTranslation()
  const [detecting, setDetecting] = useState(false)
  const [location, setLocation] = useState<Location | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (autoDetect) {
      detectLocation()
    }
  }, [autoDetect])

  const detectLocation = async () => {
    setDetecting(true)
    setError(null)

    try {
      const loc = await getLocationWithFallback()
      if (loc) {
        setLocation(loc)
        onLocationDetected(loc)
      } else {
        setError(t('location.detectionFailed'))
      }
    } catch (err: any) {
      setError(err.message || t('location.detectionFailed'))
    } finally {
      setDetecting(false)
    }
  }

  const handleClearLocation = () => {
    clearSavedLocation()
    setLocation(null)
    setError(null)
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-2xl mr-2">📍</span>
          <div>
            <h3 className="font-semibold">{t('location.yourLocation')}</h3>
            {location && (
              <p className="text-sm text-gray-600">
                {location.city && location.province
                  ? `${location.city}, ${location.province}`
                  : location.formatted || `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`}
              </p>
            )}
          </div>
        </div>
        
        {!location && (
          <button
            onClick={detectLocation}
            disabled={detecting}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {detecting ? t('location.detecting') : t('location.detectLocation')}
          </button>
        )}
        
        {location && (
          <button
            onClick={handleClearLocation}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            {t('location.change')}
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {detecting && (
        <div className="flex items-center text-sm text-gray-600">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
          {t('location.detecting')}
        </div>
      )}
    </div>
  )
}
