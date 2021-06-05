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

var count = 0;
var score = 0;
var level = 1;
var over = false;

let chance = 3;
let left = false;
let right = false;
let objects = [];
let colors = ["blue","green","pink","violet","yellow"];

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
    speed : 5,
    dx : 4 * (Math.random() * 2 - 1),
    dy : -4
}

//class de l'objet
const object = { 
    r : 3,
    c : 5,
    width : 55,
    height : 20,
    spaceLeft : 20,
    spaceUp : 20,
    bigSpace : 40,
    srcX : 141,
    srcY : 178,
    srcWidth : 231,
    srcHeight : 101
}

//matrice logique des objets
function creatObjects() {
    console.log("he");
    for (let i = 0; i < object.r; i++) {
        objects[i] = [];
        for (let j = 0; j < object.c; j++) {
            objects[i][j] = {
                x : j * (object.spaceLeft + object.width) + object.spaceLeft,
                y : i * (object.spaceUp + object.height) + object.spaceUp + object.bigSpace,
                type : 1
            }
        }
    }
} 
creatObjects();

//Pour dessiner les objets
function drawObjects() {
    for (let i = 0; i < object.r; i++) {
        for (let j = 0; j < object.c; j++) {
            if (objects[i][j].type === 1) {
                switch (level) {
                    case 1:{
                        ctx.drawImage(object1IMG,object.srcX,object.srcY,object.srcWidth,object.srcHeight,objects[i][j].x,objects[i][j].y,object.width,object.height);        
                        break;
                    }
                    case 2:{
                        ctx.drawImage(object2IMG,object.srcX,object.srcY,object.srcWidth,object.srcHeight,objects[i][j].x,objects[i][j].y,object.width,object.height);        
                        break;
                    }
                    case 3:{
                        ctx.drawImage(object3IMG,object.srcX,object.srcY,object.srcWidth,object.srcHeight,objects[i][j].x,objects[i][j].y,object.width,object.height);        
                        break;
                    }
                }
                //ctx.drawImage(object1IMG,object.srcX,object.srcY,object.srcWidth,object.srcHeight,objects[i][j].x,objects[i][j].y,object.width,object.height);
            }
            if (objects[i][j].type === 0) {
                switch (level) {
                    case 1:{
                        ctx.drawImage(objectCracked1IMG,object.srcX,object.srcY,object.srcWidth,object.srcHeight,objects[i][j].x,objects[i][j].y,object.width,object.height);        
                        break;
                    }
                    case 2:{
                        ctx.drawImage(objectCracked2IMG,object.srcX,object.srcY,object.srcWidth,object.srcHeight,objects[i][j].x,objects[i][j].y,object.width,object.height);        
                        break;
                    }
                    case 3:{
                        ctx.drawImage(objectCracked3IMG,object.srcX,object.srcY,object.srcWidth,object.srcHeight,objects[i][j].x,objects[i][j].y,object.width,object.height);        
                        break;
                    }
                }
                //ctx.drawImage(objectCracked1IMG,object.srcX,object.srcY,object.srcWidth,object.srcHeight,objects[i][j].x,objects[i][j].y,object.width,object.height);
            }
        }
    }
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
//Pour dessiner le score,les vies et le niveau
function drawInfos() {
    ctx.fillStyle = "#daa520";
    ctx.font = "italic 20px astro";
    ctx.fillText("SCORE:",10,25);
    ctx.fillStyle = "#c0c0c0";
    ctx.font = "20px astro";
    ctx.fillText(score,95,25);

    ctx.fillStyle = "#ff4500";
    ctx.font = "italic 20px astro";
    ctx.fillText("LIFES:",160,25);
    ctx.fillStyle = "#c0c0c0";
    ctx.font = "20px astro";
    ctx.fillText(chance,235,25);

    if (level === 1) {
        ctx.fillStyle = "#7cfc00";
        ctx.font = "italic 20px astro";
        ctx.fillText("EASY",295,25);    
    }
    if (level === 2) {
        ctx.fillStyle = "#75BEF7";
        ctx.font = "italic 20px astro";
        ctx.fillText("MEDIUM",295,25);    
    }
    if (level === 3) {
        ctx.fillStyle = "#F76CEC";
        ctx.font = "italic 20px astro";
        ctx.fillText("HARD",295,25);    
    }
}

//mouvement de la raquette
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

// deplacement de la balle 
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

//collision de la balle avec le mur 
function ballWallCol() {
    if (ball.x + 21 > canv.width || ball.x + 4 < 0) {
        ball.dx = -ball.dx; 
    }
    if (ball.y + 4< 0) {
        ball.dy = -ball.dy;
    }
    if (ball.y + 21 > canv.height) {
        chance--;
        initPad();
        initBall();
    }
}

//collision de la balle avec la raquette
function ballPadCol() {
    if (ball.x + 21 < pad.x + pad.width && ball.x + 21 > pad.x && ball.y + 21 < pad.y + pad.height && ball.y + 21 > pad.y) {
        let colPoint = ball.x - (pad.x + pad.width/2);
        colPoint = colPoint / (pad.width/2);

        let alpha = colPoint * Math.PI / 3;

        ball.dx = ball.speed * Math.sin(alpha);
        ball.dy = -ball.speed * Math.cos(alpha);
    }
}

//collision de la balle avec les objets
function ballObjCol() {
    for (let i = 0; i < object.r; i++) {
        for (let j = 0; j < object.c; j++) {
            if (objects[i][j].type !== -1) {
                if (ball.x + 21 > objects[i][j].x && ball.x + 4 < objects[i][j].x + object.width && ball.y + 21 > objects[i][j].y && ball.y + 4 < objects[i][j].y + object.height) {
                    ball.dy = -ball.dy;
                    score += 10;
                    objects[i][j].type--;
                    if (objects[i][j].type === -1) {
                        count++;
                    }
                }
            }
        }
    }
}

// etat et position initial de la ball
function initBall() {
    ball.x = canv.width / 2 - ballRadius;
    ball.y = pad.y - (ballRadius+12.5);
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;
}

// etat et position initial de la raquette
function initPad() {
    pad.x = canv.width / 2 - padWidth / 2;
    pad.y = canv.height - padSpace - padHeight;
}

function leveling() {
    if ((level === 1 && count === 15) || (level === 2 && count === 20)) {
        object.r++;
        creatObjects();
        ball.speed += 1;
        score = 0;
        initBall();
        initPad();
        level++;
        chance = 4 - level;
        count = 0;
    }
}

//verification de l'etat du jeu
function gameOver() {
    if (chance <= 0) {
        over = true;
    }
}


function draw() {
    drawInfos();
    drawPad();
    drawBall();
    drawObjects();
}

function update() {
    movePad();
    moveBall();
    ballWallCol();
    ballPadCol();
    ballObjCol();
    gameOver();
    leveling();
}

function gameLoop() {
    ctx.drawImage(gameBG,0,0);
    update();
    draw();
    if (!over) {
        requestAnimationFrame(gameLoop);   
    }
}
gameLoop();
