// Factorial Calculator Functionality
function calculateFactorial() {
    const input = document.getElementById('number').value;
    const resultDiv = document.getElementById('factorial-result');
    const factorialOutput = document.getElementById('factorial-output');
    const methodOutput = document.getElementById('method-output');
    const number = parseInt(input);

    // Clear previous results
    factorialOutput.textContent = '';
    methodOutput.textContent = '';
    resultDiv.classList.remove('error');

    // Validate input
    if (isNaN(number) || number < 0 || !Number.isInteger(number)) {
        resultDiv.classList.add('error');
        factorialOutput.textContent = 'Please enter a valid positive integer.';
        return;
    }

    const iterativeResult = factorialIterative(number);

    // Display results
    factorialOutput.textContent = `Factorial of ${number}: ${iterativeResult}`;
    methodOutput.textContent = `Calculated using Iterative Method`;
}

// Iterative method to calculate factorial
function factorialIterative(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Lightbox Functionality
let images = document.querySelectorAll('.gallery-image');
let lightbox = document.getElementById('lightbox');
let lightboxImage = document.getElementById('lightbox-image');

function openLightbox(index) {
    let selectedImage = images[index];
    lightboxImage.src = selectedImage.src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    lightbox.style.display='none';
}