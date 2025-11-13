// Esperar a que Lucide esté disponible
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }
});

// Función principal para cargar los lifehacks
let lifehacks = {};

async function loadLifehacks() {
    try {
        const response = await fetch('./lifehacks.json');
        if (!response.ok) {
            throw new Error('Error al cargar los lifehacks');
        }
        lifehacks = await response.json();
        loadPreferences();
        displayLifehack();
    } catch (error) {
        console.error('Error cargand lifehacks:', error);
    }
}

// Estado de la aplicación
let currentLanguage = 'es';
let currentLifehackIndex = 0;

// Elementos del DOM
const lifehackText = document.getElementById('lifehackText');
const categoryBadge = document.getElementById('categoryBadge');
const nextButton = document.getElementById('nextButton');
const themeToggle = document.getElementById('themeToggle');
const languageSelect = document.getElementById('languageSelect');
const buttonText = document.getElementById('buttonText');

// Textos multiidioma para botón
const buttonTexts = {
    es: 'Otro truco',
    en: 'Another hack'
};

// Cargar preferencias almacenadas
function loadPreferences() {
    const savedLanguage = localStorage.getItem('littlehacksLanguage');
    const savedTheme = localStorage.getItem('littlehacksTheme');
    
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        languageSelect.value = savedLanguage;
    }
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
    }
}

// Guardar preferencias
function savePreferences() {
    localStorage.setItem('littlehacksLanguage', currentLanguage);
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('littlehacksTheme', isDarkMode ? 'dark' : 'light');
}

// Obtener lifehack aleatorio
function getRandomLifehack() {
    const lifehacksArray = lifehacks[currentLanguage];
    return lifehacksArray[Math.floor(Math.random() * lifehacksArray.length)];
}

// Mostrar lifehack
function displayLifehack() {
    const lifehack = getRandomLifehack();
    lifehackText.textContent = lifehack.text;
    categoryBadge.textContent = lifehack.category;
    
    // Animar la aparición
    lifehackText.style.animation = 'none';
    categoryBadge.style.animation = 'none';
    
    requestAnimationFrame(() => {
        lifehackText.style.animation = 'fadeIn 0.6s ease';
        categoryBadge.style.animation = 'slideDown 0.5s ease';
    });s
}

// Cambiar idioma
function changeLanguage(lang) {
    currentLanguage = lang;
    buttonText.textContent = buttonTexts[lang];
    displayLifehack();
    savePreferences();
}

// Toggle modo oscuro
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.querySelector('.theme-icon').textContent = isDarkMode ? '☀️' : '🌙';
    savePreferences();
}

// Event Listeners
nextButton.addEventListener('click', displayLifehack);
themeToggle.addEventListener('click', toggleTheme);
languageSelect.addEventListener('change', (e) => {
    changeLanguage(e.target.value);
});

// Inicializar
loadLifehacks();