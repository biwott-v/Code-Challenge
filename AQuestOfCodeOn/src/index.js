document.addEventListener("DOMContentLoaded",()=>{
  let image=document.querySelector("#game-image");
  let controller = new AbortController()
  function fetchData(i){
    fetch("db.json")
    .then(res => res.json())
    .then(data => {
      if(i < data.length) {
        image.src=data[i].image;
        choice.forEach(element => {
          if(element.textContent===data[i].answer){
            element.addEventListener("click",(event)=>{
              element.style.backgroundColor="green";
              setTimeout(()=> element.style.backgroundColor="#6b5b95",2000)
              points+=100;
              playerPoints.textContent=points;
              
              if(points === 700) {
                image.src="https://placehold.co/600x300/1a1a2e/e6e6e6?text=Congratulations+You+Win";
                welcomeText.textContent="";
                welcomeText.style.visibility="visible";
                mytext="Congratulations! You've Won! Press any key to play again.";
                setInterval(type,100);
                next.style.visibility="hidden";
                choice.forEach(element => {
                  element.style.visibility="hidden";
                })
                mytimer.textContent="YOU WIN!";
                clearInterval(interval);
              }
            },{once:true})
          }
          else{
            element.addEventListener("click",event => {
              element.style.backgroundColor="red";
              setTimeout(()=> element.style.backgroundColor="#6b5b95",2000);
              controller.abort();
              if(num===1){
                lifeone.style.visibility = "hidden";
                num++;
              }
              else if(num===2){
                lifetwo.style.visibility = "hidden";
                num++;
              }
              else if (num===3){
                // Handle different end states
                const resultImage = points === 0 
                  ? "https://placehold.co/600x300/1a1a2e/e6e6e6?text=You+Lose"
                  : "https://placehold.co/600x300/1a1a2e/e6e6e6?text=Nice+Try";
                
                image.src=resultImage;
                lifethree.style.visibility = "hidden";
                mytext= points === 0 
                  ? "GAME OVER ... Press any key to try again" 
                  : "Better luck next time! Press any key to restart";
                welcomeText.textContent="";
                welcomeText.style.visibility="visible"
                setInterval(type,100);
                next.style.visibility="hidden";
                choice.forEach(element => {
                  element.style.visibility="hidden";
                })
                mytimer.textContent="GAME OVER";
              }
            },{once:true})
          }
        })
      }
    })
  }

  let playerPoints=document.querySelector("#points")
  let points=0;
  let minutes = 3;
  let seconds = 0;
  let num = 1;
  let mytimer = document.querySelector("#timer");
  let lifeone = document.querySelector("#lifeone");
  let lifetwo = document.querySelector("#lifetwo");
  let lifethree = document.querySelector("#lifethree");
  let welcomeText=document.querySelector("#welcome");
  let mytext=`Hello ,welcome to Quest of Codeon! Your adventure begins...  Press any key to start `
  let interval;
  let quiznum=0;
  let next = document.querySelector("#next");
  let choice=document.querySelectorAll(".choice");

  document.addEventListener("keydown",(event)=> {
    num=1;
    points=0;
    playerPoints.textContent=0;
    lifeone.style.visibility = "visible";
    lifetwo.style.visibility = "visible";
    lifethree.style.visibility = "visible";
    if(!interval){
      interval = setInterval(timer, 1000); 
    }
    quiznum=0;
    fetchData(quiznum);
    next.style.visibility="visible";
    choice.forEach(element => {
      element.style.visibility="visible";
    })
    welcomeText.style.visibility="hidden";
  })

  next.addEventListener("click",(event)=>{
    quiznum++;
    if(quiznum === 7) { // Handle all 7 questions
      const resultImage = points === 700
        ? "https://placehold.co/600x300/1a1a2e/e6e6e6?text=Congratulations+You+Win"
        : points === 0
          ? "https://placehold.co/600x300/1a1a2e/e6e6e6?text=You+Lose"
          : "https://placehold.co/600x300/1a1a2e/e6e6e6?text=Nice+Try";
      
      image.src = resultImage;
      welcomeText.textContent= points === 700 
        ? "Perfect Score!" 
        : "Quiz Complete!";
      next.style.visibility="hidden";
      choice.forEach(element => {
        element.style.visibility="hidden";
      })
      quiznum=0;
    }
    else{
      fetchData(quiznum);
    }
  })

  mytimer.textContent = `${minutes} : ${seconds <10 ? '0' + seconds: seconds} `;
  let speed = 75;
  let i = 0;

  function type() {
    if (i < mytext.length) {
      welcomeText.textContent+=mytext[i];
      i++;
    }
    else{
      clearInterval(typeInterval);
    }
  }
  let typeInterval=setInterval(type,speed);

  function timer() {
    if (seconds === 0 && minutes !== 0) {
        seconds = 59;
        minutes -= 1;
    } 
    else {
      seconds -= 1;
    }
    if(num!==3){
      mytimer.textContent = `${minutes} : ${seconds < 10 ? '0' + seconds : seconds}`;
    }
    
    if (minutes === 0 && seconds === 0) {
        if (num === 1) {
            lifeone.style.visibility = "hidden";
            minutes = 3;
            num++;
        } else if (num === 2) {
            lifetwo.style.visibility = "hidden";
            minutes = 3;
            num++;
        } else if (num === 3) {
            const resultImage = points === 0 
              ? "https://placehold.co/600x300/1a1a2e/e6e6e6?text=You+Lose"
              : "https://placehold.co/600x300/1a1a2e/e6e6e6?text=Nice+Try";
            
            image.src=resultImage;
            lifethree.style.visibility = "hidden";
            mytext= "Time's up! Press any key to restart";
            welcomeText.textContent="";
            welcomeText.style.visibility="visible";
            setInterval(type,100);
            next.style.visibility="hidden";
            choice.forEach(element => {
              element.style.visibility="hidden";
            })
            clearInterval(interval);     
        }
    }
  }
})