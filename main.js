// Base de datos de lifehacks en español e inglés
const lifehacks = {
    es: [
        { text: "Congela las hierbas en hielo para conservarlas más tiempo", category: "Cocina" },
        { text: "Usa vinagre blanco para limpiar microondas sin químicos", category: "Limpieza" },
        { text: "Guarda los plátanos separados para que duren más días", category: "Cocina" },
        { text: "Coloca una cebolla en la habitación para purificar el aire", category: "Salud" },
        { text: "Usa pasta de dientes para limpiar pantallas de dispositivos", category: "Tecnología" },
        { text: "Congela el pan sobrante para tenerlo fresco por semanas", category: "Cocina" },
        { text: "Aplica hielo en los granos para reducir inflamación rápidamente", category: "Salud" },
        { text: "Usa un poco de sal en un vaso con agua para limpiar botellas estrechas", category: "Limpieza" },
        { text: "Guarda las frutas rojas en un recipiente con papel absorbente", category: "Cocina" },
        { text: "Usa bicarbonato de sodio para eliminar olores de nevera", category: "Limpieza" },
        { text: "Toma fotos de documentos importantes con tu teléfono", category: "Productividad" },
        { text: "Usa limón para eliminar manchas de óxido en metal", category: "Limpieza" },
        { text: "Calienta un plato antes de servir comida para mantenerla más caliente", category: "Cocina" },
        { text: "Usa un peine para aplicar rímel más uniformemente", category: "Belleza" },
        { text: "Guarda las verduras cortadas en agua para que se mantengan crujientes", category: "Cocina" },
        { text: "Usa papel film para sellar bolsas de papas abiertas", category: "Cocina" },
        { text: "Coloca una moneda en el congelador para saber si hubo apagón", category: "Hogar" },
        { text: "Usa aceite de coco para desenredar cabello naturalmente", category: "Belleza" },
        { text: "Toma un vaso de agua tibia con miel en la mañana para mejor digestión", category: "Salud" },
        { text: "Usa una banda elástica en la manija de tu puerta para no olvidar nada", category: "Productividad" }
    ],
    en: [
        { text: "Freeze herbs in ice cubes to preserve them longer", category: "Cooking" },
        { text: "Use white vinegar to clean your microwave without chemicals", category: "Cleaning" },
        { text: "Keep bananas separated to make them last longer", category: "Cooking" },
        { text: "Place an onion in your room to help purify the air", category: "Health" },
        { text: "Use toothpaste to clean screens on your devices", category: "Technology" },
        { text: "Freeze leftover bread to keep it fresh for weeks", category: "Cooking" },
        { text: "Apply ice to pimples to reduce swelling quickly", category: "Health" },
        { text: "Use salt in a glass of water to clean narrow bottles", category: "Cleaning" },
        { text: "Store red fruits in a container with paper towels", category: "Cooking" },
        { text: "Use baking soda to eliminate fridge odors", category: "Cleaning" },
        { text: "Take photos of important documents with your phone", category: "Productivity" },
        { text: "Use lemon to remove rust stains from metal", category: "Cleaning" },
        { text: "Heat a plate before serving food to keep it warmer longer", category: "Cooking" },
        { text: "Use a comb to apply mascara more evenly", category: "Beauty" },
        { text: "Keep cut vegetables in water to keep them crispy", category: "Cooking" },
        { text: "Use plastic wrap to seal open bags of chips", category: "Cooking" },
        { text: "Place a coin in the freezer to know if there was a power outage", category: "Home" },
        { text: "Use coconut oil to naturally detangle hair", category: "Beauty" },
        { text: "Drink a glass of warm water with honey in the morning for better digestion", category: "Health" },
        { text: "Use a rubber band on your door handle to remind you not to forget anything", category: "Productivity" }
    ]
};

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
        themeToggle.querySelector('.theme-icon').textContent = '☀️';
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
loadPreferences();
displayLifehack();
