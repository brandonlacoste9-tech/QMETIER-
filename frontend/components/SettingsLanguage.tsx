import { useTranslation } from '../lib/i18n'

export default function SettingsLanguage() {
  const { locale, changeLocale, t } = useTranslation()
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">{t('settings.language')}</h3>
      <p className="text-sm text-gray-600 mb-4">
        {t('settings.languageDescription')}
      </p>
      
      <div className="space-y-2">
        <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="language"
            value="fr"
            checked={locale === 'fr'}
            onChange={() => changeLocale('fr')}
            className="mr-3"
          />
          <div>
            <div className="font-medium">Français</div>
            <div className="text-sm text-gray-500">Langue par défaut</div>
          </div>
        </label>
        
        <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="language"
            value="en"
            checked={locale === 'en'}
            onChange={() => changeLocale('en')}
            className="mr-3"
          />
          <div>
            <div className="font-medium">English</div>
            <div className="text-sm text-gray-500">Secondary language</div>
          </div>
        </label>
      </div>
    </div>
  )
}
