const questions = [
  { prompt: "12 + 8", answer: 20 },
  { prompt: "35 - 17", answer: 18 },
  { prompt: "9 x 7", answer: 63 },
  { prompt: "81 / 9", answer: 9 },
  { prompt: "15 + 6 - 4", answer: 17 },
  { prompt: "(5 x 6) - 11", answer: 19 },
  { prompt: "3.5 + 2.2", answer: 5.7 },
  { prompt: "100 / 4 + 3", answer: 28 }
];

const quizView = document.getElementById("quiz-view");
const resultsView = document.getElementById("results-view");
const progressLabel = document.getElementById("progress-label");
const progressFill = document.getElementById("progress-fill");
const questionText = document.getElementById("question-text");
const answerForm = document.getElementById("answer-form");
const answerInput = document.getElementById("answer-input");
const scoreText = document.getElementById("score-text");
const scorePercent = document.getElementById("score-percent");
const resultsList = document.getElementById("results-list");
const restartBtn = document.getElementById("restart-btn");

let currentIndex = 0;
let attempts = [];

function approxEqual(a, b, tolerance = 0.0001) {
  return Math.abs(a - b) <= tolerance;
}

function updateProgress() {
  const total = questions.length;
  const currentDisplay = Math.min(currentIndex + 1, total);
  const progress = (currentIndex / total) * 100;

  progressLabel.textContent = `Question ${currentDisplay} of ${total}`;
  progressFill.style.width = `${progress}%`;
  progressFill.parentElement.setAttribute("aria-valuenow", String(Math.round(progress)));
}

function renderQuestion() {
  updateProgress();
  questionText.textContent = questions[currentIndex].prompt;
  answerInput.value = "";
  answerInput.focus();
}

function renderResults() {
  const total = questions.length;
  const correctCount = attempts.filter((attempt) => attempt.isCorrect).length;
  const percent = Math.round((correctCount / total) * 100);

  scoreText.textContent = `${correctCount} / ${total}`;
  scorePercent.textContent = `${percent}% correct`;

  resultsList.innerHTML = "";

  attempts.forEach((attempt, index) => {
    const item = document.createElement("li");
    item.className = `result-item ${attempt.isCorrect ? "correct" : "incorrect"}`;

    const statusText = attempt.isCorrect ? "Correct" : "Incorrect";

    item.innerHTML = `
      <p><strong>Q${index + 1}:</strong> ${attempt.prompt}</p>
      <p>Your answer: ${attempt.userAnswer}</p>
      <p>Correct answer: ${attempt.correctAnswer}</p>
      <p class="result-status ${attempt.isCorrect ? "correct" : "incorrect"}">${statusText}</p>
    `;

    resultsList.appendChild(item);
  });

  quizView.classList.add("hidden");
  resultsView.classList.remove("hidden");
  progressFill.style.width = "100%";
  progressFill.parentElement.setAttribute("aria-valuenow", "100");
}

function submitCurrentAnswer(event) {
  event.preventDefault();

  const raw = answerInput.value.trim();
  if (raw === "") {
    answerInput.focus();
    return;
  }

  const userValue = Number(raw);
  const question = questions[currentIndex];

  attempts.push({
    prompt: question.prompt,
    userAnswer: raw,
    correctAnswer: question.answer,
    isCorrect: approxEqual(userValue, question.answer)
  });

  currentIndex += 1;

  if (currentIndex >= questions.length) {
    renderResults();
    return;
  }

  renderQuestion();
}

function restartQuiz() {
  currentIndex = 0;
  attempts = [];
  resultsView.classList.add("hidden");
  quizView.classList.remove("hidden");
  renderQuestion();
}

answerForm.addEventListener("submit", submitCurrentAnswer);
restartBtn.addEventListener("click", restartQuiz);

renderQuestion();
