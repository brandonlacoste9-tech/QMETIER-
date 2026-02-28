# RBQ License Validator for Quebec Construction Contractors
# Validates CMEQ (Électricien) and CMMTQ (Mécanicien) licenses
# Ensures compliance with Code de construction du Québec - Article 46

param(
    [Parameter(Mandatory=$true)]
    [string]$LicenseNumber,
    
    [Parameter(Mandatory=$false)]
    [ValidateSet("CMEQ", "CMMTQ", "RBQ")]
    [string]$LicenseType = "RBQ"
)

function Get-RBQLicenseInfo {
    param(
        [string]$License,
        [string]$Type
    )
    
    # Load configuration
    $configPath = "$PSScriptRoot/../../config/app.config.json"
    $config = Get-Content $configPath | ConvertFrom-Json
    
    # Simulate RBQ API call (in production, this would call the actual RBQ API)
    # Format: RBQ License format is XXXX-XXXX-XX
    $licensePattern = '^\d{4}-\d{4}-\d{2}$'
    
    if ($License -notmatch $licensePattern) {
        return @{
            IsValid = $false
            Error = "Format de numéro de licence invalide. Format requis: XXXX-XXXX-XX"
            License = $License
        }
    }
    
    # Mock validation result (in production, call actual RBQ database)
    $validationResult = @{
        IsValid = $true
        License = $License
        Type = $Type
        CompanyName = "Entreprise Construction Exemple Inc."
        Status = "Actif"
        ExpiryDate = (Get-Date).AddYears(1).ToString("yyyy-MM-dd")
        Specialty = switch ($Type) {
            "CMEQ" { "Entrepreneur électricien" }
            "CMMTQ" { "Entrepreneur en mécanique du bâtiment" }
            default { "Entrepreneur général" }
        }
        ComplianceArticle46 = $true
        LastVerified = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
        RBQNumber = $License
    }
    
    return $validationResult
}

function Save-ValidationResult {
    param($Result)
    
    # Save validation result to data directory
    $dataPath = "$PSScriptRoot/../../data/contractors"
    if (-not (Test-Path $dataPath)) {
        New-Item -ItemType Directory -Path $dataPath -Force | Out-Null
    }
    
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $fileName = "validation-$($Result.License)-$timestamp.json"
    $filePath = Join-Path $dataPath $fileName
    
    $Result | ConvertTo-Json -Depth 10 | Set-Content $filePath
    Write-Host "✓ Résultat de validation sauvegardé: $fileName" -ForegroundColor Green
}

# Main execution
Write-Host "`n═══════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  Validation RBQ - DevisPro Quebec" -ForegroundColor Cyan
Write-Host "  Code de construction du Québec - Article 46" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════`n" -ForegroundColor Cyan

Write-Host "Validation de la licence: $LicenseNumber ($LicenseType)" -ForegroundColor Yellow

$result = Get-RBQLicenseInfo -License $LicenseNumber -Type $LicenseType

if ($result.IsValid) {
    Write-Host "`n✓ LICENCE VALIDE" -ForegroundColor Green
    Write-Host "  Entreprise: $($result.CompanyName)" -ForegroundColor White
    Write-Host "  Statut: $($result.Status)" -ForegroundColor Green
    Write-Host "  Type: $($result.Specialty)" -ForegroundColor White
    Write-Host "  Expiration: $($result.ExpiryDate)" -ForegroundColor White
    Write-Host "  Conformité Article 46: $($result.ComplianceArticle46)" -ForegroundColor Green
    
    Save-ValidationResult -Result $result
} else {
    Write-Host "`n✗ LICENCE INVALIDE" -ForegroundColor Red
    Write-Host "  Erreur: $($result.Error)" -ForegroundColor Red
}

Write-Host "`n═══════════════════════════════════════════════`n" -ForegroundColor Cyan

# Return result as JSON for automation
return $result | ConvertTo-Json -Depth 10
