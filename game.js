window.onload = function(){


// =========================
// 기본 요소 연결
// =========================

const game =
document.getElementById("gameContainer");


const bird =
document.getElementById("bird");


const startScreen =
document.getElementById("startScreen");


const gameOverScreen =
document.getElementById("gameOverScreen");


const startButton =
document.getElementById("startButton");


const restartButton =
document.getElementById("restartButton");


const scoreText =
document.getElementById("score");


const bestText =
document.getElementById("best");


const finalScore =
document.getElementById("finalScore");




// =========================
// 게임 변수
// =========================


let playing=false;


let birdY=300;

let velocity=0;


const gravity=0.45;

const jumpPower=-9;



let score=0;


let best=
Number(localStorage.getItem("skyBest")) || 0;



bestText.innerText=best;



let pipes=[];



let gameSpeed=3;



let spawnTimer;






// =========================
// 점프
// =========================


function jump(){


if(!playing)return;


velocity=jumpPower;


}




document.addEventListener(
"keydown",
function(e){


if(e.code==="Space"){

jump();

}


});




game.addEventListener(
"click",
jump
);







// =========================
// 시작
// =========================


startButton.onclick=function(){

startGame();

};



restartButton.onclick=function(){

startGame();

};







function startGame(){


startScreen.style.display="none";


gameOverScreen.style.display="none";



clearInterval(spawnTimer);



removeObjects();




playing=true;


score=0;


scoreText.innerText=0;



birdY=300;

velocity=0;



gameSpeed=3;



spawnTimer=setInterval(
createObstacle,
1800
);



requestAnimationFrame(gameLoop);



}









// =========================
// 게임 루프
// =========================


function gameLoop(){


if(!playing)return;



// 중력

velocity+=gravity;


birdY+=velocity;



bird.style.top=
birdY+"px";





// 바닥 충돌


if(
birdY<0 ||
birdY>650
){

gameOver();

return;

}




moveObstacles();



requestAnimationFrame(gameLoop);



}









// =========================
// 장애물 생성
// =========================


function createObstacle(){



if(!playing)return;




let moving=
Math.random()<0.3;
// 30% 확률 이동 장애물



if(moving){


createMovingObstacle();


}

else{


createNormalObstacle();


}



}





// 일반 장애물


function createNormalObstacle(){


let gap=220;


let topHeight=
Math.random()*250+80;



let bottomHeight=
700-topHeight-gap;





let top=createPipe();


top.style.height=
topHeight+"px";


top.style.top="0px";




let bottom=createPipe();


bottom.style.height=
bottomHeight+"px";


bottom.style.bottom="0px";





addObstacle(top);

addObstacle(bottom);



}







// =========================
// 움직이는 장애물
// =========================


function createMovingObstacle(){



let pipe=createPipe();


let height=250;



pipe.style.height=
height+"px";


pipe.style.top="200px";



pipe.dataset.move="true";

pipe.dataset.direction="1";



addObstacle(pipe);



}








// 장애물 생성 함수


function createPipe(){


let pipe=
document.createElement("div");


pipe.className="pipe";


pipe.style.left="400px";


game.appendChild(pipe);


return pipe;


}





// 장애물 등록


function addObstacle(pipe){


pipes.push({

element:pipe,

passed:false,

move:pipe.dataset.move==="true",

direction:1,

offset:0


});


}








// =========================
// 장애물 이동
// =========================


function moveObstacles(){



pipes.forEach((obj,index)=>{



let pipe=obj.element;



let x=
pipe.offsetLeft;



pipe.style.left=
x-gameSpeed+"px";






// 움직이는 장애물


if(obj.move){



obj.offset +=
obj.direction*2;



if(
obj.offset>120 ||
obj.offset<0
){

obj.direction*=-1;


}



pipe.style.transform=
`translateY(${obj.offset}px)`;


}








// 점수


if(
!obj.passed &&
x<80
){


obj.passed=true;


score++;


scoreText.innerText=score;



if(score%10===0){

gameSpeed+=0.4;

}


}








// 삭제


if(x<-100){


pipe.remove();


pipes.splice(index,1);


return;


}




collision(pipe);



});



}








// =========================
// 충돌
// =========================


function collision(pipe){



let b=
bird.getBoundingClientRect();


let p=
pipe.getBoundingClientRect();




if(

b.left<p.right &&
b.right>p.left &&
b.top<p.bottom &&
b.bottom>p.top

){


gameOver();


}



}









// =========================
// 게임 종료
// =========================


function gameOver(){


playing=false;


clearInterval(spawnTimer);



finalScore.innerText=score;



if(score>best){


best=score;


localStorage.setItem(
"skyBest",
best
);


bestText.innerText=best;


}



gameOverScreen.style.display="flex";



}







// =========================
// 초기화
// =========================


function removeObjects(){


pipes.forEach(
obj=>obj.element.remove()
);


pipes=[];


}



};
