// DOM Elements
const homeSection = document.getElementById('home');
const gameStepsSection = document.getElementById('game-steps');
const resultSection = document.getElementById('result');
const aboutSection = document.getElementById('about');

const startBtn = document.getElementById('start-btn');
const playAgainBtn = document.getElementById('play-again-btn');

const stepCards = [
    document.getElementById('step1-card'),
    document.getElementById('step2-card'),
    document.getElementById('step3-card'),
    document.getElementById('step4-card'),
    document.getElementById('step5-card')
];

const stepButtons = [
    document.getElementById('step1-btn'),
    document.getElementById('step2-btn'),
    document.getElementById('step3-btn'),
    document.getElementById('step4-btn'),
    document.getElementById('step5-btn')
];

const stepIndicators = [
    document.getElementById('step-1'),
    document.getElementById('step-2'),
    document.getElementById('step-3'),
    document.getElementById('step-4'),
    document.getElementById('step-5')
];

const finalCalculationInput = document.getElementById('final-calculation');
const monthInput = document.getElementById('month-input');

const revealedAge = document.getElementById('revealed-age');
const revealedMonth = document.getElementById('revealed-month');

// Navigation Links
const navLinks = document.querySelectorAll('.nav-link');

// Game State
let currentStep = 0;
let userFinalNumber = 0;
let userMonth = 0;

// Event Listeners
startBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', resetGame);

// Add event listeners to step buttons
stepButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => nextStep(index));
});

// Add event listeners to navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target.getAttribute('href').substring(1);
        
        // Hide all sections
        homeSection.classList.add('hidden');
        gameStepsSection.classList.add('hidden');
        resultSection.classList.add('hidden');
        aboutSection.classList.add('hidden');
        
        // Show target section
        if (target === 'home') {
            homeSection.classList.remove('hidden');
            homeSection.classList.add('fade-in');
            resetGame();
        } else if (target === 'play') {
            if (currentStep === 0) {
                homeSection.classList.remove('hidden');
                homeSection.classList.add('fade-in');
            } else {
                gameStepsSection.classList.remove('hidden');
                stepCards[currentStep].classList.remove('hidden');
                stepCards[currentStep].classList.add('fade-in');
            }
        } else if (target === 'about') {
            aboutSection.classList.remove('hidden');
            aboutSection.classList.add('fade-in');
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
    });
});

// Functions
function startGame() {
    homeSection.classList.add('hidden');
    gameStepsSection.classList.remove('hidden');
    stepCards[0].classList.remove('hidden');
    stepCards[0].classList.add('fade-in');
    updateStepIndicator(0);
}

function nextStep(stepIndex) {
    // Validate inputs if needed
    if (stepIndex === 3) {
        userFinalNumber = parseInt(finalCalculationInput.value);
        if (isNaN(userFinalNumber) || userFinalNumber < 1) {
            alert('Please enter a valid number');
            return;
        }
    } else if (stepIndex === 4) {
        userMonth = parseInt(monthInput.value);
        if (isNaN(userMonth) || userMonth < 1 || userMonth > 12) {
            alert('Please enter a valid month between 1 and 12');
            return;
        }
        
        // Calculate the age using the magic formula
        const calculatedAge = calculateAge(userFinalNumber, userMonth);
        
        // Reveal the magic
        revealedAge.textContent = calculatedAge;
        revealedMonth.textContent = userMonth;
        
        // Show result section
        gameStepsSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
        resultSection.classList.add('fade-in');
        return;
    }
    
    // Hide current step
    stepCards[stepIndex].classList.add('hidden');
    
    // Show next step
    currentStep = stepIndex + 1;
    stepCards[currentStep].classList.remove('hidden');
    stepCards[currentStep].classList.add('fade-in');
    
    // Update step indicator
    updateStepIndicator(currentStep);
}

function calculateAge(finalNumber, birthMonth) {
    // Magic formula: ((Age × 5 + 8) × 2) = Final Number + Birth Month
    // So: Age = ((Final Number - Birth Month) - 16) ÷ 10
    return Math.round(((finalNumber - birthMonth) - 16) / 10);
}

function updateStepIndicator(step) {
    stepIndicators.forEach((indicator, index) => {
        indicator.classList.remove('active', 'completed');
        
        if (index === step) {
            indicator.classList.add('active');
        } else if (index < step) {
            indicator.classList.add('completed');
        }
    });
}

function resetGame() {
    // Reset game state
    currentStep = 0;
    userFinalNumber = 0;
    userMonth = 0;
    
    // Reset inputs
    finalCalculationInput.value = '';
    monthInput.value = '';
    
    // Reset step indicators
    updateStepIndicator(0);
    
    // Show home section
    resultSection.classList.add('hidden');
    gameStepsSection.classList.add('hidden');
    homeSection.classList.remove('hidden');
    homeSection.classList.add('fade-in');
}

// Initialize the game
updateStepIndicator(0);