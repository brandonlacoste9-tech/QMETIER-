# Q-MÉTIER Bilingual Guide

Complete guide for English/French bilingual support across Canada.

## Overview

Q-MÉTIER operates coast-to-coast in Canada with full support for English and Québec French.

## Language Detection

### Web (Frontend)
1. Check localStorage for saved preference
2. If none, detect browser language
3. Default to English if uncertain

### Telegram Bot
1. Check database for user preference
2. If none, ask user to select language
3. Default to English

## Adding New Translations

### Frontend

1. Add to `frontend/locales/en.json`:
```json
{
  "newFeature": {
    "title": "New Feature",
    "description": "Description here"
  }
}
```

2. Add to `frontend/locales/fr.json`:
```json
{
  "newFeature": {
    "title": "Nouvelle fonctionnalité",
    "description": "Description ici"
  }
}
```

3. Use in components:
```tsx
const { t } = useTranslation()
return <h1>{t('newFeature.title')}</h1>
```

### Telegram Bot

1. Add to `telegram-bot/locales.py`:
```python
TRANSLATIONS = {
    'en': {
        'new_message': "Hello {name}!"
    },
    'fr': {
        'new_message': "Bonjour {name}!"
    }
}
```

2. Use in bot:
```python
await update.message.reply_text(
    t(user_id, 'new_message', name=user.name)
)
```

## Québec French Guidelines

### Use Canadian French, not European French
- ❌ "courriel" (European)
- ✅ "email" (Canadian)

- ❌ "ordinateur" (European)
- ✅ "computer" (Canadian - anglicism accepted)

### Currency
- English: $17.99
- French: 17,99 $ (space before $, comma for decimal)

### Dates
- English: MM/DD/YYYY (02/28/2024)
- French: DD/MM/YYYY (28/02/2024)

### Common Terms
| English | Français (Québec) |
|---------|-------------------|
| Professional | Professionnel |
| Quote | Soumission |
| Project | Projet |
| Credits | Crédits |
| Rating | Évaluation |
| Review | Avis |
| Skills | Compétences |
| Location | Emplacement |
| Submit | Soumettre |
| Cancel | Annuler |
| Confirm | Confirmer |

## Canadian Provinces/Territories

| Code | English | Français |
|------|---------|----------|
| BC | British Columbia | Colombie-Britannique |
| AB | Alberta | Alberta |
| SK | Saskatchewan | Saskatchewan |
| MB | Manitoba | Manitoba |
| ON | Ontario | Ontario |
| QC | Quebec | Québec |
| NB | New Brunswick | Nouveau-Brunswick |
| NS | Nova Scotia | Nouvelle-Écosse |
| PE | Prince Edward Island | Île-du-Prince-Édouard |
| NL | Newfoundland and Labrador | Terre-Neuve-et-Labrador |
| YT | Yukon | Yukon |
| NT | Northwest Territories | Territoires du Nord-Ouest |
| NU | Nunavut | Nunavut |

## Testing Translations

### Frontend
```bash
# Test English
localStorage.setItem('locale', 'en')

# Test French
localStorage.setItem('locale', 'fr')
```

### Telegram Bot
```
# Send command
/language

# Select Français
# Test all commands in French
```

## Translation Checklist

When adding new features:
- [ ] Add English translations to en.json
- [ ] Add French translations to fr.json
- [ ] Update Telegram bot locales.py
- [ ] Test language switching
- [ ] Verify Québec French conventions
- [ ] Check currency/date formatting
- [ ] Test on both web and Telegram

## Common Mistakes to Avoid

1. ❌ Using European French terms
2. ❌ Forgetting to translate error messages
3. ❌ Hardcoding text in components
4. ❌ Inconsistent terminology
5. ❌ Missing translations (causes fallback to keys)

## Resources

- [Office québécois de la langue française](http://www.oqlf.gouv.qc.ca/)
- [Canadian Style Guide](https://www.noslangues-ourlanguages.gc.ca/)
- [Termium Plus](https://www.btb.termiumplus.gc.ca/)
