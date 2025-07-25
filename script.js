// Products data based on the screenshots
const products = [
    {
        id: 1,
        title: "Monograma Corona Floral",
        price: 5.99,
        description: "Una elegante corona floral perfecta para personalizar toallas, almohadas y ropa. Una opción clásica para regalos.",
        category: "florales",
        type: "individual",
        image: "images/designs/individual/placeholder.svg",
        formats: [".PES", ".DST", ".JEF", ".EXP"]
    },
    {
        id: 2,
        title: "Oso Geométrico",
        price: 4.50,
        description: "Una versión moderna y geométrica de un animal del bosque. Ideal para decoración del hogar contemporánea o ropa con estilo.",
        category: "animales",
        type: "individual",
        image: "images/designs/individual/placeholder.svg",
        formats: [".PES", ".DST"]
    },
    {
        id: 3,
        title: "Colibrí Acuarela",
        price: 7.00,
        description: "Un hermoso y artístico diseño de colibrí con efecto acuarela. Requiere una cuidadosa mezcla de colores.",
        category: "florales",
        type: "individual",
        image: "images/designs/individual/placeholder.svg",
        formats: [".PES", ".JEF", ".VP3"]
    },
    {
        id: 4,
        title: "Esquina de Rosa Vintage",
        price: 5.50,
        description: "Un delicado y romántico diseño de rosa, perfecto para añadir un toque de encanto vintage a mantelería y ropa de cama.",
        category: "florales",
        type: "individual",
        image: "images/designs/individual/placeholder.svg",
        formats: [".DST", ".JEF"]
    },
    {
        id: 5,
        title: "Trío de Dinosaurios Lindos",
        price: 6.50,
        description: "Un divertido y juguetón conjunto de tres dinosaurios de dibujos animados. Genial para ropa de niños, mochilas y decoración de dormitorios.",
        category: "infantiles",
        type: "individual",
        image: "images/designs/individual/placeholder.svg",
        formats: [".PES", ".DST", ".HUS"]
    },
    {
        id: 6,
        title: "Mandala Abstracto",
        price: 8.99,
        description: "Un complejo y meditativo patrón de mandala. Excelente para grandes paneles traseros en chaquetas o como una pieza de arte enmarcada.",
        category: "abstractos",
        type: "individual",
        image: "images/designs/individual/placeholder.svg",
        formats: [".PES", ".DST", ".EXP"]
    },
    {
        id: 7,
        title: "Velero al Atardecer",
        price: 5.25,
        description: "Captura la tranquilidad del mar con este sereno diseño de velero. Perfecto para decoración de casas de playa.",
        category: "nauticos",
        type: "individual",
        image: "images/designs/individual/placeholder.svg",
        formats: [".JEF", ".PES", ".VP3"]
    },
    {
        id: 8,
        title: "Parche Amante del Café",
        price: 3.99,
        description: "¡Pero primero, café! Un diseño peculiar y divertido para los entusiastas del café. Ideal para delantales o toallas de cocina.",
        category: "logos",
        type: "individual",
        image: "images/designs/individual/placeholder.svg",
        formats: [".DST", ".PES"]
    },
    // Packs de diseños
    {
        id: 9,
        title: "Pack Jardín Floral (5 diseños)",
        price: 19.99,
        originalPrice: 29.95,
        description: "Colección completa de 5 diseños florales: rosas, tulipanes, girasoles, margaritas y lirios. Perfecto para proyectos de decoración del hogar.",
        category: "florales",
        type: "pack",
        image: "images/designs/packs/pack-placeholder.svg",
        designCount: 5,
        savings: "33% de descuento",
        formats: [".PES", ".DST", ".JEF", ".EXP", ".VP3"]
    },
    {
        id: 10,
        title: "Pack Safari Infantil (4 diseños)",
        price: 15.99,
        originalPrice: 22.00,
        description: "Adorable colección de animales del safari: león, elefante, jirafa y zebra. Ideal para ropa y accesorios infantiles.",
        category: "infantiles",
        type: "pack",
        image: "images/designs/packs/pack-placeholder.svg",
        designCount: 4,
        savings: "27% de descuento",
        formats: [".PES", ".DST", ".HUS"]
    },
    {
        id: 11,
        title: "Pack Náutico Completo (6 diseños)",
        price: 24.99,
        originalPrice: 36.50,
        description: "Colección marina con ancla, timón, faro, velero, brújula y pez. Perfecto para decoración costera y ropa de verano.",
        category: "nauticos",
        type: "pack",
        image: "images/designs/packs/pack-placeholder.svg",
        designCount: 6,
        savings: "32% de descuento",
        formats: [".JEF", ".PES", ".VP3", ".DST"]
    }
];

// Cart management
let cart = [];

// User management
let currentUser = null;

// Load user data from localStorage
function loadUserData() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        updateUserInterface();
    }
}

// Save user data to localStorage
function saveUserData() {
    if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
        localStorage.removeItem('currentUser');
    }
}

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartBody = document.getElementById('cartBody');
const continueShopping = document.getElementById('continueShopping');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const ctaBtn = document.querySelector('.cta-btn');

// Theme toggle elements
const themeToggle = document.getElementById('themeToggle');

// Preview modal elements
const previewModal = document.getElementById('previewModal');
const closePreview = document.getElementById('closePreview');
const previewImage = document.getElementById('previewImage');
const previewPlaceholder = document.getElementById('previewPlaceholder');
const previewTitle = document.getElementById('previewTitle');
const previewProductTitle = document.getElementById('previewProductTitle');
const previewProductDescription = document.getElementById('previewProductDescription');
const previewPrice = document.getElementById('previewPrice');
const previewFormats = document.getElementById('previewFormats');
const previewAddCart = document.getElementById('previewAddCart');

// Auth elements
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closeLogin = document.getElementById('closeLogin');
const closeRegister = document.getElementById('closeRegister');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    loadTheme();
    renderProducts(products);
    updateCartCount();
    setupEventListeners();
});

// Theme management
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        updateThemeIcon(true);
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
    const icon = themeToggle.querySelector('i');
    if (isDark) {
        icon.className = 'fas fa-sun';
        themeToggle.title = 'Cambiar a tema claro';
    } else {
        icon.className = 'fas fa-moon';
        themeToggle.title = 'Cambiar a tema oscuro';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Cart modal events
    cartBtn.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartModal);
    continueShopping.addEventListener('click', closeCartModal);
    
    // Close modal when clicking outside
    cartModal.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            closeCartModal();
        }
    });
    
    // Auth modal events
    loginBtn.addEventListener('click', openLoginModal);
    registerBtn.addEventListener('click', openRegisterModal);
    closeLogin.addEventListener('click', closeAuthModals);
    closeRegister.addEventListener('click', closeAuthModals);
    showRegister.addEventListener('click', switchToRegister);
    showLogin.addEventListener('click', switchToLogin);
    
    // Auth forms
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
    
    // Close auth modals when clicking outside
    loginModal.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            closeAuthModals();
        }
    });
    
    registerModal.addEventListener('click', function(e) {
        if (e.target === registerModal) {
            closeAuthModals();
        }
    });
    
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterType = this.getAttribute('data-type');
            const filter = this.getAttribute('data-filter');
            
            // Remove active class from buttons of the same type
            if (filterType === 'type') {
                document.querySelectorAll('.type-filters .filter-btn').forEach(b => b.classList.remove('active'));
            } else if (filterType === 'category') {
                document.querySelectorAll('.category-filters .filter-btn').forEach(b => b.classList.remove('active'));
            }
            
            // Add active class to clicked button
            this.classList.add('active');
            
            handleFilter();
        });
    });
    
    // CTA button scroll to products
    ctaBtn.addEventListener('click', function() {
        document.querySelector('.products-section').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Preview modal events
    closePreview.addEventListener('click', closePreviewModal);
    previewModal.addEventListener('click', function(e) {
        if (e.target === previewModal) {
            closePreviewModal();
        }
    });
}

// Auth functions
function openLoginModal() {
    loginModal.classList.add('active');
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
}

function openRegisterModal() {
    registerModal.classList.add('active');
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
}

function closeAuthModals() {
    loginModal.classList.remove('active');
    registerModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    document.body.style.overflow = 'auto';
    clearAuthForms();
}

function switchToRegister(e) {
    e.preventDefault();
    loginModal.classList.remove('active');
    registerModal.classList.add('active');
}

function switchToLogin(e) {
    e.preventDefault();
    registerModal.classList.remove('active');
    loginModal.classList.add('active');
}

function clearAuthForms() {
    loginForm.reset();
    registerForm.reset();
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = { email: user.email, name: user.name };
        saveUserData();
        updateUserInterface();
        closeAuthModals();
        showNotification('¡Bienvenido de vuelta!', 'success');
    } else {
        showNotification('Email o contraseña incorrectos', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirm').value;
    
    if (password !== confirmPassword) {
        showNotification('Las contraseñas no coinciden', 'error');
        return;
    }
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
        showNotification('Este email ya está registrado', 'error');
        return;
    }
    
    // Add new user
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login
    currentUser = { email, name };
    saveUserData();
    updateUserInterface();
    closeAuthModals();
    showNotification('¡Cuenta creada exitosamente!', 'success');
}

function logout() {
    currentUser = null;
    saveUserData();
    updateUserInterface();
    cart = []; // Clear cart on logout
    updateCartCount();
    showNotification('Sesión cerrada', 'info');
}

function updateUserInterface() {
    const navActions = document.querySelector('.nav-actions');
    
    if (currentUser) {
        // User is logged in
        const isDark = document.body.classList.contains('dark-theme');
        const themeIcon = isDark ? 'fas fa-sun' : 'fas fa-moon';
        const themeTitle = isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';
        
        navActions.innerHTML = `
            <button class="theme-toggle" id="themeToggle" title="${themeTitle}">
                <i class="${themeIcon}"></i>
            </button>
            <button class="cart-btn" id="cartBtn">
                <i class="fas fa-shopping-cart"></i>
                <span class="cart-count" id="cartCount">0</span>
            </button>
            <div class="user-info">
                <i class="fas fa-user"></i>
                <span>${currentUser.name}</span>
            </div>
            <button class="logout-btn" onclick="logout()">
                Cerrar Sesión
            </button>
        `;
        
        // Re-attach event listeners
        document.getElementById('themeToggle').addEventListener('click', toggleTheme);
        document.getElementById('cartBtn').addEventListener('click', openCart);
        
        // Update global references to new elements
        updateDOMReferences();
        updateCartCount();
    } else {
        // User is not logged in
        const isDark = document.body.classList.contains('dark-theme');
        const themeIcon = isDark ? 'fas fa-sun' : 'fas fa-moon';
        const themeTitle = isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';
        
        navActions.innerHTML = `
            <button class="theme-toggle" id="themeToggle" title="${themeTitle}">
                <i class="${themeIcon}"></i>
            </button>
            <button class="cart-btn" id="cartBtn">
                <i class="fas fa-shopping-cart"></i>
                <span class="cart-count" id="cartCount">0</span>
            </button>
            <button class="login-btn" id="loginBtn">
                <i class="fas fa-sign-in-alt"></i>
                <span class="login-text">Iniciar Sesión</span>
            </button>
            <button class="register-btn" id="registerBtn">
                Registrarse
            </button>
        `;
        
        // Re-attach event listeners
        document.getElementById('themeToggle').addEventListener('click', toggleTheme);
        document.getElementById('cartBtn').addEventListener('click', openCart);
        document.getElementById('loginBtn').addEventListener('click', openLoginModal);
        document.getElementById('registerBtn').addEventListener('click', openRegisterModal);
        
        // Update global references to new elements
        updateDOMReferences();
        updateCartCount();
    }
}

// Update DOM references after interface recreation
function updateDOMReferences() {
    // Update global variables to point to new elements
    const newCartBtn = document.getElementById('cartBtn');
    const newCartCount = document.getElementById('cartCount');
    
    if (newCartBtn && newCartCount) {
        // Update global references
        window.cartBtn = newCartBtn;
        window.cartCount = newCartCount;
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Render products
function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);
    card.setAttribute('data-type', product.type);
    
    // Crear el contenido específico según el tipo
    const typeIndicator = product.type === 'pack' ? 
        `<div class="pack-indicator">
            <i class="fas fa-layer-group"></i>
            <span>PACK - ${product.designCount} diseños</span>
        </div>` : 
        `<div class="individual-indicator">
            <i class="fas fa-star"></i>
            <span>DISEÑO INDIVIDUAL</span>
        </div>`;
    
    const priceSection = product.type === 'pack' && product.originalPrice ? 
        `<div class="product-price">
            <span class="current-price">$${product.price.toFixed(2)}</span>
            <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
            <span class="savings">${product.savings}</span>
        </div>` :
        `<div class="product-price">$${product.price.toFixed(2)}</div>`;
    
    card.innerHTML = `
        <div class="product-image" onclick="openPreviewModal(${product.id})" style="cursor: pointer;">
            <img src="${product.image}" alt="${product.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="image-placeholder" style="display: none;">
                <i class="fas fa-image"></i>
                <span>Imagen próximamente</span>
            </div>
            ${typeIndicator}
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            ${priceSection}
            <p class="product-description">${product.description}</p>
            <div class="product-formats">
                ${product.formats.map(format => `<span class="format-tag">${format}</span>`).join('')}
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i>
                Añadir al Carrito
            </button>
        </div>
    `;
    
    return card;
}

// Add product to cart
function addToCart(productId) {
    // Check if user is logged in
    if (!currentUser) {
        showNotification('Debes iniciar sesión para agregar productos al carrito', 'error');
        openLoginModal();
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        updateCartCount();
        showAddToCartAnimation();
        showNotification(`${product.title} agregado al carrito`, 'success');
    }
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCart();
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Get current cart count element (in case it was recreated)
    const currentCartCount = document.getElementById('cartCount');
    
    if (currentCartCount) {
        currentCartCount.textContent = totalItems;
        
        if (totalItems > 0) {
            currentCartCount.style.display = 'flex';
        } else {
            currentCartCount.style.display = 'none';
        }
    }
}

// Show add to cart animation
function showAddToCartAnimation() {
    const currentCartBtn = document.getElementById('cartBtn');
    if (currentCartBtn) {
        currentCartBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            currentCartBtn.style.transform = 'scale(1)';
        }, 200);
    }
}

// Open cart modal
function openCart() {
    cartModal.classList.add('active');
    renderCart();
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
}

// Close cart modal
function closeCartModal() {
    cartModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    document.body.style.overflow = 'auto';
}

// Render cart contents
function renderCart() {
    if (cart.length === 0) {
        cartBody.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h4>Tu carrito está vacío</h4>
                <p>Añade algunos diseños bonitos para empezar.</p>
                <button class="continue-shopping" onclick="closeCartModal()">Seguir Comprando</button>
            </div>
        `;
    } else {
        const cartItems = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        cartBody.innerHTML = `
            <div class="cart-items">
                ${cartItems}
            </div>
            <div class="cart-total">
                <div class="cart-total-amount">Total: $${total.toFixed(2)}</div>
                <div class="format-selection-cart">
                    <h4 style="margin: 20px 0 15px 0; color: #333; font-size: 1.1rem;">Seleccionar formato de archivo:</h4>
                    <div class="format-options-cart">
                        <label class="format-option-cart">
                            <input type="radio" name="cartFileFormat" value=".PES" checked>
                            <span><strong>.PES</strong> - Brother, Babylock, Bernina</span>
                        </label>
                        <label class="format-option-cart">
                            <input type="radio" name="cartFileFormat" value=".DST">
                            <span><strong>.DST</strong> - Tajima, Barudan (Universal)</span>
                        </label>
                        <label class="format-option-cart">
                            <input type="radio" name="cartFileFormat" value=".JEF">
                            <span><strong>.JEF</strong> - Janome, Elna, Kenmore</span>
                        </label>
                        <label class="format-option-cart">
                            <input type="radio" name="cartFileFormat" value=".EXP">
                            <span><strong>.EXP</strong> - Melco, Bernina</span>
                        </label>
                        <label class="format-option-cart">
                            <input type="radio" name="cartFileFormat" value=".VP3">
                            <span><strong>.VP3</strong> - Husqvarna Viking</span>
                        </label>
                        <label class="format-option-cart">
                            <input type="radio" name="cartFileFormat" value=".HUS">
                            <span><strong>.HUS</strong> - Husqvarna Viking (Legacy)</span>
                        </label>
                    </div>
                </div>
                <div class="checkout-info">
                    <p style="font-size: 0.9rem; color: #666; margin: 15px 0; text-align: center; line-height: 1.4;">
                        💡 <strong>Proceso de compra:</strong><br>
                        Al proceder al pago, se te redirigirá a WhatsApp donde podrás confirmar tu pedido y recibir los archivos de bordado una vez completado el pago.
                    </p>
                </div>
                <button class="continue-shopping" style="margin-top: 10px; width: 100%;" onclick="proceedToCheckoutFromCart()">
                    <i class="fab fa-whatsapp"></i> Proceder al Pago
                </button>
            </div>
        `;
    }
}

// Handle search
function handleSearch() {
    handleFilter();
}

// Handle filters
function handleFilter() {
    const searchTerm = searchInput.value.toLowerCase();
    
    // Get active filters
    const activeTypeFilter = document.querySelector('.type-filters .filter-btn.active')?.getAttribute('data-filter') || 'all';
    const activeCategoryFilter = document.querySelector('.category-filters .filter-btn.active')?.getAttribute('data-filter') || 'all';
    
    let filteredProducts = products;
    
    // Apply type filter
    if (activeTypeFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.type === activeTypeFilter);
    }
    
    // Apply category filter
    if (activeCategoryFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === activeCategoryFilter);
    }
    
    // Apply search filter if exists
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    
    renderProducts(filteredProducts);
}

// Function to request custom quote
function requestCustomQuote() {
    const message = `¡Hola! Me interesa solicitar una cotización para un diseño de bordado personalizado.\n\nPor favor, me gustaría conocer:\n• Precios para diseños personalizados\n• Tiempo de entrega\n• Proceso de trabajo\n• Formatos disponibles\n\n¡Espero su respuesta para comenzar con mi proyecto!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '+595982906362';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
    showNotification('Redirigiendo a WhatsApp para cotización personalizada...', 'info');
}

// Smooth scrolling for navigation
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation to product cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe product cards when they're created
    const originalRenderProducts = renderProducts;
    renderProducts = function(productsToRender) {
        originalRenderProducts(productsToRender);
        
        // Add animation to new cards
        const cards = document.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';
            card.style.transitionDelay = `${index * 0.1}s`;
            
            observer.observe(card);
        });
    };
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close cart with Escape key
    if (e.key === 'Escape' && cartModal.classList.contains('active')) {
        closeCartModal();
    }
    
    // Focus search with Ctrl+F or Cmd+F
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        searchInput.focus();
    }
});

// Add touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

cartModal.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

cartModal.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeDistance = touchStartY - touchEndY;
    
    // Close cart on swipe down
    if (swipeDistance < -100) {
        closeCartModal();
    }
}

// Show format selection modal
function showFormatSelection() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío', 'error');
        return;
    }
    
    // Create format selection modal
    const formatModal = document.createElement('div');
    formatModal.className = 'format-modal';
    formatModal.innerHTML = `
        <div class="format-content">
            <div class="format-header">
                <h3>Seleccionar Formato de Archivo</h3>
                <button class="close-format" onclick="closeFormatModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="format-body">
                <p>Selecciona el formato en el que deseas recibir tus archivos de bordado:</p>
                <div class="format-options">
                    <label class="format-option">
                        <input type="radio" name="fileFormat" value=".PES" checked>
                        <span class="format-label">
                            <strong>.PES</strong> - Brother, Babylock, Bernina, Deco
                        </span>
                    </label>
                    <label class="format-option">
                        <input type="radio" name="fileFormat" value=".DST">
                        <span class="format-label">
                            <strong>.DST</strong> - Tajima, Barudan (Universal)
                        </span>
                    </label>
                    <label class="format-option">
                        <input type="radio" name="fileFormat" value=".JEF">
                        <span class="format-label">
                            <strong>.JEF</strong> - Janome, Elna, Kenmore
                        </span>
                    </label>
                    <label class="format-option">
                        <input type="radio" name="fileFormat" value=".EXP">
                        <span class="format-label">
                            <strong>.EXP</strong> - Melco, Bernina
                        </span>
                    </label>
                    <label class="format-option">
                        <input type="radio" name="fileFormat" value=".VP3">
                        <span class="format-label">
                            <strong>.VP3</strong> - Husqvarna Viking
                        </span>
                    </label>
                    <label class="format-option">
                        <input type="radio" name="fileFormat" value=".HUS">
                        <span class="format-label">
                            <strong>.HUS</strong> - Husqvarna Viking (Legacy)
                        </span>
                    </label>
                </div>
                <button class="proceed-btn" onclick="proceedToCheckout()">Continuar al WhatsApp</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(formatModal);
    formatModal.classList.add('active');
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
}

// Close format selection modal
function closeFormatModal() {
    const formatModal = document.querySelector('.format-modal');
    if (formatModal) {
        formatModal.remove();
        document.body.classList.remove('modal-open');
        document.body.style.overflow = 'auto';
    }
}

// Función para proceder al checkout desde el carrito
function proceedToCheckoutFromCart() {
    const selectedFormat = document.querySelector('input[name="cartFileFormat"]:checked')?.value || '.PES';
    proceedToCheckout(selectedFormat);
}

// Checkout function
function proceedToCheckout(selectedFormat = '.PES') {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío', 'error');
        return;
    }
    
    // Create WhatsApp message
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let message = `¡Hola! Me interesa comprar los siguientes diseños de bordado:\n\n`;
    
    cart.forEach(item => {
        message += `• ${item.title} - $${item.price.toFixed(2)} x ${item.quantity}\n`;
    });
    
    message += `\n*Formato solicitado: ${selectedFormat}*\n`;
    message += `*Total: $${total.toFixed(2)}*\n\n`;
    message += `Cliente: ${currentUser.name}\n`;
    message += `Email: ${currentUser.email}\n\n`;
    message += `¿Podrías confirmar la disponibilidad y el proceso de pago?`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Replace with your actual WhatsApp number (without + and spaces)
    const whatsappNumber = '+595982906362'; // CAMBIAR POR TU NÚMERO
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Close format modal
    closeFormatModal();
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Show confirmation
    showNotification('Redirigiendo a WhatsApp...', 'info');
    
    // Optionally clear cart after checkout
    setTimeout(() => {
        if (confirm('¿Deseas vaciar el carrito después de enviar el mensaje?')) {
            cart = [];
            updateCartCount();
            closeCartModal();
        }
    }, 2000);
}

// Performance optimization: Debounce search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to search
const debouncedSearch = debounce(handleSearch, 300);
searchInput.addEventListener('input', debouncedSearch);

// Preview Modal Functions
function openPreviewModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('previewModal');
    const modalImage = document.getElementById('previewImage');
    const modalPlaceholder = document.getElementById('previewPlaceholder');
    const modalTitle = document.getElementById('previewTitle');
    const modalPrice = document.getElementById('previewPrice');
    const modalFormats = document.getElementById('previewFormats');
    
    // Update modal content with enhanced details
    modalTitle.textContent = product.title;
    document.getElementById('previewProductTitle').textContent = product.title;
    document.getElementById('previewProductDescription').textContent = product.description;
    modalPrice.textContent = `$${product.price.toFixed(2)}`;
    modalFormats.textContent = product.formats ? product.formats.join(', ') : 'PES, DST, JEF, EXP, VP3, HUS';
    
    // Create unique preview content for each design
    const previewDetails = getUniquePreviewContent(product);
    document.getElementById('previewProductDescription').innerHTML = `
        <p>${product.description}</p>
        <div class="preview-details">
            <h4>Detalles del Diseño:</h4>
            <ul>
                <li><strong>Dimensiones:</strong> ${previewDetails.dimensions}</li>
                <li><strong>Puntadas:</strong> ${previewDetails.stitches}</li>
                <li><strong>Colores:</strong> ${previewDetails.colors}</li>
            </ul>
        </div>
    `;
    
    // Handle image loading
    modalImage.src = product.image;
    modalImage.onload = function() {
        modalImage.style.display = 'block';
        modalPlaceholder.style.display = 'none';
    };
    modalImage.onerror = function() {
        modalImage.style.display = 'none';
        modalPlaceholder.style.display = 'flex';
    };
    
    // Update add to cart button - ensure it exists before assigning
    const addToCartBtn = document.getElementById('previewAddCart');
    if (addToCartBtn) {
        addToCartBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product.id);
            closePreviewModal();
        };
    }
    
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
}

function getUniquePreviewContent(product) {
    // Generate unique details based on product characteristics
    const baseDetails = {
        dimensions: ['10x10 cm', '15x15 cm', '20x20 cm', '12x18 cm', '8x12 cm'],
        stitches: ['2,500-3,000', '3,500-4,200', '5,000-6,500', '1,800-2,400', '4,000-5,200'],
        colors: ['3-4 colores', '5-6 colores', '2-3 colores', '4-5 colores', '6-8 colores']
    };
    
    // Use product ID to generate consistent but unique details
    const index = product.id % baseDetails.dimensions.length;
    
    return {
        dimensions: baseDetails.dimensions[index],
        stitches: baseDetails.stitches[index],
        colors: baseDetails.colors[index]
    };
}

function closePreviewModal() {
    const modal = document.getElementById('previewModal');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.body.style.overflow = 'auto';
}