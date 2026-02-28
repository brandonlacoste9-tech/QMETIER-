/**
 * Geolocation utilities for automatic location detection
 */

export interface Location {
  lat: number
  lng: number
  city?: string
  province?: string
  country?: string
  formatted?: string
}

export interface GeolocationError {
  code: number
  message: string
}

/**
 * Get user's current location using browser Geolocation API
 */
export async function getCurrentLocation(): Promise<Location> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({
        code: 0,
        message: 'Geolocation is not supported by your browser'
      })
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location: Location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        
        // Reverse geocode to get city/province
        try {
          const details = await reverseGeocode(location.lat, location.lng)
          resolve({ ...location, ...details })
        } catch (error) {
          // Return location even if reverse geocoding fails
          resolve(location)
        }
      },
      (error) => {
        reject({
          code: error.code,
          message: getErrorMessage(error.code)
        })
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // Cache for 5 minutes
      }
    )
  })
}

/**
 * Reverse geocode coordinates to get address details
 */
export async function reverseGeocode(lat: number, lng: number): Promise<Partial<Location>> {
  try {
    // Using Nominatim (OpenStreetMap) - free and no API key required
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'Q-METIER-App'
        }
      }
    )
    
    if (!response.ok) {
      throw new Error('Geocoding failed')
    }
    
    const data = await response.json()
    const address = data.address || {}
    
    return {
      city: address.city || address.town || address.village || address.municipality,
      province: address.state || address.province,
      country: address.country,
      formatted: data.display_name
    }
  } catch (error) {
    console.error('Reverse geocoding error:', error)
    return {}
  }
}

/**
 * Get location from IP address (fallback method)
 */
export async function getLocationFromIP(): Promise<Location> {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    
    return {
      lat: data.latitude,
      lng: data.longitude,
      city: data.city,
      province: data.region,
      country: data.country_name,
      formatted: `${data.city}, ${data.region}, ${data.country_name}`
    }
  } catch (error) {
    throw new Error('IP geolocation failed')
  }
}

/**
 * Get location with fallback chain:
 * 1. Browser geolocation (most accurate)
 * 2. IP-based geolocation (fallback)
 * 3. Saved location from localStorage
 */
export async function getLocationWithFallback(): Promise<Location | null> {
  // Try saved location first
  const saved = getSavedLocation()
  
  try {
    // Try browser geolocation
    const location = await getCurrentLocation()
    saveLocation(location)
    return location
  } catch (error) {
    console.warn('Browser geolocation failed, trying IP-based:', error)
    
    try {
      // Fallback to IP geolocation
      const location = await getLocationFromIP()
      saveLocation(location)
      return location
    } catch (ipError) {
      console.warn('IP geolocation failed:', ipError)
      
      // Return saved location if available
      return saved
    }
  }
}

/**
 * Save location to localStorage
 */
export function saveLocation(location: Location): void {
  localStorage.setItem('user_location', JSON.stringify(location))
}

/**
 * Get saved location from localStorage
 */
export function getSavedLocation(): Location | null {
  const saved = localStorage.getItem('user_location')
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      return null
    }
  }
  return null
}

/**
 * Clear saved location
 */
export function clearSavedLocation(): void {
  localStorage.removeItem('user_location')
}

/**
 * Calculate distance between two coordinates (in km)
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371 // Earth's radius in km
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180)
}

function getErrorMessage(code: number): string {
  switch (code) {
    case 1:
      return 'Location permission denied'
    case 2:
      return 'Location unavailable'
    case 3:
      return 'Location request timeout'
    default:
      return 'Unknown location error'
  }
}

/**
 * Check if coordinates are within Canada
 */
export function isInCanada(lat: number, lng: number): boolean {
  // Approximate bounding box for Canada
  return (
    lat >= 41.6 && lat <= 83.1 &&
    lng >= -141.0 && lng <= -52.6
  )
}

/**
 * Get Canadian province from coordinates (approximate)
 */
export function getCanadianProvince(lat: number, lng: number): string | null {
  // Simplified province detection based on coordinates
  // In production, use proper reverse geocoding
  
  if (lng < -130) return 'BC' // British Columbia
  if (lng < -115 && lat > 49) return 'AB' // Alberta
  if (lng < -101 && lat > 49) return 'SK' // Saskatchewan
  if (lng < -95 && lat > 49) return 'MB' // Manitoba
  if (lng < -74 && lat > 41.7) return 'ON' // Ontario
  if (lng < -57 && lat > 45) return 'QC' // Quebec
  if (lng < -64 && lat < 48) return 'NB' // New Brunswick
  if (lng < -60 && lat < 47) return 'NS' // Nova Scotia
  if (lng < -62 && lat < 47) return 'PE' // Prince Edward Island
  if (lng < -52 && lat > 46) return 'NL' // Newfoundland
  
  return null
}
