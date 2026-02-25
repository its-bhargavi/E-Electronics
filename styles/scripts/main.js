// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('E-Electronics website initializing...');
    
    // Initialize all modules
    setupNavigation();
    setupCart();
    setupAuth();
    loadProducts();
    
    // Set up contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showMessage('Message sent successfully! We will get back to you soon.', 'success');
            this.reset();
        });
    }
    
    // Initial setup
    updateCartDisplay();
    checkAuthStatus();
    
    console.log('E-Electronics website initialized successfully!');
});