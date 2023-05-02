let ground;
let forest;
let sky;
let hero;

let coins = [];
let score = 0;
let goal;

let pits = [];

let gravity = 12;

let worldX = 0;

let sounds = {};

let character = {};
let environment = {};

let pitActiveIndex;

function preload() {
  sounds.coin = p5.loadSound("sounds/coin.wav");
  sounds.die = p5.loadSound("sounds/die.wav");
  sounds.jump = p5.loadSound("sounds/jump.wav");

  character.idle = p5.loadImage("images/clockman/idle.png");
  character.idle_jump = p5.loadImage("images/clockman/idle_jump.png");
  character.idle_fall = p5.loadImage("images/clockman/idle_fall.png");

  character.left = p5.loadImage("images/clockman/left.png");
  character.left_jump = p5.loadImage("images/clockman/left_jump.png");
  character.left_fall = p5.loadImage("images/clockman/left_fall.png");

  character.right = p5.loadImage("images/clockman/right.png");
  character.right_jump = p5.loadImage("images/clockman/right_jump.png");
  character.right_fall = p5.loadImage("images/clockman/right_fall.png");

  character.die = p5.loadImage("images/clockman/die.png");

  environment.pit = p5.loadImage("images/pit.png");
}

function setup(p5, canvasParentRef) {
  p5.createCanvas(windowWidth, windowHeight);

  ground = new Ground();
  forest = new Forest();
  sky = new Sky();
  hero = new Hero();

  for (let i = 0; i < 50; i++) {
    for (let j = 0; j < 5; j++) {
      coins.push(new Coin(j * round(p5.random(70, 200)) + p5.width * i));
    }
  }
  goal = coins.length;

  for (let i = 0; i < 50; i++) {
    pits.push(new Pit(i * p5.width + p5.width));
  }

  sounds.coin.setVolume(0.5);
  sounds.die.setVolume(2);
  sounds.jump.setVolume(0.2);
}

function draw() {
  drawBackground();
  ground.backLayerDraw();
  ground.update();

  p5.push();
  window.p5.translate(worldX, 0);
  forest.draw();
  sky.draw();

  for (let i in coins) {
    if (coins[i].grabbed()) {
      score++;
      sounds.coin.play();
      coins.splice(i, 1);
      break;
    }
    coins[i].draw();
  }

  for (let i in pits) pits[i].draw();

  if (!pitActiveIndex) {
    for (let i in pits) {
      if (pits[i].vacumming()) {
        hero.falling = true;
        if (hero.y + hero.h > ground.y) pitActiveIndex = i;
        break;
      } else {
        hero.falling = false;
      }
    }
  } else {
    collisionInPit(pitActiveIndex);
  }
  p5.pop();

  hero.lookForMotion();
  hero.draw();
  hero.update();

  ground.frontLayerDraw();

  if (hero.falling) canvasTint();

  drawScore();
}

function keyPressed() {
  hero.keyPressed();
}

function keyReleased() {
  hero.keyReleased();
}

function windowResized() {
  p5.resizeCanvas(windowWidth, windowHeight);
  hero.resize();
  ground.resize();
  forest.resize();
  sky.resize();
  for (let i in pits) pits[i].resize();
  for (let i in coins) coins[i].resize();
}
