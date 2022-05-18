let qI = 0;
let clockId;
let time = 90;
let clock = document.getElementById("time");
let prompt = document.querySelector("main");
let randomQuestions = questions.sort(() => Math.random() - 0.5);
let score = 0;
var answerNotice = document.getElementById("answerNotice");

document.getElementById("start").addEventListener("click", handleClick);

function handleClick() {
  clockId = setInterval(handleTime, 1000);
  handleQuestion();
  
}

function handleQuestion() {
  if (qI < questions.length) {
    let {
      question,
      answers,
      correct
    } = questions[qI];
   
    qI++;
    prompt.innerHTML = `<h1>${question}</h1>`;
    answers.forEach((answer) => {
     
      let answerBtn = document.createElement("button");
      answerBtn.innerText = answer;
     
      prompt.appendChild(answerBtn);
     
      answerBtn.addEventListener("click", () => {
        
        handleAnswer(answer, correct);
      });
    });
  } else {
    
    endGame();
  }
}

function handleAnswer(answer, correct) {
  if (answer === correct) {

    var lineBreak = document.getElementById("line-break");
    lineBreak.style.display = "block";
    answerNotice.style.display = "block";
    score += 20;
    answerNotice.alert = "Correct!";
  } else {
    time -= 10; 
    clock.innerHTML = time;
    answerNotice.textContent = "Sorry! Wrong answer, lose 10 seconds";
  };
  handleQuestion();
}

function handleTime() {
  time--;
  time > 0 ? (clock.innerHTML = time) : endGame();
}

function endGame() {
 
  clearInterval(clockId);
  time = 0;
  clock.innerHTML = time;
  prompt.innerHTML = `
  <p>The quiz is over!</p>
  <p>Final score: ${score}</p>
  <p>Enter your initilas to see if you made the top 5!<p>
 `;
 document.querySelector('.initials').style.display = 'block';
  };

  function handleInitials() {
    console.log('clicked!!!');
    let initals = document.getElementById('initial').value;

    let store = localStorage.scores != undefined
          ? eval(localStorage.scores) : [];
    
    store.push({'initial':initals,'score':score});

    localStorage.scores = JSON.stringify(store);

  };



  function showScores() {
     if(localStorage.scores==undefined) return;
    
    let store = eval(localStorage.scores);

    store.sort((a,b)=>b.score-a.score);
    prompt.innerHTML = '<h1> Top Five Scores</h1>';

    store.forEach((pl,i) => {
      if(i>4) return;
      prompt.innerHTML += `<h2>${pl.initial}: ${pl.score}` 
    });
  }
  
  function reloadGame() {
    window.location.reload();
  }

  function resetGame() {
    window.localStorage.clear();
  }