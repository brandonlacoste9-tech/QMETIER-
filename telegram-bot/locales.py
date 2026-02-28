"""
Bilingual support for Telegram bot (English/French)
"""

TRANSLATIONS = {
    'en': {
        'welcome': "🎯 Welcome to Q-MÉTIER!\n\nI'll help you find jobs, submit quotes, and manage your professional profile.\n\nCommands:\n/register - Create your professional profile\n/balance - Check your credit balance\n/credits - Purchase credit packs\n/jobs - View available jobs\n/language - Change language\n/help - Show all commands",
        'register_prompt': "📝 Let's create your profile!\n\nPlease send your information in this format:\nName: Your Name\nEmail: your@email.com\nSkills: plumbing, repair, emergency\nLocation: 37.7749,-122.4194",
        'balance': "💰 Credit Balance: {balance} credits\n\nUse /credits to purchase more credits",
        'profile_not_found': "❌ Profile not found. Use /register to create your profile.",
        'credits_title': "💳 Select a credit pack:\n\nCredits are used to submit quotes on customer projects.\nEach quote typically costs 1-3 credits.",
        'no_jobs': "📭 No jobs available right now.\nI'll notify you when new matches appear!",
        'registration_complete': "✅ Registration complete!\n\nYou'll now receive notifications for matching jobs.\nUse /jobs to see available opportunities.",
        'quote_submitted': "✅ Quote submitted successfully!\n\n1 credit has been deducted from your balance.\nYou'll be notified if the customer accepts your quote.",
        'insufficient_credits': "❌ Insufficient credits!\n\nUse /credits to purchase more credits.",
        'new_match': "🔔 New Job Match!\n\n🔨 {title}\n📍 {distance} miles away\n🎯 Match Score: {score}%\n\nTap below to view details and submit a quote.",
        'quote_accepted': "🎉 Your quote was accepted!\n\nProject: {title}\nAmount: ${amount}\n\nThe customer will contact you shortly.",
        'language_changed': "✅ Language changed to English"
    },
    'fr': {
        'welcome': "🎯 Bienvenue sur Q-MÉTIER!\n\nJe vous aiderai à trouver des emplois, soumettre des soumissions et gérer votre profil professionnel.\n\nCommandes:\n/register - Créer votre profil professionnel\n/balance - Vérifier votre solde de crédits\n/credits - Acheter des forfaits de crédits\n/jobs - Voir les emplois disponibles\n/language - Changer la langue\n/help - Afficher toutes les commandes",
        'register_prompt': "📝 Créons votre profil!\n\nVeuillez envoyer vos informations dans ce format:\nName: Votre Nom\nEmail: votre@email.com\nSkills: plomberie, réparation, urgence\nLocation: 45.5017,-73.5673",
        'balance': "💰 Solde de crédits: {balance} crédits\n\nUtilisez /credits pour acheter plus de crédits",
        'profile_not_found': "❌ Profil non trouvé. Utilisez /register pour créer votre profil.",
        'credits_title': "💳 Sélectionnez un forfait de crédits:\n\nLes crédits sont utilisés pour soumettre des soumissions sur les projets des clients.\nChaque soumission coûte généralement 1 à 3 crédits.",
        'no_jobs': "📭 Aucun emploi disponible pour le moment.\nJe vous avertirai lorsque de nouvelles correspondances apparaîtront!",
        'registration_complete': "✅ Inscription terminée!\n\nVous recevrez maintenant des notifications pour les emplois correspondants.\nUtilisez /jobs pour voir les opportunités disponibles.",
        'quote_submitted': "✅ Soumission envoyée avec succès!\n\n1 crédit a été déduit de votre solde.\nVous serez averti si le client accepte votre soumission.",
        'insufficient_credits': "❌ Crédits insuffisants!\n\nUtilisez /credits pour acheter plus de crédits.",
        'new_match': "🔔 Nouvelle correspondance d'emploi!\n\n🔨 {title}\n📍 {distance} milles de distance\n🎯 Score de correspondance: {score}%\n\nAppuyez ci-dessous pour voir les détails et soumettre une soumission.",
        'quote_accepted': "🎉 Votre soumission a été acceptée!\n\nProjet: {title}\nMontant: {amount}$\n\nLe client vous contactera sous peu.",
        'language_changed': "✅ Langue changée en français"
    }
}

def get_user_language(user_id: int) -> str:
    """Get user's preferred language from database or default to French for Quebec launch"""
    # TODO: Implement database lookup
    # Default to French for Quebec market
    return 'fr'

def set_user_language(user_id: int, language: str):
    """Save user's language preference"""
    # TODO: Implement database save
    pass

def t(user_id: int, key: str, **kwargs) -> str:
    """Translate a key for a specific user"""
    lang = get_user_language(user_id)
    text = TRANSLATIONS.get(lang, TRANSLATIONS['en']).get(key, key)
    
    if kwargs:
        text = text.format(**kwargs)
    
    return text
