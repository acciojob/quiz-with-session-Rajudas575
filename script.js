// Data for the quiz
const questions = [
  {
    question: 'What is the capital of France?',
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: 'What is the highest mountain in the world?',
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: 'What is the largest country by area?',
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: 'Which is the largest planet in our solar system?',
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: 'What is the capital of Canada?',
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Initialize user answers from session storage
let userAnswers = JSON.parse(sessionStorage.getItem('progress')) || new Array(questions.length).fill(null);

// Render the quiz questions and answers
function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = '';
  questions.forEach((question, i) => {
    const questionElement = document.createElement("div");
    questionElement.classList.add('question');
    
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);
    
    question.choices.forEach(choice => {
      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = `question-${i}`;
      choiceElement.value = choice;
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }
      choiceElement.addEventListener('change', () => {
        userAnswers[i] = choice;
        sessionStorage.setItem('progress', JSON.stringify(userAnswers));      });
      
      const choiceLabel = document.createElement("label");
      choiceLabel.textContent = choice;
      
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceLabel);
      questionElement.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionElement);
  });
}

// Calculate and display the score
function submitQuiz() {
  let score = 0;
  questions.forEach((question, i) => {
    if (userAnswers[i] === question.answer) {
      score++;
    }
  });

  // Display the score
  const resultElement = document.getElementById("score");
  resultElement.textContent = `Your score is ${score} out of ${questions.length}.`;

  // Store the score in localStorage
  localStorage.setItem('score', score);
}

// Check if there is a stored score and display it
function displayStoredScore() {
  const storedScore = localStorage.getItem('score');
  if (storedScore !== null) {
    const resultElement = document.getElementById("score");
    resultElement.textContent = `Your previous score was ${storedScore} out of ${questions.length}.`;
  }
}

// Event listener for the submit button
document.getElementById("submit").addEventListener("click", submitQuiz);

// Initialize the quiz
function initializeQuiz() {
  renderQuestions();
  displayStoredScore();
}

initializeQuiz();
