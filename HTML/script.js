// Initialize Lucide icons
lucide.createIcons();

// Page management
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Reinitialize icons for the new page
    lucide.createIcons();
}

function showLanding() {
    showPage('landing-page');
}

function showAuth() {
    showPage('auth-page');
}

function showMain() {
    showPage('main-page');
}

// Toast notification
function showToast(title, description) {
    const toast = document.getElementById('toast');
    const titleElement = toast.querySelector('.toast-title');
    const descriptionElement = toast.querySelector('.toast-description');
    
    titleElement.textContent = title;
    descriptionElement.textContent = description;
    
    toast.classList.add('show');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Form validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.includes('@gmail.com');
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + '-error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function hideError(fieldId) {
    const errorElement = document.getElementById(fieldId + '-error');
    errorElement.classList.remove('show');
}

function clearAllErrors() {
    document.querySelectorAll('.error-message').forEach(error => {
        error.classList.remove('show');
    });
}

// Auth form handling
function handleAuth(event) {
    event.preventDefault();
    
    // Clear previous errors
    clearAllErrors();
    
    // Get form data
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const country = formData.get('country');
    
    let hasErrors = false;
    
    // Validate email
    if (!email) {
        showError('email', 'Email is required');
        hasErrors = true;
    } else if (!validateEmail(email)) {
        showError('email', 'Please enter a valid Gmail address (must include @gmail.com)');
        hasErrors = true;
    }
    
    // Validate password
    if (!password) {
        showError('password', 'Password is required');
        hasErrors = true;
    }
    
    // Validate country
    if (!country) {
        showError('country', 'Please select your country');
        hasErrors = true;
    }
    
    // If no errors, proceed with "authentication"
    if (!hasErrors) {
        // Show success toast
        showToast('Authentication Successful!', 'Welcome to Massa\'s Melodies.');
        
        // Redirect to main page after a short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Real-time email validation
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value;
            if (email && !validateEmail(email)) {
                showError('email', 'Please enter a valid Gmail address (must include @gmail.com)');
            } else {
                hideError('email');
            }
        });
        
        emailInput.addEventListener('input', function() {
            const email = this.value;
            if (email && validateEmail(email)) {
                hideError('email');
            }
        });
    }
});

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
});

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .music-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click animations to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Show landing page by default
    showLanding();
    
    // Initialize all icons
    lucide.createIcons();
});