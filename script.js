const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// ======================
// 설정
// ======================
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const gravity = 0.5;
const jumpPower = -9;

let gameStarted = false;
let gameOver = false;

// ======================
// 새
// ======================
const bird = {
    x:150,
    y:300,
    width:35,
    height:35,
    velocity:0
};

// ======================
// 입력
// ======================
document.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){

        e.preventDefault();

        if(!gameStarted){
            gameStarted=true;
        }

        if(!gameOver){
            bird.velocity=jumpPower;
        }
    }

    if(e.code==="KeyR" && gameOver){
        restartGame();
    }

});

// ======================
// 재시작
// ======================
function restartGame(){

    bird.y=300;
    bird.velocity=0;

    gameStarted=false;
    gameOver=false;

}

// ======================
// 업데이트
// ======================
function update(){

    if(!gameStarted) return;
    if(gameOver) return;

    bird.velocity+=gravity;
    bird.y+=bird.velocity;

    // 바닥 충돌
    if(bird.y+bird.height>=HEIGHT){

        bird.y=HEIGHT-bird.height;
        gameOver=true;

    }

    // 천장 충돌
    if(bird.y<=0){

        bird.y=0;
        bird.velocity=0;

    }

}

// ======================
// 그리기
// ======================
function draw(){

    ctx.clearRect(0,0,WIDTH,HEIGHT);

    // 하늘
    ctx.fillStyle="#87CEEB";
    ctx.fillRect(0,0,WIDTH,HEIGHT);

    // 바닥
    ctx.fillStyle="#2ecc71";
    ctx.fillRect(0,560,900,40);

    // 새
    ctx.fillStyle="yellow";
    ctx.beginPath();
    ctx.arc(
        bird.x+bird.width/2,
        bird.y+bird.height/2,
        bird.width/2,
        0,
        Math.PI*2
    );
    ctx.fill();

    ctx.fillStyle="black";
    ctx.font="28px Arial";

    if(!gameStarted){

        ctx.fillText("SKY HOPPER",300,180);
        ctx.fillText("Press SPACE",300,230);

    }

    if(gameOver){

        ctx.fillStyle="red";
        ctx.font="50px Arial";
        ctx.fillText("GAME OVER",250,220);

        ctx.fillStyle="black";
        ctx.font="30px Arial";
        ctx.fillText("Press R to Restart",250,280);

    }

}

// ======================
// 게임 루프
// ======================
function gameLoop(){

    update();
    draw();

    requestAnimationFrame(gameLoop);

}

gameLoop();
