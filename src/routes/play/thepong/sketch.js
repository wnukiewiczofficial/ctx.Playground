//Paddles
var paddle1, paddle2;

//Ball
var ball;

//Mode
var mode;

//Difficulty from 0.1 to 1
var difficulty;

//Scene
var scene;

//Is screen touched or clicked
var touch = false,
  click = false;

//The orientation of the view
var viewport;

function setup(p5, canvasParentRef) {
  //Creating a canvas, window of the game
  p5.createCanvas(window.innerWidth, window.innerHeight);
  //Setting up the start scene
  scene = "menu";
  //Clearing Mode
  mode = "none";
  //Creating a new paddle based on which side is it
  paddle1 = new Paddle("down");
  paddle2 = new Paddle("up");

  //Creating a new ball
  ball = new Ball();

  //Setting the font
  textFont("Bebas Neue");

  //Checking if the device runs the game horizontally or vertically
  window.innerWidth >= window.innerHeight
    ? (viewport = "horizontal")
    : (viewport = "vertical");

  if (viewport == "horizontal")
    p5.resizeCanvas(window.innerHeight, window.innerHeight);
}

//Solution for the window size changing
function windowResized() {
  window.innerWidth >= window.innerHeight
    ? (viewport = "horizontal")
    : (viewport = "vertical");
  if (viewport == "vertical")
    p5.resizeCanvas(window.innerWidth, window.innerHeight);
  else p5.resizeCanvas(window.innerHeight, window.innerHeight);

  Reset();
}

function draw() {
  //Setting up the background
  p5.background(0);

  //Menu Scene, the menu.js file
  Menu();

  //Game Scene, the game.js file
  Game();
}
