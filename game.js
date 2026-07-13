
window.onload=function(){



// ===============================
// 요소 연결
// ===============================


const game=document.getElementById("game");


const bird=document.getElementById("bird");


const startScreen=document.getElementById("startScreen");


const gameOverScreen=document.getElementById("gameOverScreen");


const startButton=document.getElementById("startButton");


const restartButton=document.getElementById("restartButton");



const scoreText=document.getElementById("score");

const bestText=document.getElementById("best");

const levelText=document.getElementById("level");

const finalScore=document.getElementById("finalScore");


const windWarning=document.getElementById("windWarning");




// ===============================
// 게임 변수
// ===============================


let playing=false;


let birdY=350;


let velocity=0;


const gravity=0.45;


const jumpPower=-8;



let score=0;


let best=

Number(localStorage.getItem("skyBest")) || 0;



bestText.innerText=best;



let obstacles=[];


let level=1;


let speed=4;



let wind=false;


let rotateList=[];



let spawn;




// ===============================
// 점프
// ===============================


function jump(){


if(!playing)return;


velocity=jumpPower;



}




document.addEventListener(
"keydown",
e=>{


if(e.code==="Space")

jump();


});



game.addEventListener(
"click",
jump
);






// ===============================
// 시작
// ===============================


startButton.onclick=startGame;


restartButton.onclick=startGame;





function startGame(){


startScreen.style.display="none";


gameOverScreen.style.display="none";



clearInterval(spawn);



removeAll();




playing=true;


score=0;


scoreText.innerText=0;


level=1;


levelText.innerText=1;



speed=4;


birdY=350;


velocity=0;



spawn=setInterval(
createObstacle,
1500
);



requestAnimationFrame(loop);



}









// ===============================
// 게임 루프
// ===============================


function loop(){


if(!playing)return;



velocity+=gravity*(wind?1.4:1);


birdY+=velocity;


bird.style.top=
birdY+"px";





if(
birdY<0 ||
birdY>770
){

gameOver();

return;

}





moveObstacle();



requestAnimationFrame(loop);



}








// ===============================
// 난이도
// ===============================


function updateLevel(){



if(score<30)

level=1;


else if(score<60)

level=2;


else if(score<90)

level=3;


else

level=4;



levelText.innerText=level;



if(level===1)

speed=4;


if(level===2)

speed=5;


if(level===3)

speed=6;


if(level===4)

speed=7;



}










// ===============================
// 장애물 생성
// ===============================


function createObstacle(){



updateLevel();



let type;



let r=Math.random();



if(level===1){

type="normal";


}



else if(level===2){


type=

r<0.5?

"normal":

"moving";


}




else if(level===3){


if(r<0.4)

type="normal";


else if(r<0.7)

type="moving";


else

type="wind";



}



else{


if(r<0.25)

type="normal";


else if(r<0.5)

type="moving";


else if(r<0.75)

type="wind";


else

type="rotate";



}






if(type==="normal")

createNormal();


if(type==="moving")

createMoving();


if(type==="wind")

createWind();


if(type==="rotate")

createRotate();



}








// ===============================
// 일반 장애물
// ===============================


function createNormal(){


let gap;



if(level===1)

gap=180;


else if(level===2)

gap=150;


else if(level===3)

gap=120;


else

gap=100;



let topHeight=
Math.random()*300+50;



let bottomHeight=
800-topHeight-gap;




makePipe(
topHeight,
"top"
);



makePipe(
bottomHeight,
"bottom"
);



}





function makePipe(height,pos){


let pipe=document.createElement("div");


pipe.className="pipe";


pipe.style.height=height+"px";


pipe.style.left="500px";



if(pos==="top")

pipe.style.top="0";


else

pipe.style.bottom="0";



game.appendChild(pipe);



obstacles.push({

el:pipe,

passed:false

});



}








// ===============================
// 위아래 이동 장애물
// ===============================


function createMoving(){


createNormal();



let pipe=
obstacles[obstacles.length-1];


pipe.move=true;


pipe.offset=0;


pipe.dir=1;



}









// ===============================
// 바람 장애물
// ===============================


function createWind(){


createNormal();



wind=true;


windWarning.style.display="block";



setTimeout(()=>{


wind=false;


windWarning.style.display="none";


},4000);



}









// ===============================
// 회전 장애물
// ===============================


function createRotate(){


let obj=document.createElement("div");


obj.className="rotatePipe";


obj.style.left="500px";


obj.style.top=

Math.random()*600+100+"px";



game.appendChild(obj);



obstacles.push({

el:obj,

passed:false,

rotate:true,

angle:0


});



}









// ===============================
// 장애물 이동
// ===============================


function moveObstacle(){



obstacles.forEach((o,i)=>{



let x=o.el.offsetLeft;



o.el.style.left=
x-speed+"px";




if(o.move){


o.offset+=o.dir*2;



if(
o.offset>80 ||
o.offset<0
)

o.dir*=-1;



o.el.style.transform=

`translateY(${o.offset}px)`;


}





if(o.rotate){


o.angle+=5;


o.el.style.transform=

`rotate(${o.angle}deg)`;



}




if(!o.passed && x<100){


o.passed=true;


score++;


scoreText.innerText=score;



}





if(x<-150){


o.el.remove();


obstacles.splice(i,1);



}



collision(o.el);



});



}









// ===============================
// 충돌
// ===============================


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









// ===============================
// 종료
// ===============================


function gameOver(){


playing=false;


clearInterval(spawn);



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








function removeAll(){


obstacles.forEach(o=>{


o.el.remove();


});


obstacles=[];


}



};
