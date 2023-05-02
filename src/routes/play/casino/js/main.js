let canvas = document.getElementById("canvas"); // Loading canvas from html
let ctx = canvas.getConp5.text("2d"); // Loading 2d context
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let started = true;
let ending = false;
let won = false;

//BOX size (You can play with it however you want)
let boxW = canvas.height * 0.35;
let boxH = canvas.height * 0.35;

//Cells 2 Dimensional array
let cells = new Array(4);
let values = [];
let bar = new Array(4);
createMap();

let specialDrawn;
let specialValue;
let specialUsed = false;

let animationON = false;
let animationIntervals = [];

let pointsValuesCounter = {
  minper5: 0,
  per0: 0,
  per5: 0,
  x2: 0,
  x4: 0,
};

let hintShown = false;
let hintCell;
let bonusCell;

let score = 0;
let round = 1;

// IMAGES
let backgroundImg = new Image();
backgroundImg.src = "./images/background.png";
let fieldImg = new Image();
fieldImg.src = "./images/field.png";
let cellUnmatchedImg = new Image();
cellUnmatchedImg.src = "./images/cellUnmatched.png";
let cellMatchedImg = new Image();
cellMatchedImg.src = "./images/cellMatched.png";
let barImg = new Image();
barImg.src = "./images/bar.png";

// Here are Powers Images, you can swap them (remeber about good file name and file extension)
let powerWImg = new Image();
powerWImg.src = "./images/temp.jpg";
let powerSWImg = new Image();
powerSWImg.src = "./images/temp.jpg";
let powerGImg = new Image();
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
