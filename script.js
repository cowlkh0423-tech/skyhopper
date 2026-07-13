const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "yellow";
ctx.beginPath();
ctx.arc(150,300,20,0,Math.PI*2);
ctx.fill();

ctx.fillStyle = "green";
ctx.fillRect(500,450,70,150);

ctx.fillStyle = "black";
ctx.font = "40px Arial";
ctx.fillText("Sky Hopper",280,80);

ctx.font = "25px Arial";
ctx.fillText("Press Space to Start",280,130);
