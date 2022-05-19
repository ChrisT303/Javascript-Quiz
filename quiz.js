let qI = 0;
let clockId;
let time = 90;
let clock = document.getElementById("time");
let prompt = document.querySelector("main");
let randomQuestions = questions.sort(() => Math.random() - 0.5);
let score = 0;
let answerNotice = document.getElementById("answerNotice");

// Activates start button and starts timer
document.getElementById("start").addEventListener("click", handleClick);
//Sets up clock paramaters 
function handleClick() {
  clockId = setInterval(handleTime, 1000);
  handleQuestion();
  
}
//Function for moving for moving to next question 
function handleQuestion() {
  if (qI < questions.length) {
    let {
      question,
      answers,
      correct
    } = questions[qI];
  //moves to next question
    qI++;
    //Passes question text into html
    prompt.innerHTML = `<h1>${question}</h1>`;
    //Creates asnwer buttons and thier questions and passes in the text for each
    answers.forEach((answer) => {
     
      let answerBtn = document.createElement("button");
      answerBtn.innerText = answer;
     
      prompt.appendChild(answerBtn);
     //Function for adding click events to buttons
      answerBtn.addEventListener("click", () => {
        
        handleAnswer(answer, correct);
      });
    
    });
    
  } else {
    //Ends game at completion of quiz
    endGame();
  }
  
}
//Function for answer check 
function handleAnswer(answer, correct) {
  if (answer === correct) {
    // prompts html to notify answer is correct and awards points
    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerNotice.style.display = "block";
    score += 20;
    answerNotice.textContent = "Correct!";
  } 
  // prompts html to notify answer is incorrect and deducts time
   else { 
    time -= 10; 
    clock.innerHTML = time;
    answerNotice.textContent = "Sorry! Wrong answer, lose 10 seconds";
  };
  handleQuestion();
}
// Function to end game if time runs out
function handleTime() {
  time--;
  time > 0 ? (clock.innerHTML = time) : endGame();
}
//Game over function 
function endGame() {
 //Clears clock and prompts user the the game is over
  clearInterval(clockId);
  time = 0;
  clock.innerHTML = time;
  prompt.innerHTML = `
  <p>The quiz is over!</p>
  <p>Final score: ${score}</p>
  <p>Enter your initilas to see if you made the top 5!<p>
 `;
// Styling for buttons to display on certain pages
 document.querySelector('.initials').style.display = 'block';
 document.querySelector(".answerText").style.display = "none";
  };
// Event listener for submit button 
  document.querySelector('#submit').addEventListener('click', handleInitials);
// function for user to input intials and store 
  function handleInitials() {  
  // varibale for initial input
    let initals = document.getElementById('initial').value;
  // variable for initial and score storage
    let store = localStorage.scores != undefined
          ? eval(localStorage.scores) : [];
    // pushes score and intitals to local storage
    store.push({'initial':initals,'score':score});
  //  prompts user that they have to enter initals for score
    if(initals === "") {
      alert("Must enter text");
      return;
    }
  //  sotes to local storage 
    localStorage.scores = JSON.stringify(store);    
   
    
  };


// event listeners for buttons on top scores page
  document.querySelector('#submit').addEventListener('click', showScores);
  document.querySelector('.highScores').addEventListener("click", showScores)
// Function for top scores page
  function showScores() {
    

     if(localStorage.scores == undefined) return;
    // evaluates scores string
    let store = eval(localStorage.scores);
  // sorts scores
    store.sort((a,b)=>b.score-a.score);
    prompt.innerHTML = '<h1> Top Five Scores</h1>';
  // Checks to see if each socre is top 5 fot display and passes in the score and initials
    store.forEach((pl,i) => {
      if(i>4) return;
      prompt.innerHTML += `<h2>${pl.initial}: ${pl.score}</h2>` 
       
    });
    // Styling for buttons to be displayed on correct pages
    document.querySelector('.initials').style.display = 'none';
    document.querySelector("#scoresPage").style.display = "block";
    document.querySelector(".hide").style.display = 'none';
     
  }
  // Restarts game
  function reloadGame() {
    window.location.reload();
  }

// Resets scores in local storage and prompts scores have been cleared
  function resetScore() {
    window.localStorage.clear()    
    prompt.innerHTML += `<h3>Scores Cleared<h3>`;
    
  }
