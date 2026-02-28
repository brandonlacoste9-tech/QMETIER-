import { useState, useEffect } from 'react'
import en from '../locales/en.json'
import fr from '../locales/fr.json'

type Locale = 'en' | 'fr'
type Translations = typeof en

const translations: Record<Locale, Translations> = { en, fr }

export function useTranslation() {
  const [locale, setLocale] = useState<Locale>('fr')  // Default to French for Quebec launch
  
  useEffect(() => {
    // Get saved locale from localStorage
    const saved = localStorage.getItem('locale') as Locale
    if (saved && (saved === 'en' || saved === 'fr')) {
      setLocale(saved)
    } else {
      // Default to French for Quebec market
      setLocale('fr')
      // Only switch to English if explicitly English browser AND not in Quebec
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith('en') && !browserLang.includes('ca')) {
        // Keep French as default even for English browsers in Canada
        setLocale('fr')
      }
    }
  }, [])
  
  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem('locale', newLocale)
  }
  
  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[locale]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }
  
  return { t, locale, changeLocale }
}
