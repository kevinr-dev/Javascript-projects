const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["A) Berlin", "B) Madrid", "C) Paris", "D) Rome"],
        answer: "C"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["A) Earth", "B) Mars", "C) Jupiter", "D) Venus"],
        answer: "B"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["A) Elephant", "B) Blue Whale", "C) Great White Shark", "D) Giraffe"],
        answer: "B"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["A) Charles Dickens", "B) Mark Twain", "C) William Shakespeare", "D) Jane Austen"],
        answer: "C"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["A) O2", "B) H2O", "C) CO2", "D) NaCl"],
        answer: "B"
    }
];

let currentQuestion = 0;
let correctAnswers = 0;
const answers = {
    "A": 0,
    "B": 1,
    "C": 2,
    "D": 3
}

function checkAnswer(event) {
    const selectedOption = event.target.innerHTML;
    const chosen = selectedOption[0];
    
    if (chosen == quizQuestions[currentQuestion].answer) {
        document.getElementById('quiz').style.display = 'none';
        document.getElementById('result').innerHTML = "Correct! The answer was " + quizQuestions[currentQuestion].answer + "!";
        correctAnswers++;
    }
    else {
        document.getElementById('quiz').style.display = 'none';
        let correct = quizQuestions[currentQuestion].answer;
        document.getElementById('result').innerHTML = "Incorrect! The answer was " + quizQuestions[currentQuestion].options[answers[correct]] + "!";
    }
    document.getElementById('result').style.display = 'flex';
    document.getElementById('next').style.display = 'block';

    if(currentQuestion == 4) {
        let score = (correctAnswers / 5) * 100;
        let scoreText = document.createElement('span');
        scoreText.innerHTML = "You scored " + correctAnswers + " out of 5. Your score is " + score + "%";
        scoreText.style.display = 'block';
        scoreText.id = "score";
        document.getElementById('main').appendChild(scoreText);
        document.getElementById('next').innerHTML = "Restart";
        document.getElementById('next').onclick = function() {
            currentQuestion = 0;
            correctAnswers = 0;
            beginQuiz();
            document.getElementById('begin').style.display = 'block';
            document.getElementById('next').style.display = 'none';
            document.getElementById('result').style.display = 'none';
            document.getElementById('quiz').style.display = 'none';
            document.getElementById('score').remove();
            document.getElementById('next').innerHTML = "Next Question";
            document.getElementById('next').onclick = nextQuestion;
            removeListeners();
        }
    }
}

function addListener() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.id != 'next' && button.id != 'begin') {
            button.addEventListener('click', checkAnswer);
        }
    });
}

function setQuestion() {
    document.getElementById('question').innerHTML = "Question: " + quizQuestions[currentQuestion].question;

    document.getElementById('question1').innerHTML = quizQuestions[currentQuestion].options[0];
    document.getElementById('question2').innerHTML = quizQuestions[currentQuestion].options[1];
    document.getElementById('question3').innerHTML = quizQuestions[currentQuestion].options[2];
    document.getElementById('question4').innerHTML = quizQuestions[currentQuestion].options[3];
}

function beginQuiz() {
    setQuestion();
    document.getElementById('begin').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    addListener();
}

function nextQuestion() {
    currentQuestion += 1;
    setQuestion();
    document.getElementById('result').style.display = 'none';
    document.getElementById('next').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
}

function reset() {
    currentQuestion = 0;
    removeListeners();
    beginQuiz();
}

function removeListeners() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.id != 'next' && button.id != 'begin') {
            button.removeEventListener();
        }
    });
}