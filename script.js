// Products data based on the screenshots
const products = [
    {
        id: 1,
        title: "Monograma Corona Floral",
        price: 5.99,
        description: "Una elegante corona floral perfecta para personalizar toallas, almohadas y ropa. Una opción clásica para regalos.",
        category: "florales",
        formats: [".PES", ".DST", ".JEF", ".EXP"]
    },
    {
        id: 2,
        title: "Oso Geométrico",
        price: 4.50,
        description: "Una versión moderna y geométrica de un animal del bosque. Ideal para decoración del hogar contemporánea o ropa con estilo.",
        category: "animales",
        formats: [".PES", ".DST"]
    },
    {
        id: 3,
        title: "Colibrí Acuarela",
        price: 7.00,
        description: "Un hermoso y artístico diseño de colibrí con efecto acuarela. Requiere una cuidadosa mezcla de colores.",
        category: "florales",
        formats: [".PES", ".JEF", ".VP3"]
    },
    {
        id: 4,
        title: "Esquina de Rosa Vintage",
        price: 5.50,
        description: "Un delicado y romántico diseño de rosa, perfecto para añadir un toque de encanto vintage a mantelería y ropa de cama.",
        category: "florales",
        formats: [".DST", ".JEF"]
    },
    {
        id: 5,
        title: "Trío de Dinosaurios Lindos",
        price: 6.50,
        description: "Un divertido y juguetón conjunto de tres dinosaurios de dibujos animados. Genial para ropa de niños, mochilas y decoración de dormitorios.",
        category: "infantiles",
        formats: [".PES", ".DST", ".HUS"]
    },
    {
        id: 6,
        title: "Mandala Abstracto",
        price: 8.99,
        description: "Un complejo y meditativo patrón de mandala. Excelente para grandes paneles traseros en chaquetas o como una pieza de arte enmarcada.",
        category: "abstractos",
        formats: [".PES", ".DST", ".EXP"]
    },
    {
        id: 7,
        title: "Velero al Atardecer",
        price: 5.25,
        description: "Captura la tranquilidad del mar con este sereno diseño de velero. Perfecto para decoración de casas de playa.",
        category: "nauticos",
        formats: [".JEF", ".PES", ".VP3"]
    },
    {
        id: 8,
        title: "Parche Amante del Café",
        price: 3.99,
        description: "¡Pero primero, café! Un diseño peculiar y divertido para los entusiastas del café. Ideal para delantales o toallas de cocina.",
        category: "logos",
        formats: [".DST", ".PES"]
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
    renderProducts(products);
    updateCartCount();
    setupEventListeners();
});

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
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            handleFilter(filter);
        });
    });
    
    // CTA button scroll to products
    ctaBtn.addEventListener('click', function() {
        document.querySelector('.products-section').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Auth functions
function openLoginModal() {
    loginModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openRegisterModal() {
    registerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAuthModals() {
    loginModal.classList.remove('active');
    registerModal.classList.remove('active');
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
        navActions.innerHTML = `
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
        
        // Re-attach cart event listener
        document.getElementById('cartBtn').addEventListener('click', openCart);
        
        // Update global references to new elements
        updateDOMReferences();
        updateCartCount();
    } else {
        // User is not logged in
        navActions.innerHTML = `
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
    
    card.innerHTML = `
        <div class="product-image">
            400 x 400
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <div class="product-price">$${product.price.toFixed(2)}</div>
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
    document.body.style.overflow = 'hidden';
}

// Close cart modal
function closeCartModal() {
    cartModal.classList.remove('active');
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
    const searchTerm = searchInput.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    
    let filteredProducts = products;
    
    // Apply category filter first
    if (activeFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === activeFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    
    renderProducts(filteredProducts);
}

// Handle category filter
function handleFilter(category) {
    const searchTerm = searchInput.value.toLowerCase();
    
    let filteredProducts = products;
    
    // Apply category filter
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
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
    document.body.style.overflow = 'hidden';
}

// Close format selection modal
function closeFormatModal() {
    const formatModal = document.querySelector('.format-modal');
    if (formatModal) {
        formatModal.remove();
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