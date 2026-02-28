# Bilingual Support (English/Québec French)

Add full bilingual support for Q-MÉTIER to operate coast-to-coast across Canada.

## Requirements

### Frontend (Web)
- Language switcher component in header (EN/FR toggle)
- Translation files for all UI text (en.json, fr.json)
- i18n hook for accessing translations
- Persist language preference in localStorage
- Auto-detect browser language on first visit
- All pages translated: Home, Projects, Credits, Profile

### Telegram Bot
- Bilingual command responses
- /language command to switch languages
- Store user language preference in database
- All notifications in user's preferred language
- Registration flow in both languages
- Quote submission in both languages

### Backend API
- Accept language parameter in requests
- Return error messages in requested language
- Email notifications in user's preferred language
- Support for bilingual content in database

### Database
- Add `preferred_language` field to Professional model
- Add `preferred_language` field to Customer model
- Support for bilingual category names
- Support for bilingual skill tags

## Translation Coverage

### Common Terms
- Navigation menu
- Buttons (Submit, Cancel, Save, etc.)
- Form labels
- Error messages
- Success messages
- Loading states

### Domain-Specific
- Project categories (Plumbing = Plomberie)
- Skills (Repair = Réparation)
- Canadian provinces/territories
- Credit pack descriptions
- Quote terminology
- Professional titles

### Regional Considerations
- Use Québec French (not European French)
- Canadian dollar formatting ($17,99 vs $17.99)
- Date formats (DD/MM/YYYY for French)
- Address formats
- Phone number formats

## Implementation

### Frontend i18n
- React hook: `useTranslation()`
- JSON translation files in `/locales`
- Language switcher component
- Automatic language detection

### Telegram Bot
- Python translation function: `t(user_id, key)`
- Language preference storage
- Inline keyboard for language selection

### API
- Accept `Accept-Language` header
- Return localized error messages
- Support bilingual search

## Tests
- Test language switching
- Test translation completeness
- Test fallback to English
- Test browser language detection
- Test Telegram language persistence
