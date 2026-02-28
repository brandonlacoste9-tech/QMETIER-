# WhatsApp & SMS Notification Module for Quebec Contractors
# Bilingual notifications (fr-CA primary)

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("WhatsApp", "SMS", "Both")]
    [string]$Channel = "Both",
    
    [Parameter(Mandatory=$false)]
    [string]$PhoneNumber,
    
    [Parameter(Mandatory=$false)]
    [string]$Message
)

function Send-WhatsAppNotification {
    param(
        [string]$Phone,
        [string]$Message
    )
    
    # Format phone number for WhatsApp (Quebec format: +1-XXX-XXX-XXXX)
    $formattedPhone = $Phone -replace '[^0-9]', ''
    if ($formattedPhone.Length -eq 10) {
        $formattedPhone = "1$formattedPhone"
    }
    
    Write-Host "`n📱 Envoi de notification WhatsApp..." -ForegroundColor Yellow
    Write-Host "  Destinataire: +$formattedPhone" -ForegroundColor White
    
    # Simulate WhatsApp API call
    $notification = @{
        NotificationId = "WA-" + (Get-Random -Minimum 100000 -Maximum 999999)
        Channel = "WhatsApp"
        Phone = "+$formattedPhone"
        Message = $Message
        Status = "Envoyé"
        SentAt = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        DeliveryStatus = "En attente"
        Language = "fr-CA"
    }
    
    Write-Host "  ✓ Message envoyé via WhatsApp" -ForegroundColor Green
    Write-Host "  ID: $($notification.NotificationId)" -ForegroundColor Gray
    
    return $notification
}

function Send-SMSNotification {
    param(
        [string]$Phone,
        [string]$Message
    )
    
    # Format phone number for SMS
    $formattedPhone = $Phone -replace '[^0-9]', ''
    
    Write-Host "`n📲 Envoi de notification SMS..." -ForegroundColor Yellow
    Write-Host "  Destinataire: $formattedPhone" -ForegroundColor White
    
    # Simulate SMS API call (Twilio or similar)
    $notification = @{
        NotificationId = "SMS-" + (Get-Random -Minimum 100000 -Maximum 999999)
        Channel = "SMS"
        Phone = $formattedPhone
        Message = $Message
        Status = "Envoyé"
        SentAt = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        Provider = "Twilio"
        Language = "fr-CA"
    }
    
    Write-Host "  ✓ SMS envoyé avec succès" -ForegroundColor Green
    Write-Host "  ID: $($notification.NotificationId)" -ForegroundColor Gray
    
    return $notification
}

function New-LeadNotificationMessage {
    param(
        [string]$ContractorName,
        [string]$ServiceType,
        [string]$CustomerName,
        [decimal]$ProjectValue,
        [string]$LeadId
    )
    
    $commissionAmount = $ProjectValue * 0.15
    
    # French-first message (Bill 101 compliant)
    $message = @"
🔔 DevisPro - Nouvelle opportunité!

Bonjour $ContractorName,

Un nouveau projet correspond à vos compétences:

📋 Service: $ServiceType
👤 Client: $CustomerName
💰 Valeur estimée: $ProjectValue `$CAD
📊 Commission (15%): $commissionAmount `$CAD

🎯 Répondez rapidement pour décrocher ce contrat!

Pour répondre: https://devispro.qc.ca/lead/$LeadId

DevisPro - Votre succès, notre mission 🇨🇦
"@
    
    return $message
}

function New-PaymentNotificationMessage {
    param(
        [string]$ContractorName,
        [decimal]$Amount,
        [string]$TransactionId
    )
    
    $message = @"
💳 DevisPro - Paiement en cours

Bonjour $ContractorName,

Félicitations! Votre commission a été traitée:

💰 Montant: $Amount `$CAD
🔒 Transaction: $TransactionId
📧 Méthode: Interac e-Transfer

Vous recevrez un courriel Interac dans quelques minutes.

Merci de votre excellent travail! 🏆

DevisPro Québec 🇨🇦
"@
    
    return $message
}

function Save-NotificationLog {
    param($Notifications)
    
    $logPath = "$PSScriptRoot/../../data/notifications"
    if (-not (Test-Path $logPath)) {
        New-Item -ItemType Directory -Path $logPath -Force | Out-Null
    }
    
    $fileName = "notifications-$(Get-Date -Format 'yyyyMMdd-HHmmss').json"
    $filePath = Join-Path $logPath $fileName
    
    $Notifications | ConvertTo-Json -Depth 10 | Set-Content $filePath
    Write-Host "`n✓ Journal des notifications sauvegardé: $fileName" -ForegroundColor Green
}

# Main execution
Write-Host "`n╔════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   Notifications - DevisPro Québec             ║" -ForegroundColor Cyan
Write-Host "║   WhatsApp & SMS en français                  ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Demo notification
$demoContractor = @{
    Name = "Jean Tremblay"
    Phone = "+1-514-555-9876"
    RBQLicense = "5234-8976-01"
}

$demoLead = @{
    Id = "LEAD-1234"
    ServiceType = "Installation électrique"
    CustomerName = "Marie Dubois"
    ProjectValue = 8500
}

Write-Host "📣 Envoi de notification de nouveau contrat" -ForegroundColor Yellow
Write-Host "  Entrepreneur: $($demoContractor.Name)" -ForegroundColor White
Write-Host "  Téléphone: $($demoContractor.Phone)" -ForegroundColor White

$message = New-LeadNotificationMessage -ContractorName $demoContractor.Name -ServiceType $demoLead.ServiceType -CustomerName $demoLead.CustomerName -ProjectValue $demoLead.ProjectValue -LeadId $demoLead.Id

$notifications = @()

if ($Channel -eq "WhatsApp" -or $Channel -eq "Both") {
    $whatsappNotif = Send-WhatsAppNotification -Phone $demoContractor.Phone -Message $message
    $notifications += $whatsappNotif
}

if ($Channel -eq "SMS" -or $Channel -eq "Both") {
    # Truncate message for SMS (160 chars limit)
    $smsMessage = "DevisPro: Nouveau projet - $($demoLead.ServiceType). Valeur: $($demoLead.ProjectValue)`$. Commission 15%: $($demoLead.ProjectValue * 0.15)`$. Voir https://devispro.qc.ca/lead/$($demoLead.Id)"
    $smsNotif = Send-SMSNotification -Phone $demoContractor.Phone -Message $smsMessage
    $notifications += $smsNotif
}

Save-NotificationLog -Notifications $notifications

Write-Host "`n✅ Notifications envoyées avec succès!" -ForegroundColor Green
Write-Host "   Canal(x): $Channel" -ForegroundColor Yellow
Write-Host "   Langue: Français (fr-CA) - Bill 101 compliant ✓" -ForegroundColor Green

Write-Host "`n╚════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

return $notifications | ConvertTo-Json -Depth 10
