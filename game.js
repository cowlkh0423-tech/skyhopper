window.onload = function(){

const game = document.getElementById("game");

const bird = document.getElementById("bird");

const startScreen = document.getElementById("startScreen");
const overScreen = document.getElementById("overScreen");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const scoreText = document.getElementById("score");
const bestText = document.getElementById("best");
const resultText = document.getElementById("result");


let birdY = 300;
let velocity = 0;

const gravity = 0.5;
const jumpPower = -9;


let playing = false;

let score = 0;

let best = Number(localStorage.getItem("skyBest")) || 0;

let pipes = [];

let speed = 3;


bestText.innerText = best;



// 점프

function jump(){

    if(playing){

        velocity = jumpPower;

    }

}



// 키보드

document.addEventListener(
"keydown",
function(e){

    if(e.code === "Space"){

        jump();

    }

});


// 터치

game.addEventListener(
"click",
function(){

    jump();

});





// 시작 버튼

startBtn.onclick = function(){

    startGame();

};



// 재시작

restartBtn.onclick = function(){

    startGame();

};





function startGame(){


    startScreen.style.display="none";

    overScreen.style.display="none";


    pipes.forEach(function(pipe){

        pipe.remove();

    });


    pipes=[];


    score=0;

    scoreText.innerText=0;


    birdY=300;

    velocity=0;


    speed=3;


    playing=true;


    gameLoop();


    pipeLoop();


}





// 게임 반복

function gameLoop(){


    if(!playing)return;


    velocity += gravity;


    birdY += velocity;


    bird.style.top = birdY+"px";



    if(
        birdY < 0 ||
        birdY > 655
    ){

        gameOver();

        return;

    }



    movePipes();



    requestAnimationFrame(gameLoop);

}






// 장애물 생성

function createPipe(){


    let gap = 200;


    let topHeight =
    Math.random()*250+50;


    let bottomHeight =
    700-topHeight-gap;




    let top =
    document.createElement("div");


    top.className="pipe";


    top.style.height =
    topHeight+"px";


    top.style.top="0px";




    let bottom =
    document.createElement("div");



    bottom.className="pipe";


    bottom.style.height =
    bottomHeight+"px";


    bottom.style.bottom="0px";



    game.appendChild(top);

    game.appendChild(bottom);



    pipes.push(top);

    pipes.push(bottom);


}






// 장애물 반복 생성

function pipeLoop(){


    if(!playing)return;



    createPipe();


    score++;

    scoreText.innerText=score;



    if(score%15===0){

        speed+=0.3;

    }



    setTimeout(
        pipeLoop,
        1800
    );

}






// 장애물 이동

function movePipes(){


    pipes.forEach(
    function(pipe,index){



        let x =
        pipe.offsetLeft;



        pipe.style.left =
        x-speed+"px";



        if(x < -100){

            pipe.remove();

            pipes.splice(index,1);

            return;

        }



        collision(pipe);



    });


}







// 충돌

function collision(pipe){


    let b =
    bird.getBoundingClientRect();


    let p =
    pipe.getBoundingClientRect();



    if(

    b.left < p.right &&
    b.right > p.left &&
    b.top < p.bottom &&
    b.bottom > p.top

    ){

        gameOver();

    }


}






// 종료

function gameOver(){


    playing=false;


    resultText.innerText=score;


    if(score > best){

        best=score;

        localStorage.setItem(
            "skyBest",
            best
        );


        bestText.innerText=best;

    }



    overScreen.style.display="flex";


}


};
