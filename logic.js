var canv = document.getElementById('Brick') ;
var ctx = canv.getContext('2d');

var srcXpad = 25;
var srcYpad = 179;
var srcWidthPad = 463;
var srcHeightPad = 101;
var padWidth = 100;
var padHeight = 20;
var padSpace = 50;

var ballRadius = 8.5;

let chance = 3;
let left = false;
let right = false;

//class de la raquette
const pad = {
    x : canv.width / 2 - padWidth / 2,
    y : canv.height - padSpace - padHeight,
    width : padWidth,
    height : padHeight,
    dx : 5
}

//class de la balle
const ball = {
    x : canv.width / 2 - ballRadius,
    y : pad.y - (ballRadius+12.5),
    radius : ballRadius,
    speed : 4,
    dx : 3 * (Math.random() * 2 - 1),
    dy : -3
}

//Pour dessiner la raquette
function drawPad() {
    ctx.drawImage(padIMG,srcXpad,srcYpad,srcWidthPad,srcHeightPad,pad.x,pad.y,pad.width,pad.height);
    //ctx.drawImage(padIMG,pad.x,pad.y,pad.width,pad.height);
}

//Pour dessiner la balle
function drawBall() {
    ctx.drawImage(ballIMG,ball.x,ball.y,25,25);
}

document.addEventListener("keydown", function(event){
    if(event.keyCode == 37){
        left = true;
    }else if(event.keyCode == 39){
        right = true;
    }
});
document.addEventListener("keyup", function(event){
    if(event.keyCode == 37){
        left = false;
    }else if(event.keyCode == 39){
        right = false;
    }
});

function movePad() {
    if (right && pad.x + pad.width < canv.width) {
        pad.x += pad.dx;
    }
    if (left && pad.x > 0) {
        pad.x -= pad.dx;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

function draw() {
    drawPad();
    drawBall();
}

function ballWallCol() {
    if (ball.x + 21 > canv.width || ball.x + 4 < 0) {
        ball.dx = -ball.dx; 
    }
    if (ball.y + 4< 0) {
        ball.dy = -ball.dy;
    }
    if (ball.y + 21 > canv.height) {
        chance--;
        initBall();
    }
}

function ballPadCol() {
    if (ball.x + 21 < pad.x + pad.width && ball.x + 21 > pad.x && ball.y + 21 < pad.y + pad.height && ball.y + 21 > pad.y) {
        let colPoint = ball.x - (pad.x + pad.width/2);
        colPoint = colPoint / (pad.width/2);

        let alpha = colPoint * Math.PI / 3;

        ball.dx = ball.speed * Math.sin(alpha);
        ball.dy = -ball.speed * Math.cos(alpha);
    }
}

function initBall() {
    ball.x = canv.width / 2 - ballRadius;
    ball.y = pad.y - (ballRadius+12.5);
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;
}
function update() {
    movePad();
    moveBall();
    ballWallCol();
    ballPadCol();
}

function gameLoop() {
    ctx.drawImage(gameBG,0,0);
    draw();
    update();
    requestAnimationFrame(gameLoop);
}
gameLoop();
