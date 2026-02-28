#!/usr/bin/env pwsh
# DevisPro Master Script - Demo complète de toutes les fonctionnalités
# Exécute une démonstration complète du système

Write-Host "`n╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                           ║" -ForegroundColor Cyan
Write-Host "║           🏗️  DevisPro - Plateforme Québec  🏗️           ║" -ForegroundColor Cyan
Write-Host "║                                                           ║" -ForegroundColor Cyan
Write-Host "║   Plateforme spécialisée construction - Québec           ║" -ForegroundColor Cyan
Write-Host "║   Conformité RBQ • Loi 101 • Code construction           ║" -ForegroundColor Cyan
Write-Host "║                                                           ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

$rootPath = Split-Path -Parent $PSScriptRoot

Write-Host "📂 Chemin racine: $rootPath`n" -ForegroundColor Gray

# Menu principal
function Show-Menu {
    Write-Host "`n╔════════════════════════════════════════╗" -ForegroundColor Yellow
    Write-Host "║        MENU PRINCIPAL - DevisPro       ║" -ForegroundColor Yellow
    Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  1️⃣  Validation RBQ (CMEQ/CMMTQ)" -ForegroundColor White
    Write-Host "  2️⃣  Distribution de contrats (OpenClaw)" -ForegroundColor White
    Write-Host "  3️⃣  Traitement paiement Interac" -ForegroundColor White
    Write-Host "  4️⃣  Envoi notifications (WhatsApp/SMS)" -ForegroundColor White
    Write-Host "  5️⃣  Démonstration complète" -ForegroundColor Green
    Write-Host "  6️⃣  Afficher configuration" -ForegroundColor White
    Write-Host "  7️⃣  Voir données entrepreneurs" -ForegroundColor White
    Write-Host "  0️⃣  Quitter" -ForegroundColor Red
    Write-Host ""
}

function Run-ValidationDemo {
    Write-Host "`n🔍 Lancement de la validation RBQ..." -ForegroundColor Cyan
    $validationScript = Join-Path $rootPath "src/validation/rbq-validator.ps1"
    
    if (Test-Path $validationScript) {
        & $validationScript -LicenseNumber "5234-8976-01" -LicenseType "CMEQ"
    } else {
        Write-Host "❌ Script de validation non trouvé: $validationScript" -ForegroundColor Red
    }
}

function Run-OpenClawDemo {
    Write-Host "`n🤖 Lancement du moteur OpenClaw..." -ForegroundColor Cyan
    $openclawScript = Join-Path $rootPath "src/automation/openclaw-engine.ps1"
    
    if (Test-Path $openclawScript) {
        & $openclawScript
    } else {
        Write-Host "❌ Script OpenClaw non trouvé: $openclawScript" -ForegroundColor Red
    }
}

function Run-PaymentDemo {
    Write-Host "`n💳 Lancement du traitement de paiement..." -ForegroundColor Cyan
    $paymentScript = Join-Path $rootPath "src/payment/interac-integration.ps1"
    
    if (Test-Path $paymentScript) {
        & $paymentScript
    } else {
        Write-Host "❌ Script de paiement non trouvé: $paymentScript" -ForegroundColor Red
    }
}

function Run-NotificationDemo {
    Write-Host "`n📱 Lancement du service de notifications..." -ForegroundColor Cyan
    $notificationScript = Join-Path $rootPath "src/notifications/notification-service.ps1"
    
    if (Test-Path $notificationScript) {
        & $notificationScript -Channel "Both"
    } else {
        Write-Host "❌ Script de notifications non trouvé: $notificationScript" -ForegroundColor Red
    }
}

function Run-FullDemo {
    Write-Host "`n╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
    Write-Host "║           DÉMONSTRATION COMPLÈTE - DevisPro              ║" -ForegroundColor Magenta
    Write-Host "╚═══════════════════════════════════════════════════════════╝`n" -ForegroundColor Magenta
    
    Write-Host "Cette démo exécute tous les modules dans l'ordre:`n" -ForegroundColor Yellow
    Write-Host "  1. Validation RBQ" -ForegroundColor White
    Write-Host "  2. Distribution de contrats" -ForegroundColor White
    Write-Host "  3. Notifications aux entrepreneurs" -ForegroundColor White
    Write-Host "  4. Traitement des paiements`n" -ForegroundColor White
    
    Read-Host "Appuyez sur Entrée pour continuer"
    
    # Étape 1: Validation
    Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "ÉTAPE 1/4: VALIDATION RBQ" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Run-ValidationDemo
    Start-Sleep -Seconds 2
    
    # Étape 2: Distribution
    Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "ÉTAPE 2/4: DISTRIBUTION DE CONTRATS" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Run-OpenClawDemo
    Start-Sleep -Seconds 2
    
    # Étape 3: Notifications
    Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "ÉTAPE 3/4: NOTIFICATIONS" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Run-NotificationDemo
    Start-Sleep -Seconds 2
    
    # Étape 4: Paiement
    Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "ÉTAPE 4/4: TRAITEMENT PAIEMENT" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Run-PaymentDemo
    
    Write-Host "`n╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║              ✅ DÉMONSTRATION TERMINÉE ✅                 ║" -ForegroundColor Green
    Write-Host "╚═══════════════════════════════════════════════════════════╝`n" -ForegroundColor Green
}

function Show-Config {
    Write-Host "`n📋 Configuration de l'application`n" -ForegroundColor Cyan
    $configPath = Join-Path $rootPath "config/app.config.json"
    
    if (Test-Path $configPath) {
        $config = Get-Content $configPath | ConvertFrom-Json
        $config | ConvertTo-Json -Depth 10 | Write-Host
    } else {
        Write-Host "❌ Fichier de configuration non trouvé" -ForegroundColor Red
    }
}

function Show-Contractors {
    Write-Host "`n👷 Base de données entrepreneurs`n" -ForegroundColor Cyan
    $contractorsPath = Join-Path $rootPath "data/contractors/sample-contractors.json"
    
    if (Test-Path $contractorsPath) {
        $contractors = Get-Content $contractorsPath | ConvertFrom-Json
        
        foreach ($contractor in $contractors) {
            Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
            Write-Host "  Entreprise: $($contractor.companyName)" -ForegroundColor White
            Write-Host "  Licence RBQ: $($contractor.rbqLicense) ($($contractor.licenseType))" -ForegroundColor Green
            Write-Host "  Région: $($contractor.region)" -ForegroundColor White
            Write-Host "  Note: $($contractor.rating)/5 ⭐" -ForegroundColor Yellow
            Write-Host "  Projets complétés: $($contractor.completedProjects)" -ForegroundColor White
            Write-Host "  Taux de réponse: $([math]::Round($contractor.responseRate * 100))%" -ForegroundColor Cyan
        }
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Gray
        
        Write-Host "Total: $($contractors.Count) entrepreneurs enregistrés`n" -ForegroundColor Green
    } else {
        Write-Host "❌ Fichier entrepreneurs non trouvé" -ForegroundColor Red
    }
}

# Boucle principale
$running = $true

while ($running) {
    Show-Menu
    $choice = Read-Host "Choisissez une option"
    
    switch ($choice) {
        "1" { Run-ValidationDemo }
        "2" { Run-OpenClawDemo }
        "3" { Run-PaymentDemo }
        "4" { Run-NotificationDemo }
        "5" { Run-FullDemo }
        "6" { Show-Config }
        "7" { Run-Contractors }
        "0" { 
            Write-Host "`n👋 Au revoir! Merci d'utiliser DevisPro Québec 🇨🇦`n" -ForegroundColor Cyan
            $running = $false 
        }
        default { 
            Write-Host "`n❌ Option invalide. Veuillez choisir 0-7.`n" -ForegroundColor Red 
        }
    }
    
    if ($running) {
        Read-Host "`nAppuyez sur Entrée pour continuer"
    }
}
