// Italian Family Quiz Game
// A comprehensive educational tool for learning Italian family vocabulary

// Game state variables
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 0;
let questions = [];
let shuffledQuestions = [];
let gameDifficulty = "easy"; // easy, medium, hard
let userAnswers = []; // Track user answers for results

// DOM Elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const quitBtn = document.getElementById('quit-btn');
const restartBtn = document.getElementById('restart-btn');
const menuBtn = document.getElementById('menu-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedback = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const hintBtn = document.getElementById('hint-btn');
const hintModal = document.getElementById('hint-modal');
const closeHint = document.getElementById('close-hint');
const hintContent = document.getElementById('hint-content');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');
const finalScore = document.getElementById('final-score');
const finalTotal = document.getElementById('final-total');
const correctCount = document.getElementById('correct-count');
const incorrectCount = document.getElementById('incorrect-count');
const accuracy = document.getElementById('accuracy');
const resultMessage = document.getElementById('result-message');
const resultEmoji = document.getElementById('result-emoji');
const copyResultBtn = document.getElementById('copy-result');

// Italian family vocabulary dataset
// Each question includes a description in Italian and 4 answer options
const questionDatabase = [
    // Basic family members
    {
        id: 1,
        question_it: "È la madre di mio padre.",
        correct_it: "nonna",
        options_it: ["madre", "nonna", "zia", "sorella"],
        hint: "Это мать моего отца. В русском это 'бабушка'."
    },
    {
        id: 2,
        question_it: "È il padre di mia madre.",
        correct_it: "nonno",
        options_it: ["padre", "nonno", "zio", "fratello"],
        hint: "Это отец моей матери. В русском это 'дедушка'."
    },
    {
        id: 3,
        question_it: "È la sorella di mio padre.",
        correct_it: "zia",
        options_it: ["zia", "cugina", "sorella", "madre"],
        hint: "Это сестра моего отца. В русском это 'тётя'."
    },
    {
        id: 4,
        question_it: "È il fratello di mia madre.",
        correct_it: "zio",
        options_it: ["zio", "cugino", "fratello", "padre"],
        hint: "Это брат моей матери. В русском это 'дядя'."
    },
    {
        id: 5,
        question_it: "È la figlia di mio zio.",
        correct_it: "cugina",
        options_it: ["cugina", "sorella", "figlia", "nipote"],
        hint: "Это дочь моего дяди. В русском это 'двоюродная сестра'."
    },
    {
        id: 6,
        question_it: "È il figlio di mia zia.",
        correct_it: "cugino",
        options_it: ["cugino", "fratello", "figlio", "nipote"],
        hint: "Это сын моей тёти. В русском это 'двоюродный брат'."
    },
    {
        id: 7,
        question_it: "È la figlia dei miei genitori.",
        correct_it: "sorella",
        options_it: ["sorella", "figlia", "cugina", "nipote"],
        hint: "Это дочь моих родителей. В русском это 'сестра'."
    },
    {
        id: 8,
        question_it: "È il figlio dei miei genitori.",
        correct_it: "fratello",
        options_it: ["fratello", "figlio", "cugino", "nipote"],
        hint: "Это сын моих родителей. В русском это 'брат'."
    },
    {
        id: 9,
        question_it: "È la madre di mia figlia.",
        correct_it: "moglie",
        options_it: ["moglie", "madre", "suocera", "cognata"],
        hint: "Это мать моей дочери. Если я мужчина, то это моя 'жена'."
    },
    {
        id: 10,
        question_it: "È il padre di mio figlio.",
        correct_it: "marito",
        options_it: ["marito", "padre", "suocero", "cognato"],
        hint: "Это отец моего сына. Если я женщина, то это мой 'муж'."
    },
    
    // Extended family
    {
        id: 11,
        question_it: "È la madre di mia moglie.",
        correct_it: "suocera",
        options_it: ["suocera", "nonna", "madre", "zia"],
        hint: "Это мать моей жены. В русском это 'свекровь' или 'тёща'."
    },
    {
        id: 12,
        question_it: "È il padre di mio marito.",
        correct_it: "suocero",
        options_it: ["suocero", "nonno", "padre", "zio"],
        hint: "Это отец моего мужа. В русском это 'свёкор' или 'тесть'."
    },
    {
        id: 13,
        question_it: "È la sorella di mio marito.",
        correct_it: "cognata",
        options_it: ["cognata", "sorella", "cugina", "zia"],
        hint: "Это сестра моего мужа. В русском это 'золовка' или 'невестка'."
    },
    {
        id: 14,
        question_it: "È il fratello di mia moglie.",
        correct_it: "cognato",
        options_it: ["cognato", "fratello", "cugino", "zio"],
        hint: "Это брат моей жены. В русском это 'деверь' или 'шурин'."
    },
    {
        id: 15,
        question_it: "È la moglie di mio figlio.",
        correct_it: "nuora",
        options_it: ["nuora", "moglie", "figlia", "cognata"],
        hint: "Это жена моего сына. В русском это 'невестка'."
    },
    {
        id: 16,
        question_it: "È il marito di mia figlia.",
        correct_it: "genero",
        options_it: ["genero", "marito", "figlio", "cognato"],
        hint: "Это муж моей дочери. В русском это 'зять'."
    },
    
    // Tricky cases with "nipote"
    {
        id: 17,
        question_it: "È il figlio di mio figlio.",
        correct_it: "nipote",
        options_it: ["nipote", "figlio", "cugino", "fratello"],
        hint: "Это сын моего сына. В русском это 'внук'. 'Nipote' может означать и внука, и племянника."
    },
    {
        id: 18,
        question_it: "È la figlia di mia sorella.",
        correct_it: "nipote",
        options_it: ["nipote", "figlia", "cugina", "sorella"],
        hint: "Это дочь моей сестры. В русском это 'племянница'. 'Nipote' может означать и племянницу, и внучку."
    },
    {
        id: 19,
        question_it: "È il figlio di mio fratello.",
        correct_it: "nipote",
        options_it: ["nipote", "figlio", "cugino", "fratello"],
        hint: "Это сын моего брата. В русском это 'племянник'. Обратите внимание, что 'nipote' используется для обоих полов."
    },
    {
        id: 20,
        question_it: "È la figlia di mia figlia.",
        correct_it: "nipote",
        options_it: ["nipote", "figlia", "cugina", "sorella"],
        hint: "Это дочь моей дочери. В русском это 'внучка'. В итальянском 'nipote' используется для внуков обоих полов."
    },
    
    // Additional questions for more variety
    {
        id: 21,
        question_it: "È la madre di mia madre.",
        correct_it: "nonna",
        options_it: ["nonna", "zia", "madre", "suocera"],
        hint: "Это мать моей матери. В русском это 'бабушка'."
    },
    {
        id: 22,
        question_it: "È la moglie di mio fratello.",
        correct_it: "cognata",
        options_it: ["cognata", "sorella", "moglie", "nuora"],
        hint: "Это жена моего брата. В русском это 'невестка' или 'сноха'."
    },
    {
        id: 23,
        question_it: "È il marito di mia sorella.",
        correct_it: "cognato",
        options_it: ["cognato", "fratello", "marito", "genero"],
        hint: "Это муж моей сестры. В русском это 'зять' или 'шурин'."
    },
    {
        id: 24,
        question_it: "È il padre di mio padre.",
        correct_it: "nonno",
        options_it: ["nonno", "zio", "padre", "suocero"],
        hint: "Это отец моего отца. В русском это 'дедушка'."
    }
];

// Initialize the game
function initGame() {
    // Set up event listeners
    startBtn.addEventListener('click', startGame);
    nextBtn.addEventListener('click', nextQuestion);
    quitBtn.addEventListener('click', goToMenu);
    restartBtn.addEventListener('click', restartGame);
    menuBtn.addEventListener('click', goToMenu);
    hintBtn.addEventListener('click', showHint);
    closeHint.addEventListener('click', closeHintModal);
    copyResultBtn.addEventListener('click', copyResultToClipboard);
    
    // Set up difficulty buttons
    difficultyButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            difficultyButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Set game difficulty
            gameDifficulty = button.getAttribute('data-difficulty');
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === hintModal) {
            closeHintModal();
        }
    });
    
    // Initialize with easy difficulty
    document.querySelector('[data-difficulty="easy"]').classList.add('active');
    gameDifficulty = "easy";
    
    console.log("Italian Family Quiz initialized successfully!");
}

// Start the game
function startGame() {
    // Reset game state
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    
    // Prepare questions based on difficulty
    prepareQuestions();
    
    // Update UI
    scoreElement.textContent = score;
    totalQuestionsElement.textContent = totalQuestions;
    finalTotal.textContent = totalQuestions;
    
    // Show game screen, hide others
    startScreen.classList.remove('active');
    gameScreen.classList.add('active');
    resultScreen.classList.remove('active');
    
    // Display first question
    displayQuestion();
}

// Prepare questions based on selected difficulty
function prepareQuestions() {
    // Create a copy of the question database
    let availableQuestions = [...questionDatabase];
    
    // Shuffle the questions
    availableQuestions = shuffleArray(availableQuestions);
    
    // Select number of questions based on difficulty
    if (gameDifficulty === "easy") {
        totalQuestions = 10;
    } else if (gameDifficulty === "medium") {
        totalQuestions = 15;
    } else {
        totalQuestions = 20;
    }
    
    // Take the first N questions
    shuffledQuestions = availableQuestions.slice(0, totalQuestions);
    
    console.log(`Game started with ${totalQuestions} questions (difficulty: ${gameDifficulty})`);
}

// Display the current question
function displayQuestion() {
    // Get current question
    const question = shuffledQuestions[currentQuestionIndex];
    
    // Update question text
    questionText.textContent = question.question_it;
    
    // Clear options container
    optionsContainer.innerHTML = '';
    
    // Shuffle answer options
    const shuffledOptions = shuffleArray([...question.options_it]);
    
    // Create option buttons
    shuffledOptions.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.className = 'option-btn';
        optionButton.innerHTML = `
            <span class="option-number">${index + 1}</span>
            ${option}
        `;
        
        // Add event listener
        optionButton.addEventListener('click', () => selectAnswer(option, question.correct_it, optionButton));
        
        // Add to container
        optionsContainer.appendChild(optionButton);
    });
    
    // Reset feedback and next button
    feedback.style.display = 'none';
    feedback.className = 'feedback';
    nextBtn.disabled = true;
    
    // Update progress
    updateProgress();
}

// Handle answer selection
function selectAnswer(selectedAnswer, correctAnswer, buttonElement) {
    // Disable all option buttons
    const allOptions = document.querySelectorAll('.option-btn');
    allOptions.forEach(option => {
        option.disabled = true;
        
        // Highlight correct answer
        if (option.textContent.includes(correctAnswer)) {
            option.classList.add('correct');
        }
    });
    
    // Check if answer is correct
    const isCorrect = selectedAnswer === correctAnswer;
    
    // Highlight selected answer
    if (isCorrect) {
        buttonElement.classList.add('correct');
        score++;
        scoreElement.textContent = score;
        
        // Show correct feedback
        feedback.innerHTML = `
            <div class="feedback-content">
                <i class="fas fa-check-circle"></i>
                <span>Правильно! Это действительно "${correctAnswer}".</span>
            </div>
        `;
        feedback.className = 'feedback correct';
    } else {
        buttonElement.classList.add('incorrect');
        
        // Show incorrect feedback
        feedback.innerHTML = `
            <div class="feedback-content">
                <i class="fas fa-times-circle"></i>
                <span>Неправильно. Правильный ответ: "${correctAnswer}".</span>
            </div>
        `;
        feedback.className = 'feedback incorrect';
    }
    
    // Store user answer for results
    userAnswers.push({
        question: shuffledQuestions[currentQuestionIndex].question_it,
        userAnswer: selectedAnswer,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect
    });
    
    // Show feedback
    feedback.style.display = 'block';
    
    // Enable next button
    nextBtn.disabled = false;
    
    // Scroll feedback into view on mobile
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Move to the next question
function nextQuestion() {
    currentQuestionIndex++;
    
    // Check if game is over
    if (currentQuestionIndex >= shuffledQuestions.length) {
        endGame();
    } else {
        displayQuestion();
    }
}

// Update progress indicator
function updateProgress() {
    const progressPercentage = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
    progressFill.style.width = `${progressPercentage}%`;
    progressText.textContent = `Вопрос ${currentQuestionIndex + 1} из ${shuffledQuestions.length}`;
}

// End the game and show results
function endGame() {
    // Calculate results
    const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
    const incorrectAnswers = userAnswers.length - correctAnswers;
    const accuracyPercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    
    // Update result screen
    finalScore.textContent = correctAnswers;
    correctCount.textContent = correctAnswers;
    incorrectCount.textContent = incorrectAnswers;
    accuracy.textContent = `${accuracyPercentage}%`;
    
    // Set result message and emoji based on performance
    let message = "";
    let emoji = "🎉";
    
    if (accuracyPercentage === 100) {
        message = "Идеально! Ты настоящий эксперт итальянской семьи!";
        emoji = "🏆";
    } else if (accuracyPercentage >= 80) {
        message = "Отличный результат! Ты хорошо знаешь итальянскую семью!";
        emoji = "⭐";
    } else if (accuracyPercentage >= 60) {
        message = "Хороший результат! Продолжай учить итальянские слова!";
        emoji = "👍";
    } else if (accuracyPercentage >= 40) {
        message = "Неплохо! Есть куда стремиться!";
        emoji = "💪";
    } else {
        message = "Попробуй ещё раз! Ты обязательно улучшишь результат!";
        emoji = "📚";
    }
    
    resultMessage.textContent = message;
    resultEmoji.textContent = emoji;
    
    // Show result screen, hide others
    gameScreen.classList.remove('active');
    resultScreen.classList.add('active');
}

// Restart the game
function restartGame() {
    startGame();
}

// Go to main menu
function goToMenu() {
    startScreen.classList.add('active');
    gameScreen.classList.remove('active');
    resultScreen.classList.remove('active');
}

// Show hint for current question
function showHint() {
    const question = shuffledQuestions[currentQuestionIndex];
    
    if (question && question.hint) {
        hintContent.innerHTML = `
            <p><strong>Вопрос:</strong> "${question.question_it}"</p>
            <p><strong>Подсказка:</strong> ${question.hint}</p>
            <p><strong>Совет:</strong> Постарайся понять описание, а не переводить слово в слово!</p>
        `;
        hintModal.classList.add('active');
    }
}

// Close hint modal
function closeHintModal() {
    hintModal.classList.remove('active');
}

// Copy result to clipboard
function copyResultToClipboard() {
    const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
    const accuracyPercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    
    const resultText = `Я сыграл(а) в игру "Chi è chi?" (Итальянская семья) и набрал(а) ${correctAnswers} из ${totalQuestions} очков (${accuracyPercentage}% точности)! Попробуй и ты: https://github.com/username/lingogames-italian-family-quiz`;
    
    navigator.clipboard.writeText(resultText)
        .then(() => {
            // Show temporary feedback
            const originalText = copyResultBtn.innerHTML;
            copyResultBtn.innerHTML = '<i class="fas fa-check"></i>';
            copyResultBtn.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                copyResultBtn.innerHTML = originalText;
                copyResultBtn.style.backgroundColor = '';
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy result: ', err);
        });
}

// Utility function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);
