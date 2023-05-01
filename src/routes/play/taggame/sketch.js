var players = [];
var started = false;

var menuBackgroundImg;
var gameBackgroundImg;

var gameBgX;
var gameBgY;
var bgDir;

var titleFont;
var infoFont;

function preload() {
  menuBackgroundImg = p5.loadImage("backgroundMenu.jpg");
  gameBackgroundImg = p5.loadImage("backgroundGame.jpg");
  titleFont = loadFont("https://fonts.cdnfonts.com/s/5757/eurcntrc.woff");
  infoFont = loadFont("https://fonts.cdnfonts.com/s/2156/Bou_Collegiate.woff");
}

function setup(p5, canvasParentRef) {
  p5.createCanvas(800, 800);
  frameRate(60);
  rectMode(p5.CENTER);

  Menu();

  gameBgX = p5.width / 2 - 0.9 * p5.width;
  gameBgY = 0;
  bgDir = 1;
}

function draw() {
  if (started) {
    image(gameBackgroundImg, gameBgX, gameBgY, 1.8 * p5.width, 1.1 * p5.height);
    gameBgX += 0.2 * bgDir;

    if (gameBgX <= p5.width / 2 - 0.9 * p5.width) bgDir = 1;
    if (gameBgX >= 0) bgDir = -1;

    players[0].draw();
    players[1].draw();

    players[0].drawCounter();
    players[1].drawCounter();

    players[0].move();
    players[1].move();

    players[0].collision();
    players[1].collision();

    players[0].input();
    players[1].input();
  }
}
