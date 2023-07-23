import quiz from "./quizData.js";

const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


// Make an array of objects that stores question, choices of question and answer


  

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 20;
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);


        choiceDiv.addEventListener('click', () => {
            resetChoices(); // Unselect all choices first
            choiceDiv.classList.add('selected'); // Then select the clicked choice
        });


    //   choiceDiv.addEventListener('click', () => {
    //       if (choiceDiv.classList.contains('selected')) {
    //           choiceDiv.classList.remove('selected');
    //       }
    //       else {
    //           choiceDiv.classList.add('selected');
    //      }
    //  });
    }

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

// Function to reset selected choices
const resetChoices = () => {
    const choices = document.querySelectorAll('.choice');
    choices.forEach(choice => {
        choice.classList.remove('selected');
    });
};


// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayAlert("Correct Answer!",true);
        score++;
    }
    else {
        // alert("Wrong answer");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`,false);
    }
    timeLeft = 20;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

// Function to Show Alert
const displayAlert = (msg, isCorrect) => {
    alert.style.display = "block";
    alert.textContent = msg;
    
    // Apply different background colors based on whether the answer is correct or wrong
    if (isCorrect) {
        alert.style.backgroundColor = "#65e918"; // Correct answer color (green)
    } else {
        alert.style.backgroundColor = "#e91818"; // Wrong answer color (red)
    }
    
    setTimeout(() => {
        alert.style.display = "none";
        // Reset the background color to the original color
        alert.style.backgroundColor = "#65e918";
    }, 2000);
}


// // Function to Show Alert
// const displayAlert = (msg) => {
//     alert.style.display = "block";
//     alert.textContent = msg;
//     setTimeout(()=>{
//         alert.style.display = "none";
//     }, 2000);
// }

// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 20;
                startQuiz();
                resetScoreBoard();
                scoreboardContainer.classList.remove('hide');
                document.querySelector('.score').innerHTML = `Your Score: ${userScore}`;
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}



// Function to Start Quiz
const startQuiz = () =>{
    timeLeft = 20;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});

