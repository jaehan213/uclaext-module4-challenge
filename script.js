quiz = [
    {
        question: "Web page editors works on a ____ principle.",
        a: "WWW",
        b: "HTML",
        c: "WYSIWYG",
        d: "WYGWYSI",
        correct: "c"
    },
    {
        question: "Which program is used by web clients to view the web pages?",
        a: "Web browser",
        b: "Protocol",
        c: "Web server",
        d: "Search Engine",
        correct: "a"
    },
    {
        question: "What is the name of the location address of the hypertext documents?",
        a: "Uniform Resource Locator",
        b: "Web server",
        c: "File",
        d: "Web address",
        correct: "a"
    },
    {
        question: "What are shared on the Internet and are called as Web pages?",
        a: "Programs",
        b: "Cables",
        c: "Hypertext documents",
        d: "None",
        correct: "c"
    },
    {
        question: "How many color names are used by the browsers?",
        a: "8",
        b: "10",
        c: "12",
        d: "16",
        correct: "d"
    },
    {
        question: "Which of the following is NOT an HTML term?",
        a: "Tag",
        b: "Element",
        c: "Attribute",
        d: "Code",
        correct: "d"
    },
    {
        question: "The common child element for ul (unordered list) is ____.",
        a: "ol",
        b: "pl",
        c: "li",
        d: "la",
        correct: "c"
    }
];

var highscoreBtn = document.querySelector("#scores-btn")
var ul = document.querySelector("ul");
var label = document.querySelector("label");
var input = document.querySelector("input");
var container = document.querySelector(".container-2")
var mainText = document.querySelector("#text");
var a = document.querySelector("#a");
var b = document.querySelector("#b");
var c = document.querySelector("#c");
var d = document.querySelector("#d");
var scores = document.querySelector("#scores-btn");
var startBtn = document.querySelector("#start");
var submitBtn = document.querySelector("#submit");
var check = document.querySelector("#check");
var timeDisplay = document.querySelector("#time-left");
var scoresBtn = document.querySelector('#scores-btn');
var modal = document.querySelector("#highscore-modal");
var span = document.getElementsByClassName("close")[0];
var highscoreTable = document.querySelector("#highscore-table");

var huser1 = document.querySelector("#user-1")
var huser2 = document.querySelector("#user-2")
var huser3 = document.querySelector("#user-3")
var huser4 = document.querySelector("#user-4")
var huser5 = document.querySelector("#user-5")
var hscore1 = document.querySelector("#score-1")
var hscore2 = document.querySelector("#score-2")
var hscore3 = document.querySelector("#score-3")
var hscore4 = document.querySelector("#score-4")
var hscore5 = document.querySelector("#score-5")

var u = localStorage.length;
var k = -1;
var timeLeft = 20*quiz.length;
var numberCorrect = 0;

function startTimer(){
    setInterval(function(){
        if(k < quiz.length & timeLeft > 0){
            timeLeft--;
            timeDisplay.textContent = timeLeft;
        }else{
            k = quiz.length;
            display();
            clearInterval();
        }
    }, 1000);
}

function calculateScore(numberCorrect){
    return Math.floor(20*numberCorrect*0.6+timeLeft*0.4)
}

function display(){
    if(k < 0){
        input.setAttribute("style", "display: none");
        label.setAttribute("style", "display: none");
        submitBtn.setAttribute("style", "display: none");
        startBtn.setAttribute("style", "display: inline-block");
        a.setAttribute("style", "display: none");
        b.setAttribute("style", "display: none");
        c.setAttribute("style", "display: none");
        d.setAttribute("style", "display: none");
        mainText.textContent = "Coding Quiz Challenge"
    } else{
        if(k < quiz.length){
            ul.setAttribute("style", "padding-left: 2rem")
            mainText.setAttribute("style", "font-size: 15px")
            container.setAttribute("style", "text-align: start")
            startBtn.setAttribute("style", "display: none");
            a.setAttribute("style", "display: inline-block");
            b.setAttribute("style", "display: inline-block");
            c.setAttribute("style", "display: inline-block");
            d.setAttribute("style", "display: inline-block");
            mainText.textContent = quiz[k].question;
            a.textContent = quiz[k].a;
            b.textContent = quiz[k].b;
            c.textContent = quiz[k].c;
            d.textContent = quiz[k].d;
        }else{
            ul.setAttribute("style", "padding-left: 0")
            input.setAttribute("style", "display: inline");
            label.setAttribute("style", "display: inline");
            container.setAttribute("style", "text-align: center")
            submitBtn.setAttribute("style", "display: inline-block");
            a.setAttribute("style", "display: none");
            b.setAttribute("style", "display: none");
            c.setAttribute("style", "display: none");
            d.setAttribute("style", "display: none");
            mainText.textContent = "Done! Score: " + calculateScore(numberCorrect) + " You got " + numberCorrect + "/" + quiz.length + " correct.";
        }
    }
};

startBtn.addEventListener("click", function() {
    check.textContent = "Begin!";
    setTimeout(function(){
        check.textContent = "";
    }, 1000)
    k++;
    startTimer();
    display();
});

function sortedScores(){
    var scoreArray = [];
    for (let i = 0; i < localStorage.length; i++) {
        scoreArray.push(JSON.parse(localStorage.getItem("entry"+i)));
    }
    scoreArray.sort(function(a, b){return b.score-a.score});
    return scoreArray;
}

function displayScores(scoreArray){
    var huserArr = [huser1, huser2, huser3, huser4, huser5]
    var hscoreArr = [hscore1, hscore2, hscore3, hscore4, hscore5]
    for(let i = 0; i < 5 && i < localStorage.length; i++){
        huserArr[i].textContent = scoreArray[i].user;
        hscoreArr[i].textContent = scoreArray[i].score;
    }
}

submitBtn.addEventListener("click", function(){
    localStorage.setItem("entry"+u, JSON.stringify({user: input.value, score: calculateScore(numberCorrect)}));
    displayScores(sortedScores());
    location.reload();
});

highscoreBtn.addEventListener("click", function(){
    modal.setAttribute("style", "display: block");
});

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

a.addEventListener("click", function(){
    if(quiz[k].correct == "a"){
        numberCorrect++;
        check.setAttribute("style", "color: green");
        check.textContent = "Correct!";
        setTimeout(function(){
            check.textContent = "";
        }, 1000)
    }else{
        timeLeft = timeLeft - 15;
        timeDisplay.setAttribute("style", "color: red");
        setTimeout(function(){
            timeDisplay.setAttribute("style", "color: black");
        }, 1000);
        check.setAttribute("style", "color: red");
        check.textContent = "Incorrect!"
        setTimeout(function(){
            check.textContent = "";
        }, 1000)
    }
    k++;
    display();
    timeDisplay.textContent = timeLeft;
});
b.addEventListener("click", function(){
    if(quiz[k].correct == "b"){
        numberCorrect++;
        check.setAttribute("style", "color: green");
        check.textContent = "Correct!"
        setTimeout(function(){
            check.textContent = "";
        }, 1000)
    }else{
        timeLeft = timeLeft - 15;
        timeDisplay.setAttribute("style", "color: red");
        setTimeout(function(){
            timeDisplay.setAttribute("style", "color: black");
        }, 1000);
        check.setAttribute("style", "color: red");
        check.textContent = "Incorrect!"
        setTimeout(function(){
            check.textContent = "";
        }, 1000)
    }
    k++;
    display();
    timeDisplay.textContent = timeLeft;
});
c.addEventListener("click", function(){
    if(quiz[k].correct == "c"){
        numberCorrect++;
        check.setAttribute("style", "color: green");
        check.textContent = "Correct!"
        setTimeout(function(){
            check.textContent = "";
        }, 1000)
    }else{
        timeLeft = timeLeft - 15;
        timeDisplay.setAttribute("style", "color: red");
        setTimeout(function(){
            timeDisplay.setAttribute("style", "color: black");
        }, 1000);
        check.setAttribute("style", "color: red");
        check.textContent = "Incorrect!"
        setTimeout(function(){
            check.textContent = "";
        }, 1000)
    }
    k++;
    display();
    timeDisplay.textContent = timeLeft;
});
d.addEventListener("click", function(){
    if(quiz[k].correct == "d"){
        numberCorrect++;
        check.setAttribute("style", "color: green");
        check.textContent = "Correct!"
        setTimeout(function(){
            check.textContent = "";
        }, 1000)
    }else{
        timeLeft = timeLeft - 15;
        timeDisplay.setAttribute("style", "color: red");
        setTimeout(function(){
            timeDisplay.setAttribute("style", "color: black");
        }, 1000);
        check.setAttribute("style", "color: red");
        check.textContent = "Incorrect!"
        setTimeout(function(){
            check.textContent = "";
        }, 1000)
    }
    k++;
    display();
    timeDisplay.textContent = timeLeft;
});



display();
displayScores(sortedScores());
