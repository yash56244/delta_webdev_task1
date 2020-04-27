var c =document.getElementsByTagName("td");
var a;
var result = generateRandom();
var clicks=0;
var check=[];
var startTime = Date.now();
var interval = setInterval(timer, 100);
var retrievedData=JSON.parse(localStorage.getItem("best_scoresn"));
if (Array.isArray(retrievedData)){
    retrievedData.sort();
    retrievedData1=retrievedData.slice(0,5);
}else{
    retrievedData1=[];
}
var scores = retrievedData1;


for (let i = 0; i < c.length; i++) {
    c[i].innerText=result[i];                                //displaying random numbers.   
}

function timer() {
    var elapsedTime = Date.now() - startTime;
    var time = (elapsedTime / 1000).toFixed(3);
    document.getElementById("timer").innerHTML = time + "s";
    return time+"s";
}

function bestTime(){
    if (localStorage.getItem("best_scoresn")){
        var retrievedData=JSON.parse(localStorage.getItem("best_scoresn"));
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
    var result = [], randNumber,Count=16;
    while ( Count > 0) {
        randNumber = Math.round(1 + Math.random() * (15));
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

            if (c[clickedCellIndex-1].textContent>0 && c[clickedCellIndex-1].textContent<=9){
                c[clickedCellIndex-1].textContent = Number(c[clickedCellIndex-1].textContent)+16;
            }

            else if (c[clickedCellIndex-1].textContent>9){
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

        else if(c[clickedCellIndex-1].textContent==25){
            c[clickedCellIndex-1].textContent=" ";
            clearInterval(interval);
            var t=timer();
            console.log(scores);
            alert("You Won!!");                               //Win condition.
            scores.push(t);
            var str=JSON.stringify(scores);
            localStorage.setItem("best_scoresn",str);
            console.log(localStorage.getItem("best_scoresn"));
            bestTime();
            alert("Game will be restarted");
            window.location.reload(true);
        }

        if (c[clickedCellIndex-1].textContent>0 && c[clickedCellIndex-1].textContent<=9){
            c[clickedCellIndex-1].textContent = Number(c[clickedCellIndex-1].textContent)+16;
        }

        else if (c[clickedCellIndex-1].textContent>9){
            c[clickedCellIndex-1].textContent=" ";
        }
    }

    clicks++;
    document.getElementById('counts').textContent=clicks;

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
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));