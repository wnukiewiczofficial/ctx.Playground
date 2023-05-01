var canvas = document.getElementById("canvas"); // Loading canvas from html
var ctx = canvas.getConp5.text("2d"); // Loading 2d context
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var started = true;
var ending = false;
var won = false;

//BOX size (You can play with it however you want)
var boxW = canvas.height * 0.35;
var boxH = canvas.height * 0.35;

//Cells 2 Dimensional array
var cells = new Array(4);
var values = [];
var bar = new Array(4);
createMap();

var specialDrawn;
var specialValue;
var specialUsed = false;

var animationON = false;
var animationIntervals = [];

var pointsValuesCounter = {
  minper5: 0,
  per0: 0,
  per5: 0,
  x2: 0,
  x4: 0,
};

var hintShown = false;
var hintCell;
var bonusCell;

var score = 0;
var round = 1;

// IMAGES
var backgroundImg = new Image();
backgroundImg.src = "./images/background.png";
var fieldImg = new Image();
fieldImg.src = "./images/field.png";
var cellUnmatchedImg = new Image();
cellUnmatchedImg.src = "./images/cellUnmatched.png";
var cellMatchedImg = new Image();
cellMatchedImg.src = "./images/cellMatched.png";
var barImg = new Image();
barImg.src = "./images/bar.png";

// Here are Powers Images, you can swap them (remeber about good file name and file extension)
var powerWImg = new Image();
powerWImg.src = "./images/temp.jpg";
var powerSWImg = new Image();
powerSWImg.src = "./images/temp.jpg";
var powerGImg = new Image();
powerGImg.src = "./images/temp.jpg";

function gameLoop() {
  //Drawing background
  drawBackground();

  drawField();

  //Drawing cells
  for (i = 0; i < cells.length; i++) {
    for (j = 0; j < cells[i].length; j++) {
      cells[i][j].draw();
    }
  }

  if (!ending) {
    for (let i in bar) {
      bar[i].draw();
    }
  }

  drawInfo();

  //Drawing game over text if lost
  if (!started) {
    if (!won) drawGameOver();
    else drawWin();
  }
  requestAnimationFrame(gameLoop);
}
gameLoop();
