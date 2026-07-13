// Sky Hopper 안정화 버전

window.onload = function(){

const player = document.getElementById("player");
const gameContainer = document.getElementById("gameContainer");

const scoreText = document.getElementById("scoreValue");
const bestText = document.getElementById("bestValue");

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

const finalScore = document.getElementById("finalScore");


// 요소 확인
if(!player || !gameContainer){
    alert("게임 요소를 찾을 수 없습니다.");
    return;
}



let playerY = 300;
let velocity = 0;

let gravity = 0.5;
let jumpPower = -9;

let running = false;

let score = 0;

let bestScore = Number(localStorage.getItem("skyBest")) || 0;

let obstacles = [];

let speed = 3;



bestText.innerText = bestScore;



// 점프

function jump(){

    if(running){

        velocity = jumpPower;

    }

}



// 키 입력

document.addEventListener("keydown",function(e){

    if(e.code==="Space"){

        jump();

    }

});


// 화면 클릭

gameContainer.addEventListener("click",jump);




// 시작 버튼

startButton.addEventListener("click",function(){

    startGame();

});


// 재시작 버튼

restartButton.addEventListener("click",function(){

    startGame();

});




// 게임 시작

function startGame(){

    startScreen.style.display="none";
    gameOverScreen.style.display="none";


    score=0;

    scoreText.innerText=score;


    speed=3;


    playerY=300;

    velocity=0;


    obstacles.forEach(function(o){

        o.remove();

    });


    obstacles=[];


    running=true;


    gameLoop();


    createObstacleLoop();

}



// 게임 진행

function gameLoop(){


    if(!running)return;



    velocity += gravity;

    playerY += velocity;


    player.style.top = playerY+"px";



    if(playerY < 0 || playerY > 660){

        endGame();

        return;

    }



    moveObstacles();



    requestAnimationFrame(gameLoop);

}



// 장애물 만들기

function createObstacle(){


    if(!running)return;


    let gap = 220;


    let topHeight =
        Math.floor(Math.random()*250)+50;


    let bottomHeight =
        700-topHeight-gap;



    let top = document.createElement("div");

    top.className="obstacle";

    top.style.height=topHeight+"px";

    top.style.top="0px";



    let bottom=document.createElement("div");

    bottom.className="obstacle";

    bottom.style.height=bottomHeight+"px";

    bottom.style.bottom="0px";



    gameContainer.appendChild(top);

    gameContainer.appendChild(bottom);


    obstacles.push(top);

    obstacles.push(bottom);

}



// 장애물 반복

function createObstacleLoop(){


    if(!running)return;


    createObstacle();


    score++;

    scoreText.innerText=score;



    if(score%15===0){

        speed+=0.3;

    }


    setTimeout(createObstacleLoop,2000);

}




// 장애물 이동

function moveObstacles(){


    obstacles.forEach(function(obstacle,index){


        let right =
        parseInt(obstacle.style.right || -80);



        right += speed;


        obstacle.style.right=right+"px";



        if(right>450){

            obstacle.remove();

            obstacles.splice(index,1);

            return;

        }


        checkCollision(obstacle);


    });

}




// 충돌

function checkCollision(obstacle){


    let p = player.getBoundingClientRect();

    let o = obstacle.getBoundingClientRect();



    if(

        p.left < o.right &&
        p.right > o.left &&
        p.top < o.bottom &&
        p.bottom > o.top

    ){

        endGame();

    }

}




// 게임 종료

function endGame(){


    running=false;


    finalScore.innerText=score;


    if(score>bestScore){

        bestScore=score;

        localStorage.setItem(
            "skyBest",
            bestScore
        );

        bestText.innerText=bestScore;

    }


    gameOverScreen.style.display="flex";

}


};
