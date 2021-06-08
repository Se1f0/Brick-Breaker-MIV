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
var win = false;

let chance = 3;
let left = false;
let right = false;
let objects = [];

const gameBG = new Image();
gameBG.src = "assets/Pack/Background/image1.jpg";

const padIMG = new Image();
padIMG.src = "assets/Pack/Bats/bat_yellow.png";

const ballIMG = new Image();
ballIMG.src = "assets/Pack/Balls/ball_silver.png";

const object1IMG = new Image();
object1IMG.src = "assets/Pack/Bricks/brick_green_small.png";

const objectCracked1IMG = new Image();
objectCracked1IMG.src = "assets/Pack/Bricks/brick_green_small_cracked.png";

const object2IMG = new Image();
object2IMG.src = "assets/Pack/Bricks/brick_blue_small.png";

const objectCracked2IMG = new Image();
objectCracked2IMG.src = "assets/Pack/Bricks/brick_blue_small_cracked.png";

const object3IMG = new Image();
object3IMG.src = "assets/Pack/Bricks/brick_violet_small.png";

const objectCracked3IMG = new Image();
objectCracked3IMG.src = "assets/Pack/Bricks/brick_violet_small_cracked.png";