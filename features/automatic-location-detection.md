# Automatic Location Detection

Add automatic vicinity location detection for both web and Telegram to improve user experience.

## Requirements

### Web (Frontend)
- Browser Geolocation API integration
- Automatic location detection on project creation
- IP-based geolocation fallback
- Location permission handling
- Save/cache detected location
- Manual location override option
- Reverse geocoding to show city/province
- Visual location indicator component
- Canada boundary validation

### Telegram Bot
- Location sharing via Telegram's native location button
- Automatic location detection during registration
- Store location with professional profile
- Update location on demand
- Reverse geocoding for address display
- Canada boundary validation
- Province detection from coordinates

### Backend API
- Validate coordinates are within Canada
- Store lat/lng with high precision
- Support location-based search
- Calculate distances for matching
- PostGIS integration for geo queries

## Features

### Location Detection Methods
1. **Browser Geolocation** (most accurate)
   - Request permission
   - Get GPS coordinates
   - Reverse geocode to address

2. **IP Geolocation** (fallback)
   - Use IP address
   - Get approximate location
   - Less accurate but no permission needed

3. **Telegram Location** (mobile)
   - Native location sharing
   - GPS-accurate
   - One-tap sharing

4. **Manual Entry** (last resort)
   - Address search
   - Postal code lookup
   - City/province selection

### Location Caching
- Save to localStorage (web)
- Save to database (Telegram)
- Cache for 5 minutes
- Auto-refresh on page load
- Clear on logout

### Privacy & Permissions
- Request permission before accessing
- Explain why location is needed
- Allow manual entry if denied
- Never share exact location publicly
- Only show city/province to others
- Use approximate location for matching

### Canada-Specific Features
- Validate coordinates within Canada
- Detect province from coordinates
- Support all provinces/territories
- Handle bilingual city names
- Quebec postal code format
- Distance in kilometers

## Implementation

### Frontend Components
- `LocationDetector` - Main detection component
- `LocationPermissionPrompt` - Permission request UI
- `ManualLocationInput` - Fallback input form
- `LocationDisplay` - Show detected location

### Geolocation Utilities
- `getCurrentLocation()` - Browser geolocation
- `getLocationFromIP()` - IP-based fallback
- `reverseGeocode()` - Coords to address
- `isInCanada()` - Validate coordinates
- `calculateDistance()` - Distance between points

### Telegram Handlers
- Location message handler
- Location button in registration
- Update location command
- Show current location

## User Experience

### Web Flow
1. User starts creating project
2. "Detect Location" button appears
3. Browser requests permission
4. Location detected automatically
5. Show: "Toronto, ON" with change option
6. Continue with project creation

### Telegram Flow
1. User sends `/register`
2. Bot shows "Share Location" button
3. User taps to share
4. Bot confirms: "📍 Montreal, QC"
5. Continue with registration

### Error Handling
- Permission denied → Show manual entry
- Location unavailable → Try IP fallback
- Outside Canada → Show error message
- Timeout → Retry or manual entry

## Tests
- Test browser geolocation
- Test IP fallback
- Test Telegram location sharing
- Test Canada boundary validation
- Test reverse geocoding
- Test distance calculations
- Test location caching
- Test permission handling
