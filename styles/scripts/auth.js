// Authentication functionality
function setupAuth() {
    console.log('Setting up auth...');
    
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegister();
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
}

function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userEmail', user.email);
        
        showMessage('Login successful!', 'success');
        checkAuthStatus();
        
        setTimeout(() => {
            if (window.showPage) {
                window.showPage('home-page');
            }
            document.getElementById('login-form').reset();
        }, 1500);
    } else {
        showMessage('Invalid email or password', 'error');
    }
}

function handleRegister() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    if (!name || !email || !password || !confirmPassword) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('Password must be at least 6 characters long', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
        showMessage('User with this email already exists', 'error');
        return;
    }
    
    const newUser = { name: name, email: email, password: password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    localStorage.setItem('userLoggedIn', 'true');
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    
    showMessage('Registration successful! Welcome to E-Electronics!', 'success');
    checkAuthStatus();
    
    setTimeout(() => {
        if (window.showPage) {
            window.showPage('home-page');
        }
        document.getElementById('register-form').reset();
    }, 1500);
}

function logout() {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    
    showMessage('Logged out successfully', 'success');
    checkAuthStatus();
    if (window.showPage) {
        window.showPage('home-page');
    }
}

function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const userWelcome = document.getElementById('user-welcome');
    const usernameDisplay = document.getElementById('username-display');
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (isLoggedIn) {
        const userName = localStorage.getItem('userName') || 'User';
        if (userWelcome) userWelcome.style.display = 'inline';
        if (usernameDisplay) usernameDisplay.textContent = userName;
        if (loginLink) loginLink.style.display = 'none';
        if (registerLink) registerLink.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline';
    } else {
        if (userWelcome) userWelcome.style.display = 'none';
        if (loginLink) loginLink.style.display = 'inline';
        if (registerLink) registerLink.style.display = 'inline';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
}

window.checkAuthStatus = checkAuthStatus;