let canvas = document.getElementById("canvas"); // Loading canvas from html
let ctx = canvas.getConp5.text("2d"); // Loading 2d context
canvas.width = window.innerWidth;
canvas.height =
  window.innerWidth < 1366 && window.innerHeight >= 768
    ? window.innerWidth / 2
    : window.innerHeight; // 1366*768 ASPECT RATIO: THE HEIGHT FREEZES WHEN WIDTH < 1366px

let dialog = true; // Check if the player stated the game (First run => Showing dialog with instructions)
let started = false; // Checks if the game is frozen or not (lost or not)

// Dynamic variables for animations
let scoreFontSize = canvas.width / 32;

// Images
let logo = new Image();
logo.src = "./images/gameLogo.png";

let bgImage = new Image();
bgImage.src = "./images/background.png";

let lComputerImage = new Image();
lComputerImage.src = "./images/buyComputer.png";
let rComputerImage = new Image();
rComputerImage.src = "./images/sellComputer.png";

let manImage = new Image();
manImage.src = "./images/man.png";

let coinImage = new Image();
coinImage.src = "./images/coin.png";
let bombImage = new Image();
bombImage.src = "./images/bomb.png";

//Blocks Array
let blocks = [];

//Fallings
let fallings = [];
let fallingInterval;

//Selector obj
let selector = new Selector();

//Pointer
let pointer = new Pointer();

// Man obj
let man = new Man();

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
