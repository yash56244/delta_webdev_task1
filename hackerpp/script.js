var c =document.getElementsByTagName("td");
var a;
var result = generateRandom();
var clicks=0;
var check=[];
var startTime = Date.now();
var interval = setInterval(timer, 100);
var retrievedData=JSON.parse(localStorage.getItem("best_scores"));
if (Array.isArray(retrievedData)){
    retrievedData.sort();
    retrievedData1=retrievedData.slice(0,5);
}else{
    retrievedData1=[];
}
var scores = retrievedData1;


for (let i = 0; i < c.length/2; i++) {
    c[i].innerText=result[i];                                //displaying random numbers.
    c[i+25].innerText=result[i];   
}

function timer() {
    var elapsedTime = Date.now() - startTime;
    var time = (elapsedTime / 1000).toFixed(3);
    document.getElementById("timer").innerHTML = time + "s";
    return time+"s";
}

function bestTime(){
    if (localStorage.getItem("best_scores")){
        var retrievedData=JSON.parse(localStorage.getItem("best_scores"));
        retrievedData.sort();
        retrievedData1=retrievedData.slice(0,5);
        var bt=document.getElementsByClassName('best_time');
        for(let i=0;i<5;i++){
            bt[i].innerText=" ";
        }
        retrievedData1.forEach((element,index) =>{
            bt[index].textContent=retrievedData1[index];
        })
    }
}

function generateRandom() {
    var result = [], randNumber,Count=25;
    while ( Count > 0) {
        randNumber = Math.round(1 + Math.random() * (24));
        if (result.indexOf(randNumber) == -1) {
            result.push(randNumber);
            Count--;
        }
    }
    return result;
}

function handleCellClick(clickedCellEvent){
    var mySound = new Audio("1.mp3");
    mySound.play();
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    var pi = parseInt(c[clickedCellIndex-1].textContent);
    
    if (clicks==0) {
        if (pi!=1) {
            alert("Please start from 1");    // User must start from 1.
            restartGame();
        }
        else{
            check.push(pi);
            check.sort((a,b) => a-b);
            if (checkClick()===1) {
                alert("You Have Clicked Incorrect Value \n Press OK to play again!!");      //check if user have clicked in correct order.
                restartGame();
            }

            if (c[clickedCellIndex-1].textContent>0 && c[clickedCellIndex-1].textContent<=15){
                c[clickedCellIndex-1].textContent = Number(c[clickedCellIndex-1].textContent)+25;
                c[clickedCellIndex+24].textContent = Number(c[clickedCellIndex+24].textContent)+25;
            }

            else if (c[clickedCellIndex-1].textContent>15){
                c[clickedCellIndex-1].textContent=" ";
            }
        }
    }
    
    else{
        check.push(pi);
        check.sort((a,b) => a-b);
        if (checkClick()===1) {
            alert("You Have Clicked Incorrect Value \n Press OK to play again!!");      //check if user have clicked in correct order.
            restartGame();
        }

        else if(c[clickedCellIndex-1].textContent==40){
            c[clickedCellIndex-1].textContent=" ";
            clearInterval(interval);
            var t=timer();
            alert("You Won!!");                               //Win condition.
            scores.push(t);
            var str=JSON.stringify(scores);
            localStorage.setItem("best_scores",str);
            bestTime();
            alert("Game will restart");
            window.location.reload(true);
        }

        if (c[clickedCellIndex-1].textContent>0 && c[clickedCellIndex-1].textContent<=15){
            c[clickedCellIndex-1].textContent = Number(c[clickedCellIndex-1].textContent)+25;
            c[clickedCellIndex+24].textContent = Number(c[clickedCellIndex+24].textContent)+25;
        }

        else if (c[clickedCellIndex-1].textContent>15){
            c[clickedCellIndex-1].textContent=" ";
            c[clickedCellIndex+24].textContent=" ";
        }
    }

    clicks++;
    document.getElementById('counts').textContent=clicks;
    bgColor();                       //for changing backgrounds of number from 26.
}

function bgColor(){
    document.querySelectorAll('.cell').forEach((cell,index) => {
        var i= c[index].textContent;
        var j=i*6.4;
        c[index].style.backgroundColor = `rgb(${j},${j},${j})`;
    });
}

function checkClick(){
    var temp = 0;
    for (let i=0;i<check.length-1;i++){
        if (check[i+1]!=parseInt(check[i])+1) {
            temp=1;
            break
        }
    }
    return temp;
}

function restartGame(){
    window.location.reload(true);
}

bestTime();
bgColor();
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));