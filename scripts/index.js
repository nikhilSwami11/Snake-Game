//VARIABLES AND CONSTANTS
let direction = {x:0, y:0};
let lastPaintTime = 0;
let speed = 2;
let score = 0;
let highScoreVal =0;
let snakeArr =[
    {x:15 , y:13}
]
let food = {x: 26, y:16};

if(localStorage.getItem("highScore")===null){
    localStorage.setItem("highscore",highScoreVal);
}


//GAME FUNCTIONS
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/100 <1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}

function isCollide(sarr){
    for(let i=1 ; i< snakeArr.length ;i++){
        if(sarr[i].x ===snakeArr[0].x && sarr[i].y ===snakeArr[0].y){
            return true;
        }
    }
    if(sarr[0].x>=40 || sarr[0].x<=0 ||sarr[0].y>=40 || sarr[0].y<=0 ){
        return true;
    }
    else{
        return false;
    }
}
function gameEngine(){

    // PART 1 FOR UPDATING SNAKE ARRAY
    if(isCollide(snakeArr)){
        direction = {x:0,y:0};
        alert("game over press any key to play again");
        snakeArr =[{x:15,y:13}];
        score = 0;
    }

    //if snake eats the food
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        snakeArr.unshift({x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y});
        let a = 10;
        let b = 30;
        score++;
        if(score>highScoreVal){
            localStorage.setItem("highScore",score);
            highScoreVal = score;
            highScore.innerHTML = "High Score: " + highScoreVal;
        }
        scoreBox.innerHTML = "Score: " + score;
        food = {x : Math.round( a + (b -a)*Math.random()), y: Math.round( a + (b -a)*Math.random())}
    }

    //MOVEMENT OF SANKE
    for( let i = snakeArr.length -2 ;i>=0;i--){
        snakeArr[i+1] = {...snakeArr[i]};

    }
    snakeArr[0].x += direction.x;
    snakeArr[0].y+= direction.y;

    //PART 2 FOR RENDERENG FOOD AND SNAKE VARIBALE
    //SNAKE UPDATION
    playbox.innerHTML ="";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart= e.x;
        snakeElement.classList.add('head');
        playbox.appendChild(snakeElement);
    })

    //FOOD UPDATION
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart =food.x;
    foodElement.classList.add('food');
    playbox.appendChild(foodElement);
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    direction={x:0,y:1};

    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            direction.x = 0;
            direction.y = -1;
            break;
        
        case "ArrowDown":
            console.log("ArrowDown");
            direction.x = 0;
            direction.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            direction.x = -1;
            direction.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            direction.x = 1;
            direction.y = 0;
            break;
        default: break;
    }
})