var canvas = document.getElementById("canvas"); // Loading canvas from html
var ctx = canvas.getConp5.text("2d"); // Loading 2d context
canvas.width = window.innerWidth;
canvas.height =
  window.innerWidth < 1366 && window.innerHeight >= 768
    ? window.innerWidth / 2
    : window.innerHeight; // 1366*768 ASPECT RATIO: THE HEIGHT FREEZES WHEN WIDTH < 1366px

var dialog = true; // Check if the player stated the game (First run => Showing dialog with instructions)
var started = false; // Checks if the game is frozen or not (lost or not)

// Dynamic variables for animations
var scoreFontSize = canvas.width / 32;

// Images
var logo = new Image();
logo.src = "./images/gameLogo.png";

var bgImage = new Image();
bgImage.src = "./images/background.png";

var lComputerImage = new Image();
lComputerImage.src = "./images/buyComputer.png";
var rComputerImage = new Image();
rComputerImage.src = "./images/sellComputer.png";

var manImage = new Image();
manImage.src = "./images/man.png";

var coinImage = new Image();
coinImage.src = "./images/coin.png";
var bombImage = new Image();
bombImage.src = "./images/bomb.png";

//Blocks Array
var blocks = [];

//Fallings
var fallings = [];
var fallingInterval;

//Selector obj
var selector = new Selector();

//Pointer
var pointer = new Pointer();

// Man obj
var man = new Man();

// Creating new blocks
for (i = 0; i < 7; i++) {
  blocks[i] = new Block(i * (canvas.height / 6));
}

// Updating positions, physics variables etc
function update() {
  if (started && !dialog) {
    //Moving blocks
    blocks.forEach((block) => {
      block.move();
    });

    //Moving fallings
    fallings.forEach((falling) => {
      falling.fall();
    });

    pointer.move();
  } else {
  }
}

// Render is a function that call only drawing functions
function render() {
  //Drawing background
  drawBackground();

  //Drawing logo
  drawLogo();

  //Drawing left and right computer
  drawComputers();

  //Drawing scroll Window
  drawScrollWindow();

  //Drawing score
  drawScore();

  //Drawing blocks
  blocks.forEach((block) => {
    block.draw();
  });

  //Drawing fallings
  fallings.forEach((falling) => {
    falling.draw();
  });

  //Drawing selector
  selector.draw();

  //Drawing man
  man.draw();

  //Drawing pointer
  pointer.draw();

  // REPLAY COMMENTED OUT
  //Drawing replay if lost
  // if(!started && !dialog) drawReplayButton();

  //Drawing game over text if lost
  if (!started && !dialog) drawGameOver();
  if (dialog) drawDialog();
}

// Function that is looped
function game() {
  update(); // Updating physics, positions and other stuff except shapes
  render(); // Drawing shapes

  requestAnimationFrame(game);
}
game();
