# Littlehacks - Guía de Uso y Desarrollo

## 🚀 Inicio Rápido

### Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 📝 Cómo Agregar Nuevos Lifehacks

### Estructura de un Lifehack

Cada lifehack tiene dos propiedades:
- **text**: El contenido del lifehack (string)
- **category**: La categoría a la que pertenece (string)

### Paso a Paso

1. **Abre el archivo `main.js`**

2. **Localiza la sección de la base de datos:**
   ```javascript
   const lifehacks = {
       es: [
           // Lifehacks en español aquí
       ],
       en: [
           // Lifehacks en inglés aquí
       ]
   }
   ```

3. **Agrega un nuevo lifehack:**
   
   Para **español**, añade una línea en el array `es`:
   ```javascript
   { text: "Tu nuevo lifehack aquí", category: "Categoría" },
   ```

   Para **inglés**, añade una línea en el array `en`:
   ```javascript
   { text: "Your new lifehack here", category: "Category" },
   ```

### Ejemplo Práctico

**Antes:**
```javascript
es: [
    { text: "Congela las hierbas en hielo para conservarlas más tiempo", category: "Cocina" },
    { text: "Usa vinagre blanco para limpiar microondas sin químicos", category: "Limpieza" },
]
```

**Después (agregando un nuevo lifehack):**
```javascript
es: [
    { text: "Congela las hierbas en hielo para conservarlas más tiempo", category: "Cocina" },
    { text: "Usa vinagre blanco para limpiar microondas sin químicos", category: "Limpieza" },
    { text: "Pone un trozo de pan duro con el arroz para mantenerlo suelto", category: "Cocina" },
]
```

---

## 🎨 Características Implementadas

✅ **Lifehack Aleatorio**: Muestra un lifehack diferente cada vez que presionas el botón
✅ **Categorías**: Cada lifehack tiene una categoría mostrada en una píldora encima del texto
✅ **Diseño Minimalista**: Interfaz limpia y moderna con mucho espacio en blanco
✅ **Modo Oscuro**: Switch en la esquina superior derecha
✅ **Multiidioma**: Cambio entre Español e Inglés
✅ **Botón Flotante**: Ubicado en la parte baja central para generar nuevo lifehack
✅ **Publicidad Monetag**: Integrada en la página
✅ **Almacenamiento Local**: Guarda preferencias de idioma y tema

---

## 🏗️ Estructura de Carpetas

```
Littlehacks/
├── index.html        # HTML principal
├── style.css         # Estilos minimalistas
├── main.js           # Lógica de la aplicación
├── vite.config.js    # Configuración de Vite
├── package.json      # Dependencias del proyecto
└── README.md         # Esta guía
```

---

## 🎯 Categorías Disponibles (Ejemplos)

Puedes usar cualquier categoría que desees. Aquí hay algunas sugerencias:

- **Cocina**: Tips para la cocina
- **Limpieza**: Consejos de limpieza
- **Salud**: Trucos para la salud
- **Belleza**: Tips de belleza
- **Tecnología**: Hacks tecnológicos
- **Hogar**: Consejos para el hogar
- **Productividad**: Tips de productividad

---

## 🔧 Personalización

### Cambiar Colores

Edita las variables CSS en `style.css`:
```css
:root {
    --bg-color: #ffffff;
    --text-color: #1a1a1a;
    --accent-color: #6366f1;
    --accent-hover: #4f46e5;
}
```

### Cambiar Fuente

En `style.css`, modifica:
```css
body {
    font-family: 'Tu fuente aquí';
}
```

---

## 📱 Responsive

El sitio es completamente responsive y funciona en:
- Escritorio (1920px+)
- Tablet (768px - 1024px)
- Mobile (hasta 480px)

---

## 🔗 Integración de Monetag

La publicidad de Monetag está integrada automáticamente. Para personalizarla, edita el `index.html` y añade tu ID de Monetag al script.

---

## 💾 Almacenamiento Local

La aplicación guarda automáticamente:
- Idioma preferido
- Preferencia de tema (claro/oscuro)

Estos datos se guardan en `localStorage` del navegador.

---

## 🚀 Deploy

Para desplegar en producción:

1. Ejecuta: `npm run build`
2. Sube la carpeta `dist` a tu servidor web

---

**¡Listo! Ahora puedes agregar todos los lifehacks que desees. 🎉**
