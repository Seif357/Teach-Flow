// Paths for light and dark mode logos
const lightLogoPath = '../Images/Screenshot_2024-10-14_123802d-removebg-preview.png';
const darkLogoPath = '../Images/output_image-removebg-preview.png';
const lightImgPath = '../Images/left.png';
const darkImgPath = '../Images/left white.png';
const lightheaderLogoPath ="../Images/Screenshot_2024-10-14_123802ddd-removebg-preview.png";
const darkheaderLogoPath = '../Images/output_image.png';

// Ensure all DOM elements are loaded before executing script
document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.container');
    
    // Dark mode toggle button
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    // Apply the saved mode and update the logo and button text accordingly
    if (localStorage.getItem('dark-mode') === 'enabled') {
        enableDarkMode();
    } else {
        updateButtonText(false); // Default to "Dark Mode"
        updateLogo(false); // Use light mode logo by default
        updateheaderLogo(false) 
        updatebackImg(false);
    }
});

// Toggle dark mode and update the UI, logo, and localStorage
function toggleDarkMode() {
    const isEnabled = document.body.classList.toggle('dark-mode');
    updateDarkModeElements(isEnabled);
    updateButtonText(isEnabled);
    updateLogo(isEnabled);
    updateheaderLogo(isEnabled) 
    updatebackImg(isEnabled);
    localStorage.setItem('dark-mode', isEnabled ? 'enabled' : 'disabled');
}

// Enable dark mode on load if previously selected
function enableDarkMode() {
    document.body.classList.add('dark-mode');
    updateDarkModeElements(true);
    updateButtonText(true);
    updateLogo(true);
    updateheaderLogo(true) 
    updatebackImg(true);
}

// Update button text based on the current mode
function updateButtonText(isDarkMode) {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    }
}

// Update the logo with a fade effect
function updateLogo(isDarkMode) {
    const logo = document.getElementById('logo');
    if (logo) {
        logo.classList.add('fade-out'); // Start fade-out animation
        setTimeout(() => {
            logo.src = isDarkMode ? darkLogoPath : lightLogoPath; // Swap logo
            logo.classList.remove('fade-out'); // Remove fade-out animation
        }, 230); // Wait for fade-out animation to complete
    }
}
function updateheaderLogo(isDarkMode) {
    const headerlogo = document.getElementById('TeachFlow text');
    if (headerlogo) {
        headerlogo.classList.add('fade-out'); // Start fade-out animation
        setTimeout(() => {
            headerlogo.src = isDarkMode ? darkheaderLogoPath : lightheaderLogoPath; // Swap logo
            headerlogo.classList.remove('fade-out'); // Remove fade-out animation
        }, 230); // Wait for fade-out animation to complete
    }
}
function updatebackImg(isDarkMode) {
    const backImg = document.getElementById('backimg');
    if (backImg) {
        backImg.classList.add('fade-out'); // Start fade-out animation
        setTimeout(() => {
            backImg.src = isDarkMode ? darkImgPath : lightImgPath; // Swap logo
            backImg.classList.remove('fade-out'); // Remove fade-out animation
        }, 230); // Wait for fade-out animation to complete
    }
}
// Update relevant elements based on the mode
function updateDarkModeElements(enabled) {
    const elements = [
        '.container',
        'h2', 
        'h3',
        '.modal, .modal-content, .login-btn, .register-btn, .new-modal, .new-modal-content, .new-close, .join-btn, .create-btn',
        '#cropModal',
        'cropModal',
        'input', 
        'button', 
        'p', 
        'a', 
        'label', 
        '.signin-message', 
        '.signup-message'
    ];

    elements.forEach(selector => {
        const elList = document.querySelectorAll(selector);
        elList.forEach(el => {
            el.classList.toggle('dark-mode', enabled);
        });
    });
};