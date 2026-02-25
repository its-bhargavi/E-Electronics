// Global configuration and products data
const products = [
    {
        id: 1,
        name: "Smartphone",
        price: 24999,
        icon: "fas fa-mobile-alt",
        description: "Latest smartphone with advanced features"
    },
    {
        id: 2,
        name: "Headphones",
        price: 2999,
        icon: "fas fa-headphones",
        description: "High-quality noise-cancelling headphones"
    },
    {
        id: 3,
        name: "Laptop",
        price: 64999,
        icon: "fas fa-laptop",
        description: "Powerful laptop for work and gaming"
    },
    {
        id: 4,
        name: "Smart Watch",
        price: 8999,
        icon: "fas fa-clock",
        description: "Feature-rich smartwatch with health monitoring"
    },
    {
        id: 5,
        name: "Camera",
        price: 45999,
        icon: "fas fa-camera",
        description: "Professional DSLR camera"
    },
    {
        id: 6,
        name: "Gaming Console",
        price: 34999,
        icon: "fas fa-gamepad",
        description: "Next-gen gaming console"
    }
];

// Global cart variable
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Utility function to show messages
function showMessage(message, type) {
    const messageEl = document.getElementById('message');
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.className = `message ${type}`;
        messageEl.style.display = 'block';
        
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 3000);
    }
}