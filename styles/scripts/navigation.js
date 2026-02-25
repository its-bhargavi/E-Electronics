// Navigation functionality
function setupNavigation() {
    console.log('Setting up navigation...');
    
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Show specific page and hide others
    window.showPage = function(pageId) {
        console.log('Showing page:', pageId);
        
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            console.log('Page shown successfully');
        } else {
            console.log('Page not found:', pageId);
        }
        
        // Special handling for cart page
        if (pageId === 'cart-page' && window.updateCartDisplay) {
            window.updateCartDisplay();
        }
    };
    
    // Navigation click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page') + '-page';
            console.log('Navigation clicked:', pageId);
            window.showPage(pageId);
        });
    });
    
    // Setup auth navigation
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const toLogin = document.getElementById('to-login');
    const toRegister = document.getElementById('to-register');
    
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.showPage('login-page');
        });
    }
    
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.showPage('register-page');
        });
    }
    
    if (toLogin) {
        toLogin.addEventListener('click', function(e) {
            e.preventDefault();
            window.showPage('login-page');
        });
    }
    
    if (toRegister) {
        toRegister.addEventListener('click', function(e) {
            e.preventDefault();
            window.showPage('register-page');
        });
    }
    
    console.log('Navigation setup complete');
}

// Load products on products page
function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-img"><i class="${product.icon}"></i></div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">₹${product.price.toLocaleString()}</div>
                <div class="product-actions">
                    <button class="btn btn-outline add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <button class="btn buy-now" data-id="${product.id}">Buy Now</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });

    // Add cart functionality to dynamically loaded products
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            if (window.addToCart) {
                window.addToCart(productId);
            }
        });
    });

    document.querySelectorAll('.buy-now').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            if (window.addToCart) {
                window.addToCart(productId);
                window.showPage('cart-page');
            }
        });
    });
}