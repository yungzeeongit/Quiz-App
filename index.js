

const _question = document.getElementById('question');
const _options = document.querySelector('.quiz-options');
const _correctScore = document.getElementById('correct-score');
const _totalQuestion = document.getElementById('total-question'); //set value to question-count.value
const _playAgain = document.getElementById('play-again');
const _checkAnswer = document.getElementById('check-answer');
const _result = document.getElementById('answer');
const _questionCount = document.getElementById('question-count');
const _category = document.getElementById('category');
const _restart = document.getElementById('restart');
const _quitButton = document.getElementById('quit-button');
let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = document.getElementById('question-count').value;

function eventListeners() {
    _checkAnswer.addEventListener('click', checkAnswers)
    _playAgain.addEventListener('click', playAgain)
    // _restart.addEventListener('click', playAgain)
    
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuestions()
    eventListeners()

    const resultContainer = document.getElementById("result-container");
    const container = document.getElementById("container");
    container.style.display = "none";
    resultContainer.style.display = "none";

    const form = document.getElementById("quiz-options-form");
form.addEventListener("submit", event => {
  event.preventDefault();
  totalQuestion = document.getElementById("question-count").value;
  _totalQuestion.textContent = totalQuestion;
  const container = document.getElementById("container");
  container.style.display = "block";
  form.style.display = "none";

  
  

  let timeRemaining = totalQuestion * 10; // timeRemaining = totalQuestion * 15
const timer = document.getElementById("timer");
timer.textContent = timeRemaining;
if (document.getElementById("enable-timer").checked){
    let timer = document.getElementById("timer");
    timer.style.display = "flex"
    const intervalId = setInterval(() => {
        timeRemaining--;
        timer.textContent = timeRemaining;
        
        if (timeRemaining <= 0) {
          clearInterval(intervalId);
          // code to show the final result here
          container.style.display = "none";
          const resultContainer = document.getElementById("result-container");
          const finalScore = document.getElementById('final-score');
          const totalQuestions = document.getElementById('total-questions');
          container.style.display = "none";
          form.style.display = "none";
          resultContainer.style.display = "block";
          _correctScore.textContent = correctScore;
          _totalQuestion.textContent = totalQuestion;
          finalScore.innerText = ` ${correctScore}`;
          totalQuestions.innerText =  `${totalQuestion}`
         
        }
        
      }, 1000);

}   else {
    timer.style.display = "none";
    clearInterval(intervalId);
  }

  

 

});

const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", () => {
    let intervalId 
  clearInterval(intervalId);
  const timeRemaining = totalQuestion * 10; 
  timer.textContent = `Time: ${timeRemaining}`;
  intervalId = setInterval(() => { 
    timeRemaining == 0;
    timer.textContent = timeRemaining;
    if (timeRemaining <= 0) {
      clearInterval(intervalId);
  
    }
  }, 1000);

  const resultContainer = document.getElementById("result-container");
  resultContainer.style.display = "none";
  const container = document.getElementById("container");
  container.style.display = "none";
  const form = document.getElementById("quiz-options-form")
   form.style.display = "flex";
});

// const playAgain = document.getElementById("play-again");
// playAgain.addEventListener("click", () => {
//   const resultContainer = document.getElementById("result-container");
//   resultContainer.style.display = "none";
//   const container = document.getElementById("container");
//   container.style.display = "block";
//   timeRemaining = totalQuestion * 10;
//   timer.textContent = `Time: ${timeRemaining}`;
//   intervalId = setInterval(() => {
//     timeRemaining--;
//     timer.textContent = `Time: ${timeRemaining}`;
//     if (timeRemaining <= 0) {
//       clearInterval(intervalId);
//       timeRemaining === 0
//     }
//   }, 1000);
// });
// const playAgain = document.getElementById("play-again");
// playAgain.addEventListener("click", () => {
//   const resultContainer = document.getElementById("result-container");
//   resultContainer.style.display = "none";
//   const container = document.getElementById("container");
//   container.style.display = "none";
//   const form = document.getElementById("quiz-options-form")
//   form.style.display = "flex";
// });


const restartButton = document.getElementById("restart");
restartButton.addEventListener("click", () => {
  const container = document.getElementById("container");
  container.style.display = "none";
  form.style.display = "flex";
  
  const resultContainer = document.getElementById("result-container");
  resultContainer.style.display = "none";
  correctScore = 0;
  askedCount = 0;
});

})


async function loadQuestions() {
    const APIUrl = "https://opentdb.com/api.php?amount=5&type=multiple"
    const result = await fetch(`${APIUrl}`)
    const data = await result.json()
    _result.innerHTML = ""
    showQuestions(data.results[0])
}



function showQuestions(data) {
    _checkAnswer.disabled = false
    correctAnswer = data.correct_answer
    let incorrrectAnswers = data.incorrect_answers
    let optionsList = incorrrectAnswers
    optionsList.splice(Math.floor(Math.random() * incorrrectAnswers.length + 1), 0, correctAnswer);

    _question.innerHTML = `${data.question} <br> <span class="category">${data.category} </span>`

    // _options.innerHTML =`${optionsList.map((option, index) =>
    //   `<li>${index + 1}. <span> ${option} </span> </li>`).join('')}`

    _options.innerHTML = `${optionsList.map((option, index) =>
        `<li>${index + 1}. <span> ${option} </span> </li>`).join('')}`

    selectOption()
}

function selectOption() {
    _options.querySelectorAll('li').forEach((options) => {
        options.addEventListener('click', () => {
            if (_options.querySelector('.selected')) {
                const activeOption = _options.querySelector('.selected')
                activeOption.classList.remove('selected')
            }
            options.classList.add('selected')
        })
    })
}

function checkAnswers() {
    _checkAnswer.disabled = true
    if (_options.querySelector('.selected')) {
        let selectedAnswer = _options.querySelector('.selected span').textContent
        if (selectedAnswer.trim() === htmlDecode(correctAnswer)) {
            correctScore++;
            _result.innerHTML = `<p> <i class="fas fa-check"></i> correct answer! </p>`
        } else {
            _result.innerHTML = `<p> <i class="fas fa-times"></i>wrong answer!<p></p><small><b>correct answer:</b> ${correctAnswer}</small></p>`
        }
        checkCount()
    } else {
        _result.innerHTML = `<p> <i class="fas fa-question"></i> Please select an option </p>`
        _checkAnswer.disabled = false
    }

}


function htmlDecode(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}



function checkCount() {
    askedCount++;
    setCount();
    if (askedCount == totalQuestion) {
        _result.innerHTML += `<p> Your score is ${correctScore} of ${totalQuestion} </p>`
        _playAgain.style.display = 'block';
        _checkAnswer.style.display = 'none';
    } else {
        setTimeout(() => {
            loadQuestions()
        }, 300)
    }

}


function setCount() {
    _totalQuestion.textContent = totalQuestion
    _correctScore.textContent = correctScore
}

function playAgain() {
    correctScore = askedCount = 0
    _playAgain.style.display = 'none'
    _checkAnswer.style.display = 'block'
    _checkAnswer.disabled = false
    setCount()
    loadQuestions()

}