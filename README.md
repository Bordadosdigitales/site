# 🧵 Bordados Digitales RS

Una tienda online moderna y responsive para venta de diseños de bordado digital, optimizada para GitHub Pages.

## ✨ Características

- **🎨 Diseño moderno**: Interfaz limpia y atractiva con gradientes azules
- **📱 Responsive**: Funciona perfectamente en móviles, tablets y desktop
- **🔐 Sistema de autenticación**: Registro e inicio de sesión usando localStorage
- **🛒 Carrito de compras**: Gestión completa de productos
- **🔍 Búsqueda y filtros**: Encuentra diseños por categoría o texto
- **💬 Integración WhatsApp**: Checkout directo a WhatsApp para procesar pedidos
- **⚡ Sin base de datos**: Funciona completamente en el frontend

## 🚀 Despliegue en GitHub Pages

### Paso 1: Subir a GitHub

1. Crea un nuevo repositorio en GitHub
2. Sube todos los archivos de este proyecto:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`

### Paso 2: Configurar GitHub Pages

1. Ve a **Settings** de tu repositorio
2. Scroll hasta **Pages** en el menú lateral
3. En **Source**, selecciona **Deploy from a branch**
4. Selecciona **main** branch y **/ (root)**
5. Haz clic en **Save**

### Paso 3: Configurar WhatsApp

1. Abre el archivo `script.js`
2. Busca la línea:
   ```javascript
   const whatsappNumber = '1234567890'; // CAMBIAR POR TU NÚMERO
   ```
3. Reemplaza `1234567890` con tu número de WhatsApp (sin + ni espacios)
   - Ejemplo: Si tu número es +1 234 567 8900, usa `12345678900`

### Paso 4: Personalizar productos

En `script.js`, modifica el array `products` para agregar tus propios diseños:

```javascript
const products = [
    {
        id: 1,
        title: "Tu Diseño",
        price: 5.99,
        description: "Descripción de tu diseño",
        category: "florales", // florales, animales, infantiles, abstractos, nauticos, logos
        formats: [".PES", ".DST", ".JEF"] // Formatos disponibles
    },
    // Agregar más productos...
];
```

## 🛠️ Funcionalidades

### Sistema de Usuarios
- **Registro**: Los usuarios pueden crear cuentas
- **Login**: Inicio de sesión persistente
- **Datos locales**: Toda la información se guarda en localStorage del navegador

### Carrito de Compras
- **Autenticación requerida**: Solo usuarios logueados pueden agregar productos
- **Gestión completa**: Agregar, eliminar, ver total
- **Checkout a WhatsApp**: Envía automáticamente el pedido por WhatsApp

### Búsqueda y Filtros
- **Filtros por categoría**: Florales, Animales, Infantiles, etc.
- **Búsqueda en tiempo real**: Por nombre o descripción
- **Combinación**: Filtros y búsqueda funcionan juntos

## 📱 Proceso de Compra

1. **Usuario se registra/inicia sesión**
2. **Navega y filtra productos**
3. **Agrega diseños al carrito**
4. **Procede al checkout**
5. **Se abre WhatsApp con el pedido pre-formateado**
6. **Confirma el pedido por WhatsApp**
7. **Recibe los archivos después del pago**

## 🎨 Personalización

### Colores
Modifica las variables CSS en `styles.css`:
```css
:root {
    --primary-color: #4a90e2;
    --secondary-color: #357abd;
    --accent-color: #667eea;
}
```

### Logo y Branding
- Cambia el texto del logo en `index.html`
- Modifica el título y descripción del hero
- Actualiza el footer con tu información

## 📂 Estructura de Archivos

```
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidad JavaScript
└── README.md           # Este archivo
```

## 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con Flexbox y Grid
- **JavaScript ES6+**: Funcionalidad interactiva
- **Font Awesome**: Iconos
- **localStorage**: Persistencia de datos
- **WhatsApp API**: Integración de checkout

## 📞 Soporte

Si necesitas ayuda con la configuración o personalización, puedes:

1. Revisar este README
2. Verificar que el número de WhatsApp esté configurado correctamente
3. Asegurarte de que GitHub Pages esté habilitado

## 🚀 Próximas Mejoras

- [ ] Integración con pasarelas de pago
- [ ] Sistema de cupones de descuento
- [ ] Galería de imágenes para productos
- [ ] Panel de administración
- [ ] Analytics de ventas

---

**¡Tu tienda de bordados digitales está lista para funcionar! 🎉**