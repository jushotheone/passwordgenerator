// Generate Password
function genPassword() {
    const length = document.getElementById('lengthSlider').value;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;
    const pronounceable = document.getElementById('pronounceable').checked;

    let charset = "";
    let password = "";

    if (pronounceable) {
        password = generatePronounceablePassword(length);
    } else {
        if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
        if (includeNumbers) charset += "0123456789";
        if (includeSymbols) charset += "!@#$%^&*()_+";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
    }

    document.getElementById('password').value = password;
    updateStrengthIndicator(password);
    updateHistory(password);
}

// Generate Pronounceable Password
function generatePronounceablePassword(length) {
    const vowels = 'aeiou';
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    let password = '';
    
    for (let i = 0; i < length; i++) {
        password += (i % 2 === 0)
            ? consonants[Math.floor(Math.random() * consonants.length)]
            : vowels[Math.floor(Math.random() * vowels.length)];
    }
    
    return password;
}

// Copy Password to Clipboard with Tooltip Feedback
function copyPassword() {
    const copyText = document.getElementById("password");
    copyText.select();
    copyText.setSelectionRange(0, 9999); // For mobile devices
    document.execCommand("copy");

    // Show the tooltip
    const tooltip = document.getElementById("copy-tooltip");
    tooltip.classList.add("visible");

    // Hide the tooltip after 2 seconds
    setTimeout(() => {
        tooltip.classList.remove("visible");
    }, 2000);
}

// Update Password Strength Indicator
function updateStrengthIndicator(password) {
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    const entropy = calculateEntropy(password);

    let strength = "Weak";
    let strengthColor = "bg-red-500";

    if (entropy > 50) {
        strength = "Strong";
        strengthColor = "bg-green-500";
    } else if (entropy > 30) {
        strength = "Medium";
        strengthColor = "bg-yellow-500";
    }

    // Update strength bar and text
    strengthBar.className = `flex-grow h-2 rounded ${strengthColor}`;
    strengthText.textContent = `Strength: ${strength} (Entropy: ${entropy.toFixed(2)} bits)`;
}

// Calculate Entropy of Password
function calculateEntropy(password) {
    const charsetSize = new Set(password).size;
    return Math.log2(Math.pow(charsetSize, password.length));
}

// Update Password History
function updateHistory(password) {
    const historyList = document.getElementById('password-history');
    const newItem = document.createElement('li');
    newItem.textContent = password;
    historyList.appendChild(newItem);

    // Limit history to last 5 passwords
    if (historyList.childElementCount > 5) {
        historyList.removeChild(historyList.firstChild);
    }
}

// Export Password History
function exportHistory() {
    const historyList = document.getElementById('password-history');
    let csvContent = "data:text/csv;charset=utf-8,";

    Array.from(historyList.children).forEach(item => {
        csvContent += item.textContent + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "password_history.csv");
    document.body.appendChild(link);
    link.click();
}

// Toggle Dark Mode
function toggleDarkMode() {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle("dark");

    // Save user preference in localStorage
    const isDarkMode = htmlElement.classList.contains('dark');
    localStorage.setItem('darkMode', isDarkMode);
}

// Apply the user's theme preference when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const darkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (darkMode) {
        document.documentElement.classList.add('dark');
        document.getElementById('darkModeToggle').checked = true;
    }
});

// Sync Slider with Value Display
document.getElementById('lengthSlider').addEventListener('input', function() {
    document.getElementById('lengthValue').textContent = this.value;
});