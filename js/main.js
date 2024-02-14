let inputDir = {x: 0, y: 0}
let speed = 12;
let lastPaintTime = 0;
let snakeArray = [
    {x: 3, y:2}
]
foodObj = {
    x : 5, y:4
}
let score = 0;
let totalScore = localStorage.getItem('highestScore') ? localStorage.getItem('highestScore') : 0;
// let board = document.getElementById('board');
// Game methods
function fpsFunction (currentTime){
    window.requestAnimationFrame(fpsFunction);
    if((currentTime - lastPaintTime)/1000 < 1/speed){
        return false
    }
    lastPaintTime = currentTime
    // console.log("||", lastPaintTime);
    gameEngine()
}
function isCollide(snkArr){
    for(let i = 1; i < snakeArray.length; i++){
        if((snkArr[0].x === snkArr[i].x) && (snkArr[0].y === snkArr[i].y)){
          return true
        } 
    }
    if(snkArr[0].x >=18 || snkArr[0].x  <= 0 || snkArr[0].y >=18 || snkArr[0].y  <= 0){
        return true
    }
}
function gameEngine(){
    // Part1 : updating snake array and food
    if(isCollide(snakeArray)){
        inputDir = {x:0, y:0}
        alert("Game Over")
        snakeArray = [{x: 5, y:2}]
        score = 0;
    }

    // after eating food increase snake, score and create another food in given boundry
    if((snakeArray[0].x === foodObj.x) && (snakeArray[0].y === foodObj.y)){
        snakeArray.unshift({x: snakeArray[0].x + inputDir.x, y:snakeArray[0].y + inputDir.y})
        let a = 2;
        let b = 16;
        score = score + 1;
        if(totalScore > score){
            totalScore = totalScore
        } else {
            totalScore = score;
            localStorage.setItem('highestScore', score)
        }
        foodObj = {x: Math.round(a + (b-a)*Math.random()), y:Math.round(a + (b-a)*Math.random())}
    }


    // snake movement
    for(let i = snakeArray.length - 2; i >= 0; i--){
        snakeArray[i+1] = {...snakeArray[i]}
    }
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;


    // Part2 : Display snake and Food
    // Display snake
    document.getElementById("board").innerHTML = "";
    snakeArray.forEach((ele, indx)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = ele.y;
        snakeElement.style.gridColumnStart = ele.x;
        if(indx === 0){
            snakeElement.classList.add('head');
        } else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    // Display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = foodObj.y;
    foodElement.style.gridColumnStart = foodObj.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
    document.getElementById('scoreVal').innerHTML = score;
    document.getElementById('totalScore').innerHTML = totalScore;
    
}

// main logic starts here
window.requestAnimationFrame(fpsFunction);
window.addEventListener('keydown', e => {
    
    inputDir = {x:0, y:1}
    switch (e.key) {
        case 'ArrowUp':
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case 'ArrowDown':
            inputDir.x = 0;
            inputDir.y = 1;      
            break;
        case 'ArrowLeft':
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case 'ArrowRight':
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
                break;
    }

})
                  

document.getElementById('upBtn').addEventListener('click', ()=>{
            inputDir.x = 0;
            inputDir.y = -1;
})
document.getElementById('leftBtn').addEventListener('click',()=>{
            inputDir.x = -1;
            inputDir.y = 0;
})
document.getElementById('rightBtn').addEventListener('click',()=>{
            inputDir.x = 1;
            inputDir.y = 0;
})
document.getElementById('downBtn').addEventListener('click',()=>{
            inputDir.x = 0;
            inputDir.y = 1;  
})




