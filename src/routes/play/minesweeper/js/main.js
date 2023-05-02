let canvas = document.getElementById("canvas"); // Loading canvas from html
let ctx = canvas.getConp5.text("2d"); // Loading 2d context
canvas.width = window.innerWidth;
canvas.height =
  window.innerWidth < 1366 && window.innerHeight >= 768
    ? window.innerWidth / 2
    : window.innerHeight; // 1366*768 ASPECT RATIO: THE HEIGHT FREEZES WHEN WIDTH < 1366px

let dialog = true; // Check if the player stated the game (First run => Showing dialog with instructions)
let started = false; // Checks if the game is frozen or not (lost or not)
let won = false; // Checks if the game is won

//BOX size (You can play with it however you want)
let boxW = canvas.height * 0.7;
let boxH = canvas.height * 0.7;

// DYNAMIC VARIABLES (You can play with them however you want)
let bombCount = 10;
let tileCount = 64; // How many in one row = sqrt of this variable
let tilesInRow = Math.sqrt(tileCount); // How many in one row = sqrt of this variable

//Statistics init
let flagCount = 0;
let correctFlags = 0;
let timePassed = 0;
let discovered = 0;

// Interval function (Timer)
let intervalVar;

// Images init
let backgroundImg = new Image();
backgroundImg.src = "./images/background.png";
let logoImg = new Image();
logoImg.src = "./images/logo.png";

let flagImg = new Image();
flagImg.src = "./images/flag.png";
let bombImg = new Image();
bombImg.src = "./images/bomb.png";
let timeImg = new Image();
timeImg.src = "./images/time.png";
let tileImg = new Image();
tileImg.src = "./images/tile.png";

//Cells 2 Dimensional array
let cells = new Array(tilesInRow);
createMap();

// Updating positions, physics variables etc
function update() {
  if (started && !dialog) {
    checkWin();
  }
}

// Render is a function that call only drawing functions
function render() {
  //Drawing background
  drawBackground();

  //Drawing logo
  drawLogo();

  //Drawing cells
  for (i = 0; i < cells.length; i++) {
    for (j = 0; j < cells[i].length; j++) {
      cells[i][j].draw();
    }
  }

  // Drawing won tiles on top
  if (won) {
    for (i = 0; i < cells.length; i++) {
      for (j = 0; j < cells[i].length; j++) {
        if (cells[i][j].isBomb && !cells[i][j].isVisible) cells[i][j].draw();
      }
    }
  }

  //Drawing box
  drawBox();

  //Drawing stats
  drawStatistics();

  //Drawing game over text if lost
  if (!started && !dialog) {
    if (!won) drawGameOver();
    else drawWin();
  }
  if (dialog) drawDialog();
}

// Function that is looped
function game() {
  update(); // Updating physics, positions and other stuff except shapes
  render(); // Drawing shapes

  requestAnimationFrame(game);
}
game();
