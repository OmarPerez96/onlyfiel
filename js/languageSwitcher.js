// Initialize translations when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing language switcher');
    
    // Set initial language from localStorage or default to 'en'
    const currentLang = localStorage.getItem('preferredLanguage') || 'en';
    console.log('Initial language:', currentLang);
    
    // Initialize dropdown functionality
    initializeLanguageDropdown();
    
    // Update content with current language
    updateContent(currentLang);
});

function initializeLanguageDropdown() {
    const languageButton = document.getElementById('languageButton');
    const languageDropdown = document.getElementById('languageDropdown');
    
    // Toggle dropdown on button click
    languageButton.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('hidden');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        languageDropdown.classList.add('hidden');
    });
}

function setLanguage(language) {
    console.log('Setting language to:', language);
    
    if (!translations[language]) {
        console.error(`Translation not found for language: ${language}`);
        return;
    }

    // Save selected language
    localStorage.setItem('preferredLanguage', language);
    console.log('Language saved to localStorage');
    
    // Update content
    updateContent(language);
    
    // Hide dropdown after selection
    const languageDropdown = document.getElementById('languageDropdown');
    languageDropdown.classList.add('hidden');
}

function updateContent(language) {
    console.log('Updating content for language:', language);
    
    if (!translations[language]) {
        console.error(`Translation not found for language: ${language}`);
        return;
    }

    // Update current language display
    const currentLanguageSpan = document.getElementById('currentLanguage');
    currentLanguageSpan.textContent = language === 'en' ? 'English' : 'Español';

    const elements = document.querySelectorAll('[data-i18n]');
    console.log('Found elements to translate:', elements.length);
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        console.log('Translating element with key:', key);
        
        if (!translations[language][key]) {
            console.warn(`Translation key not found: ${key} for language: ${language}`);
            return;
        }

        const translation = translations[language][key];
        console.log(`Translating "${key}" to:`, translation);

        // Handle different element types
        switch (element.tagName.toLowerCase()) {
            case 'input':
                if (element.type === 'text' || element.type === 'placeholder') {
                    element.placeholder = translation;
                }
                break;
            case 'a':
            case 'button':
            case 'span':
            case 'p':
            case 'h2':
            case 'h3':
            case 'label':
                element.textContent = translation;
                break;
            default:
                element.textContent = translation;
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = language;
    console.log('Updated HTML lang attribute to:', language);
}

// Make functions available globally
window.setLanguage = setLanguage;
window.updateContent = updateContent;

console.log('Language switcher script loaded');
