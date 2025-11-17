// Espera de Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }
});

// Load Lifehacks; main function
let lifehacks = {};
let selectedCategories = [];

async function loadLifehacks() {
    try {
        const response = await fetch('./lifehacks.json');
        if (!response.ok) {
            throw new Error('Error al cargar los lifehacks');
        }
        lifehacks = await response.json();
        loadPreferences();
        initializeFilters();
        displayLifehack();
    } catch (error) {
        console.error('Error cargand lifehacks:', error);
    }
}

// Estado de la aplicación
let currentLanguage = 'es';
let currentLifehackIndex = 0;

// DOM elements
const lifehackText = document.getElementById('lifehackText');
const categoryBadge = document.getElementById('categoryBadge');
const nextButton = document.getElementById('nextButton');
const themeToggle = document.getElementById('themeToggle');
const languageSelect = document.getElementById('languageSelect');
const buttonText = document.getElementById('buttonText');
const filtersButton = document.getElementById('filtersButton');
const filtersModal = document.getElementById('filtersModal');
const filtersClose = document.getElementById('filtersClose');
const filtersList = document.getElementById('filtersList');
const filtersTitle = document.getElementById('filtersTitle');

// Textos multiidioma para botón
const buttonTexts = {
    es: 'Otro truco',
    en: 'Another hack'
};

const filterTexts = {
    es: 'Filtrar por categoría',
    en: 'Filter by category'
};

const filterActionsTexts = {
    es: {
        reset: 'Limpiar',
        apply: 'Aplicar'
    },
    en: {
        reset: 'Clear',
        apply: 'Apply'
    }
};

// Obtener todas las categorías únicas
function getAllCategories() {
    const categories = new Set();
    const lifehacksArray = lifehacks[currentLanguage] || [];
    lifehacksArray.forEach(hack => {
        categories.add(hack.category);
    });
    return Array.from(categories).sort();
}

// Inicializar filtros
function initializeFilters() {
    const categories = getAllCategories();
    filtersList.innerHTML = '';
    
    categories.forEach(category => {
        const filterItem = document.createElement('div');
        filterItem.className = 'filter-item';
        filterItem.innerHTML = `
            <input type="checkbox" id="filter-${category}" value="${category}" 
                ${selectedCategories.includes(category) ? 'checked' : ''}>
            <label for="filter-${category}">${category}</label>
        `;
        
        if (selectedCategories.includes(category)) {
            filterItem.classList.add('active');
        }
        
        filterItem.querySelector('input').addEventListener('change', (e) => {
            const label = filterItem.querySelector('label');
            if (e.target.checked) {
                selectedCategories.push(category);
                filterItem.classList.add('active');
            } else {
                selectedCategories = selectedCategories.filter(c => c !== category);
                filterItem.classList.remove('active');
            }
        });

        filtersList.appendChild(filterItem);
    });

    // Agregar botones de acciones
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'filters-actions';
    actionsDiv.innerHTML = `
        <button class="filter-btn filter-btn-reset" id="filterReset">${filterActionsTexts[currentLanguage].reset}</button>
        <button class="filter-btn filter-btn-apply" id="filterApply">${filterActionsTexts[currentLanguage].apply}</button>
    `;
    filtersList.appendChild(actionsDiv);

    document.getElementById('filterReset').addEventListener('click', () => {
        selectedCategories = [];
        initializeFilters();
    });

    document.getElementById('filterApply').addEventListener('click', () => {
        closeFiltersModal();
        displayLifehack();
    });
}

// Cargar preferencias almacenadas
function loadPreferences() {
    const savedLanguage = localStorage.getItem('littlehacksLanguage');
    const savedTheme = localStorage.getItem('littlehacksTheme');
    const savedFilters = localStorage.getItem('littlehacksFilters');
    
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        languageSelect.value = savedLanguage;
    }
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
    }

    if (savedFilters) {
        selectedCategories = JSON.parse(savedFilters);
    }
}

// Guardar preferencias
function savePreferences() {
    localStorage.setItem('littlehacksLanguage', currentLanguage);
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('littlehacksTheme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('littlehacksFilters', JSON.stringify(selectedCategories));
}

// Get random lifehack
function getRandomLifehack() {
    let lifehacksArray = lifehacks[currentLanguage] || [];
    
    // Apply filters
    if (selectedCategories.length > 0) {
        lifehacksArray = lifehacksArray.filter(hack => 
            selectedCategories.includes(hack.category)
        );
    }
    
    if (lifehacksArray.length === 0) {
        return { text: 'No hay lifehacks disponibles con este filtro', category: 'N/A' };
    }
    
    return lifehacksArray[Math.floor(Math.random() * lifehacksArray.length)];
}

// Show lifehack
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

// Toggle dark mode
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.querySelector('.theme-icon').textContent = isDarkMode ? '☀️' : '🌙';
    savePreferences();
}

// Open filters modal
function openFiltersModal() {
    filtersModal.classList.add('active');
}

// Close filters
function closeFiltersModal() {
    filtersModal.classList.remove('active');
    savePreferences();
}

// Event Listeners
nextButton.addEventListener('click', displayLifehack);
themeToggle.addEventListener('click', toggleTheme);
languageSelect.addEventListener('change', (e) => {
    changeLanguage(e.target.value);
});

filtersButton.addEventListener('click', openFiltersModal);
filtersClose.addEventListener('click', closeFiltersModal);

// Close modal on click outside
filtersModal.addEventListener('click', (e) => {
    if (e.target === filtersModal) {
        closeFiltersModal();
    }
})

// Inicializar
loadLifehacks();