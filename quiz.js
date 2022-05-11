let qI = 0;
let clockId;
let time = 100;
let clock = document.getElementById('time');
let prompt = document.querySelector('main');
let randomQuestions = questions.sort(()=>Math.random()-.5);

document.getElementById('start').addEventListener('click', handleClick);

function handleClick() {
    clockId = setInterval(handleTime, 1000);
    handleQuestion();
   // prompt.innerHTML = '';
};

function handleQuestion() {
    if(qI < questions.length) {
        let { question, answers, correct } = questions[qI];
        prompt.innerHTML = `<h1>${question}</h1>`
        answers.forEach((answer,i) => {
            prompt.innerHTML += `<button onclick='handleAnswer("${correct}")'> ${answer} </button><br>`
        });
    }

};



function handleAnswer(correct) {
    if(correct) {
  console.log(correct);
    }
     
   
}

function handleTime() {
    time--;
    time>0
    ? clock.innerHTML = time
    : endGame();
};

function endGame() {
    clearInterval(clockId);
    time = 0;
    clock.innerHTML = time;
}