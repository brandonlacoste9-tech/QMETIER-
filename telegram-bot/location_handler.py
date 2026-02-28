"""
Location handling for Telegram bot
"""
import httpx
from typing import Optional, Dict

async def reverse_geocode(lat: float, lng: float) -> Dict[str, str]:
    """Reverse geocode coordinates to get address"""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"https://nominatim.openstreetmap.org/reverse",
                params={
                    "format": "json",
                    "lat": lat,
                    "lon": lng,
                    "zoom": 10,
                    "addressdetails": 1
                },
                headers={"User-Agent": "Q-METIER-Bot"}
            )
            
            if response.status_code == 200:
                data = response.json()
                address = data.get("address", {})
                
                return {
                    "city": address.get("city") or address.get("town") or address.get("village"),
                    "province": address.get("state") or address.get("province"),
                    "country": address.get("country"),
                    "formatted": data.get("display_name")
                }
    except Exception as e:
        print(f"Reverse geocoding error: {e}")
    
    return {}

def is_in_canada(lat: float, lng: float) -> bool:
    """Check if coordinates are within Canada"""
    return (
        41.6 <= lat <= 83.1 and
        -141.0 <= lng <= -52.6
    )

def get_canadian_province(lat: float, lng: float) -> Optional[str]:
    """Get Canadian province from coordinates (approximate)"""
    if lng < -130:
        return "BC"
    elif lng < -115 and lat > 49:
        return "AB"
    elif lng < -101 and lat > 49:
        return "SK"
    elif lng < -95 and lat > 49:
        return "MB"
    elif lng < -74 and lat > 41.7:
        return "ON"
    elif lng < -57 and lat > 45:
        return "QC"
    elif lng < -64 and lat < 48:
        return "NB"
    elif lng < -60 and lat < 47:
        return "NS"
    elif lng < -62 and lat < 47:
        return "PE"
    elif lng < -52 and lat > 46:
        return "NL"
    
    return None

async def handle_location_message(update, context):
    """Handle location shared by user"""
    location = update.message.location
    lat = location.latitude
    lng = location.longitude
    user_id = update.effective_user.id
    
    # Check if in Canada
    if not is_in_canada(lat, lng):
        await update.message.reply_text(
            "⚠️ This location appears to be outside Canada.\n"
            "Q-MÉTIER currently operates coast-to-coast in Canada only."
        )
        return
    
    # Get address details
    address = await reverse_geocode(lat, lng)
    province = get_canadian_province(lat, lng)
    
    # Store in context for registration
    context.user_data['location'] = {
        'lat': lat,
        'lng': lng,
        'city': address.get('city'),
        'province': province or address.get('province'),
        'formatted': address.get('formatted')
    }
    
    # Confirm location
    location_text = f"{address.get('city', 'Unknown')}, {province or address.get('province', 'Unknown')}"
    
    await update.message.reply_text(
        f"📍 Location detected: {location_text}\n\n"
        f"Now, please send your profile information:\n"
        f"Name: Your Name\n"
        f"Email: your@email.com\n"
        f"Skills: plumbing, repair, emergency"
    )
