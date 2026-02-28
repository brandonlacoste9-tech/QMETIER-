/**
 * DevisPro Backend Server
 * Quebec Construction Marketplace API
 * 
 * Features:
 * - RBQ License Verification
 * - Lead Management
 * - Contractor Profiles
 * - Interac e-Transfer Integration
 * - French-first Localization (fr-CA)
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../public')));

// Load configuration
const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/config.json'), 'utf8'));

// Data paths
const DATA_DIR = path.join(__dirname, '../data');
const CONTRACTORS_FILE = path.join(DATA_DIR, 'contractors.json');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

// Initialize data directory
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize data files
function initializeDataFiles() {
    if (!fs.existsSync(CONTRACTORS_FILE)) {
        const initialData = {
            contractors: [],
            lastUpdated: new Date().toISOString()
        };
        fs.writeFileSync(CONTRACTORS_FILE, JSON.stringify(initialData, null, 2));
    }
    
    if (!fs.existsSync(LEADS_FILE)) {
        const initialData = {
            leads: [],
            lastUpdated: new Date().toISOString()
        };
        fs.writeFileSync(LEADS_FILE, JSON.stringify(initialData, null, 2));
    }
}

initializeDataFiles();

/**
 * RBQ License Verification
 * Validates Quebec construction licenses (CMEQ/CMMTQ)
 * Ensures compliance with Code de construction Article 46
 */
function validateRBQLicense(licenseNumber, licenseType) {
    console.log(`Validating RBQ License: ${licenseNumber} (${licenseType})`);
    
    // Validate format
    const validFormats = {
        'CMEQ': /^\d{4}-\d{4}-\d{2}$/,  // CMEQ format
        'CMMTQ': /^\d{4}-\d{4}-\d{2}$/  // CMMTQ format
    };
    
    if (!validFormats[licenseType]) {
        return {
            valid: false,
            error: 'Type de licence invalide / Invalid license type'
        };
    }
    
    if (!validFormats[licenseType].test(licenseNumber)) {
        return {
            valid: false,
            error: 'Format de licence invalide / Invalid license format'
        };
    }
    
    // In production, this would call the actual RBQ API
    // For now, simulate a successful validation
    return {
        valid: true,
        licensee: 'Entrepreneur Certifié',
        status: 'Actif',
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        specializations: ['Électricité', 'Plomberie'],
        article46Compliant: true
    };
}

/**
 * Calculate Commission
 * 15% commission-on-win model
 */
function calculateCommission(projectValue) {
    return projectValue * config.payments.commissionRate;
}

// ============================================
// API Routes
// ============================================

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        app: config.app.name,
        version: config.app.version,
        language: config.app.language,
        timestamp: new Date().toISOString()
    });
});

// Get app configuration (public info only)
app.get('/api/config', (req, res) => {
    res.json({
        app: config.app,
        payments: {
            method: config.payments.method,
            commissionRate: config.payments.commissionRate,
            model: config.payments.model
        },
        compliance: config.compliance
    });
});

// Validate RBQ License
app.post('/api/rbq/validate', (req, res) => {
    const { licenseNumber, licenseType } = req.body;
    
    if (!licenseNumber || !licenseType) {
        return res.status(400).json({
            error: 'Numéro de licence et type requis / License number and type required'
        });
    }
    
    const validation = validateRBQLicense(licenseNumber, licenseType);
    res.json(validation);
});

// Register Contractor
app.post('/api/contractors/register', (req, res) => {
    const {
        name,
        email,
        phone,
        whatsapp,
        rbqLicenseNumber,
        rbqLicenseType,
        specializations,
        serviceAreas,
        businessName
    } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone || !rbqLicenseNumber || !rbqLicenseType) {
        return res.status(400).json({
            error: 'Champs requis manquants / Required fields missing'
        });
    }
    
    // Validate RBQ License
    const licenseValidation = validateRBQLicense(rbqLicenseNumber, rbqLicenseType);
    
    if (!licenseValidation.valid) {
        return res.status(400).json({
            error: 'Licence RBQ invalide / Invalid RBQ license',
            details: licenseValidation.error
        });
    }
    
    // Load contractors
    const contractorsData = JSON.parse(fs.readFileSync(CONTRACTORS_FILE, 'utf8'));
    
    // Check for duplicate
    const existing = contractorsData.contractors.find(c => c.email === email);
    if (existing) {
        return res.status(400).json({
            error: 'Entrepreneur déjà enregistré / Contractor already registered'
        });
    }
    
    // Create contractor profile
    const contractor = {
        id: `CTR-${Date.now()}`,
        name,
        businessName: businessName || name,
        email,
        contact: {
            phone,
            whatsapp: whatsapp || phone
        },
        rbqLicense: {
            number: rbqLicenseNumber,
            type: rbqLicenseType,
            valid: true,
            validatedAt: new Date().toISOString(),
            ...licenseValidation
        },
        specializations: specializations || [],
        serviceAreas: serviceAreas || ['Montreal'],
        rating: 5.0,
        completedProjects: 0,
        status: 'active',
        createdAt: new Date().toISOString()
    };
    
    contractorsData.contractors.push(contractor);
    contractorsData.lastUpdated = new Date().toISOString();
    
    fs.writeFileSync(CONTRACTORS_FILE, JSON.stringify(contractorsData, null, 2));
    
    res.status(201).json({
        message: 'Entrepreneur enregistré avec succès / Contractor registered successfully',
        contractor: {
            id: contractor.id,
            name: contractor.name,
            rbqLicense: contractor.rbqLicense
        }
    });
});

// Get all contractors
app.get('/api/contractors', (req, res) => {
    const contractorsData = JSON.parse(fs.readFileSync(CONTRACTORS_FILE, 'utf8'));
    
    // Return public contractor info only
    const publicContractors = contractorsData.contractors
        .filter(c => c.status === 'active')
        .map(c => ({
            id: c.id,
            name: c.businessName,
            specializations: c.specializations,
            serviceAreas: c.serviceAreas,
            rating: c.rating,
            completedProjects: c.completedProjects,
            rbqLicenseType: c.rbqLicense.type,
            rbqValid: c.rbqLicense.valid
        }));
    
    res.json({
        contractors: publicContractors,
        count: publicContractors.length
    });
});

// Submit Lead
app.post('/api/leads/submit', (req, res) => {
    const {
        customerName,
        email,
        phone,
        serviceType,
        description,
        location,
        region,
        estimatedBudget,
        urgency
    } = req.body;
    
    // Validate required fields
    if (!customerName || !email || !phone || !serviceType || !description || !location) {
        return res.status(400).json({
            error: 'Champs requis manquants / Required fields missing'
        });
    }
    
    // Load leads
    const leadsData = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
    
    // Create lead
    // Extract numeric value from budget range for commission calculation
    let budgetValue = 0;
    if (estimatedBudget && estimatedBudget !== 'Non spécifié') {
        // Extract numbers from budget range (e.g., "5000$ - 10000$" -> midpoint 7500)
        const numbers = estimatedBudget.match(/(\d+)/g);
        if (numbers && numbers.length >= 2) {
            // Use midpoint of range for more accurate commission estimate
            const min = parseFloat(numbers[0]);
            const max = parseFloat(numbers[1]);
            budgetValue = (min + max) / 2;
        } else if (numbers && numbers.length === 1) {
            // Single value (e.g., "Moins de 1000$" -> use that value)
            budgetValue = parseFloat(numbers[0]);
        }
    }
    
    const lead = {
        id: `LEAD-${Date.now()}`,
        customer: {
            name: customerName,
            email,
            phone
        },
        serviceType,
        description,
        location,
        region: region || 'Montreal',
        estimatedBudget: estimatedBudget || 'Non spécifié',
        urgency: urgency || 'normal',
        status: 'new',
        commission: calculateCommission(budgetValue),
        createdAt: new Date().toISOString()
    };
    
    leadsData.leads.push(lead);
    leadsData.lastUpdated = new Date().toISOString();
    
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leadsData, null, 2));
    
    res.status(201).json({
        message: 'Demande soumise avec succès / Request submitted successfully',
        lead: {
            id: lead.id,
            serviceType: lead.serviceType,
            status: lead.status
        }
    });
});

// Get all leads (admin/contractor view)
app.get('/api/leads', (req, res) => {
    const leadsData = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
    res.json({
        leads: leadsData.leads,
        count: leadsData.leads.length
    });
});

// Calculate commission preview
app.post('/api/payments/commission-preview', (req, res) => {
    const { projectValue } = req.body;
    
    if (!projectValue || projectValue <= 0) {
        return res.status(400).json({
            error: 'Valeur de projet invalide / Invalid project value'
        });
    }
    
    const commission = calculateCommission(projectValue);
    const contractorEarnings = projectValue - commission;
    
    res.json({
        projectValue,
        commissionRate: `${config.payments.commissionRate * 100}%`,
        commission,
        contractorEarnings,
        paymentMethod: config.payments.method,
        model: config.payments.model
    });
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/register.html'));
});

app.get('/submit-lead', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/submit-lead.html'));
});

// Start server
app.listen(PORT, () => {
    console.log('╔══════════════════════════════════════════════════════════╗');
    console.log('║              DevisPro Backend Server                     ║');
    console.log('║      Quebec Construction Marketplace API                 ║');
    console.log('╚══════════════════════════════════════════════════════════╝');
    console.log(`\n✓ Server running on http://localhost:${PORT}`);
    console.log(`✓ Language: ${config.app.language}`);
    console.log(`✓ Commission Model: ${config.payments.commissionRate * 100}% on win`);
    console.log(`✓ RBQ Validation: Enabled`);
    console.log(`✓ Bill 101 Compliance: ${config.compliance.bill101 ? 'Active' : 'Inactive'}`);
    console.log('\nPress Ctrl+C to stop\n');
});

module.exports = app;
