# Interac e-Transfer Payment Integration for Quebec
# Handles 15% commission-on-win payment processing

param(
    [Parameter(Mandatory=$false)]
    [string]$TransactionId,
    
    [Parameter(Mandatory=$false)]
    [decimal]$Amount,
    
    [Parameter(Mandatory=$false)]
    [string]$ContractorEmail
)

function New-InteracPayment {
    param(
        [string]$Email,
        [decimal]$Amount,
        [string]$Reference,
        [string]$Message
    )
    
    # Simulate Interac e-Transfer API call
    $payment = @{
        TransactionId = "INT-" + (Get-Random -Minimum 100000 -Maximum 999999)
        Email = $Email
        Amount = $Amount
        Currency = "CAD"
        Reference = $Reference
        Message = $Message
        Status = "Pending"
        InitiatedAt = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        SecurityQuestion = "Quelle est votre licence RBQ?"
        SecurityAnswer = "Voir courriel"
        Provider = "Interac"
        CommissionRate = 0.15
    }
    
    return $payment
}

function Process-CommissionPayment {
    param(
        [string]$LeadId,
        [string]$ContractorId,
        [decimal]$ProjectValue
    )
    
    $commissionAmount = $ProjectValue * 0.15
    
    Write-Host "`n💳 Traitement du paiement de commission..." -ForegroundColor Yellow
    Write-Host "  Contrat: $LeadId" -ForegroundColor White
    Write-Host "  Valeur du projet: $ProjectValue CAD" -ForegroundColor White
    Write-Host "  Commission (15%): $commissionAmount CAD" -ForegroundColor Green
    
    # Load contractor info
    $contractor = @{
        Id = $ContractorId
        Email = "entrepreneur@example.com"
        Name = "Entrepreneur Exemple Inc."
    }
    
    $message = @"
DevisPro - Commission à la réussite
Projet complété avec succès!
Montant: $commissionAmount CAD (15% de $ProjectValue CAD)
"@
    
    $payment = New-InteracPayment -Email $contractor.Email -Amount $commissionAmount -Reference $LeadId -Message $message
    
    return $payment
}

function Save-PaymentRecord {
    param($Payment)
    
    $paymentsPath = "$PSScriptRoot/../../data/payments"
    if (-not (Test-Path $paymentsPath)) {
        New-Item -ItemType Directory -Path $paymentsPath -Force | Out-Null
    }
    
    $fileName = "payment-$($Payment.TransactionId)-$(Get-Date -Format 'yyyyMMdd-HHmmss').json"
    $filePath = Join-Path $paymentsPath $fileName
    
    $Payment | ConvertTo-Json -Depth 10 | Set-Content $filePath
    Write-Host "`n✓ Enregistrement du paiement sauvegardé: $fileName" -ForegroundColor Green
}

# Main execution
Write-Host "`n╔════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║    Interac e-Transfer - DevisPro Québec      ║" -ForegroundColor Cyan
Write-Host "║    Modèle: Commission à la réussite (15%)    ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Demo transaction
$demoLeadId = "LEAD-5678"
$demoContractorId = "CTR-001"
$demoProjectValue = 8500

Write-Host "📊 Traitement d'une commission de projet complété" -ForegroundColor Yellow

$payment = Process-CommissionPayment -LeadId $demoLeadId -ContractorId $demoContractorId -ProjectValue $demoProjectValue

if ($payment) {
    Write-Host "`n✅ Paiement Interac e-Transfer initié" -ForegroundColor Green
    Write-Host "  ID Transaction: $($payment.TransactionId)" -ForegroundColor White
    Write-Host "  Email: $($payment.Email)" -ForegroundColor White
    Write-Host "  Montant: $($payment.Amount) $($payment.Currency)" -ForegroundColor Green
    Write-Host "  Statut: $($payment.Status)" -ForegroundColor Yellow
    Write-Host "  Fournisseur: $($payment.Provider)" -ForegroundColor White
    
    Save-PaymentRecord -Payment $payment
    
    Write-Host "`n📧 L'entrepreneur recevra un courriel Interac e-Transfer" -ForegroundColor Cyan
    Write-Host "   Paiement sécurisé - Méthode préférée au Québec 🇨🇦" -ForegroundColor Gray
}

Write-Host "`n╚════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

return $payment | ConvertTo-Json -Depth 10
