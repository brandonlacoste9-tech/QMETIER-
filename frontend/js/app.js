// DevisPro Quebec - Frontend JavaScript Application
// French-first localization and Bill 101 compliance

// Load configuration and localization
const CONFIG_PATH = '../../config/app.config.json';
const LOCALE_PATH = '../../src/localization/fr-CA.json';

let appConfig = null;
let translations = null;

// Initialize application
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🏗️ Initialisation de DevisPro Quebec...');
    
    try {
        // Load configuration
        appConfig = await loadJSON(CONFIG_PATH);
        translations = await loadJSON(LOCALE_PATH);
        
        console.log('✓ Configuration chargée');
        console.log('✓ Localisation fr-CA chargée');
        
        // Initialize components
        initSmoothScroll();
        initFormValidation();
        initNotifications();
        
        console.log('✓ DevisPro initialisé avec succès');
    } catch (error) {
        console.error('❌ Erreur d\'initialisation:', error);
    }
});

// Load JSON file
async function loadJSON(path) {
    try {
        const response = await fetch(path);
        return await response.json();
    } catch (error) {
        console.warn(`Configuration locale utilisée pour ${path}`);
        return getDefaultConfig();
    }
}

// Default configuration fallback
function getDefaultConfig() {
    return {
        appName: "DevisPro",
        locale: "fr-CA",
        commission: { rate: 0.15 },
        rbq: { 
            licenseTypes: ["CMEQ", "CMMTQ", "RBQ"],
            validationRequired: true
        }
    };
}

// Smooth scroll for navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    console.log('📋 Soumission de formulaire:', data);
    
    // Validate RBQ license if contractor registration
    if (data.rbqLicense) {
        const isValid = await validateRBQLicense(data.rbqLicense);
        if (!isValid) {
            showNotification('❌ Numéro de licence RBQ invalide', 'error');
            return;
        }
    }
    
    showNotification('✅ Formulaire soumis avec succès!', 'success');
}

// Validate RBQ License format
function validateRBQLicense(license) {
    // Format: XXXX-XXXX-XX
    const rbqPattern = /^\d{4}-\d{4}-\d{2}$/;
    return rbqPattern.test(license);
}

// Notification system
function initNotifications() {
    // Create notification container if it doesn't exist
    if (!document.getElementById('notification-container')) {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(container);
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    
    const colors = {
        success: '#2ECC71',
        error: '#E74C3C',
        warning: '#F39C12',
        info: '#0066CC'
    };
    
    notification.style.cssText = `
        background-color: ${colors[type] || colors.info};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        min-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    notification.textContent = message;
    container.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Calculate commission
function calculateCommission(projectValue) {
    const commissionRate = appConfig?.commission?.rate || 0.15;
    return projectValue * commissionRate;
}

// Format currency (Canadian dollars)
function formatCurrency(amount) {
    return new Intl.NumberFormat('fr-CA', {
        style: 'currency',
        currency: 'CAD'
    }).format(amount);
}

// Format phone number (Quebec format)
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `+1-${cleaned.slice(0,3)}-${cleaned.slice(3,6)}-${cleaned.slice(6)}`;
    }
    return phone;
}

// Lead submission form handler
function submitLeadRequest(formData) {
    const lead = {
        id: generateLeadId(),
        serviceType: formData.serviceType,
        description: formData.description,
        budget: parseFloat(formData.budget),
        urgency: formData.urgency,
        location: formData.location,
        customerName: formData.customerName,
        customerPhone: formatPhoneNumber(formData.customerPhone),
        customerEmail: formData.customerEmail,
        submittedAt: new Date().toISOString(),
        status: 'Nouveau',
        commission: calculateCommission(parseFloat(formData.budget))
    };
    
    console.log('📋 Nouvelle demande de soumission:', lead);
    
    // In production, this would call the OpenClaw engine
    // For now, simulate success
    showNotification('✅ Votre demande a été envoyée aux entrepreneurs qualifiés RBQ!', 'success');
    
    return lead;
}

// Generate unique lead ID
function generateLeadId() {
    return `LEAD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

// Contractor registration
function registerContractor(formData) {
    const contractor = {
        id: generateContractorId(),
        companyName: formData.companyName,
        rbqLicense: formData.rbqLicense,
        licenseType: formData.licenseType,
        specialties: formData.specialties.split(',').map(s => s.trim()),
        region: formData.region,
        contactName: formData.contactName,
        phone: formatPhoneNumber(formData.phone),
        email: formData.email,
        whatsappEnabled: formData.whatsappEnabled === 'true',
        smsEnabled: formData.smsEnabled === 'true',
        registeredAt: new Date().toISOString(),
        status: 'En attente de validation RBQ'
    };
    
    console.log('👷 Nouvel entrepreneur enregistré:', contractor);
    
    showNotification('✅ Inscription réussie! Validation RBQ en cours...', 'success');
    
    return contractor;
}

// Generate unique contractor ID
function generateContractorId() {
    return `CTR-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

// Service selection handler
function handleServiceSelection(serviceType) {
    console.log(`🔍 Service sélectionné: ${serviceType}`);
    
    // Scroll to lead form
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        leadForm.scrollIntoView({ behavior: 'smooth' });
        // Pre-fill service type
        const serviceInput = leadForm.querySelector('[name="serviceType"]');
        if (serviceInput) {
            serviceInput.value = serviceType;
        }
    }
}

// Add click handlers to service cards
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', () => {
            const serviceType = card.querySelector('h3')?.textContent;
            if (serviceType) {
                handleServiceSelection(serviceType);
            }
        });
    });
});

// Animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateRBQLicense,
        calculateCommission,
        formatCurrency,
        formatPhoneNumber,
        submitLeadRequest,
        registerContractor
    };
}

console.log('✅ DevisPro Quebec JavaScript chargé');
