let coin;
let progress;
let chosen;

let score = 0;
let wrong = 0;
let positive = 0;

let correct_sound;
let wrong_sound;

let front_img;
let back_img;

function preload() {
  correct_sound = p5.loadSound("sounds/correct.wav");
  correct_sound.setVolume(0.4);
  wrong_sound = p5.loadSound("sounds/wrong.wav");
  wrong_sound.setVolume(0.4);

  front_img = p5.loadImage("images/front.png");
  back_img = p5.loadImage("images/back.png");
}

function setup(p5, canvasParentRef) {
  let cnvSize =
    window.innerWidth > 1000
      ? window.innerWidth * 0.3
      : window.innerHeight * 0.5 > window.innerWidth * 0.9
      ? window.innerWidth * 0.8
      : window.innerWidth > window.innerHeight
      ? window.innerHeight * 0.9
      : window.innerHeight * 0.5;
  p5.createCanvas(cnvSize, cnvSize, WEBGL);
  coin = new Coin();

  // Graphics
  progress = p5.createGraphics(p5.width, p5.height * 0.2);

  textFont("Slackey");

  pixelDensity(3);
}

function draw() {
  p5.background(255);

  coin.animate();
  coin.draw();
}

function windowResized() {
  let cnvSize =
    window.innerWidth > 1000
      ? window.innerWidth * 0.3
      : window.innerHeight * 0.5 > window.innerWidth * 0.9
      ? window.innerWidth * 0.8
      : window.innerWidth > window.innerHeight
      ? window.innerHeight * 0.9
      : window.innerHeight * 0.5;
  p5.resizeCanvas(cnvSize, cnvSize);
  coin.x = 0;
  coin.y = 0;
  coin.r = p5.width / 4;

  progress = p5.createGraphics(p5.width, p5.height * 0.2);
}

function Choose(side) {
  if (!coin.flipping) {
    if (side == "front") {
      if (chosen != "front") {
        document.querySelector("#front_img").style.transform = "scale(1.2)";
        document.querySelector("#back_img").style.transform = "scale(1)";
        chosen = "front";
        document.querySelector("#flip").style.display = "block";
      } else {
        document.querySelector("#front_img").style.transform = "scale(1)";
        chosen = undefined;
        document.querySelector("#flip").style.display = "none";
      }
    } else if (side == "back") {
      if (chosen != "back") {
        document.querySelector("#back_img").style.transform = "scale(1.2)";
        document.querySelector("#front_img").style.transform = "scale(1)";
        chosen = "back";
        document.querySelector("#flip").style.display = "block";
      } else {
        document.querySelector("#back_img").style.transform = "scale(1)";
        chosen = undefined;
        document.querySelector("#flip").style.display = "none";
      }
    }
  }
}

document.addEventListener("contextmenu", (event) => event.preventDefault());
