import { useTranslation } from '../lib/i18n'

export default function LanguageSwitcher() {
  const { locale, changeLocale, t } = useTranslation()
  
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => changeLocale('en')}
        className={`px-3 py-1 rounded ${
          locale === 'en' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLocale('fr')}
        className={`px-3 py-1 rounded ${
          locale === 'fr' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        FR
      </button>
    </div>
  )
}
