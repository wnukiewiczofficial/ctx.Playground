let canvas;

let score = 0;
let lives = 3;
let lost = false;
let gameStopped = false;

let scene = "menu";

let boss;

let shark;
let obstacles = [];

let bullets = [];
let tridents = [];

//Buttons
let playBtn;

let menu_bg_img = [];
let enemies_img = [];
let shark_img = [];
let gun_img;
let bg_img = [];

let boss_img;
let trident_img;

//Musuic
let background_song;
let kill_sound;
let shoot_sound;
let die_sound;

let bg = [],
  bgmid = [],
  bgfor = [];

function preload() {
  menu_bg_img[0] = p5.loadImage("images/menu/background.png");
  menu_bg_img[1] = p5.loadImage("images/menu/title.png");
  menu_bg_img[2] = p5.loadImage("images/menu/play.png");

  bg_img[0] = p5.loadImage("images/level1/lvl1a.png");
  bg_img[1] = p5.loadImage("images/level1/lvl1b.png");
  bg_img[2] = p5.loadImage("images/level1/lvl1c.png");
  bg_img[3] = p5.loadImage("images/level1/lvl1d.png");
  bg_img[4] = p5.loadImage("images/level1/mid.png");
  bg_img[5] = p5.loadImage("images/level1/for.png");

  //Enemies
  for (let i = 1; i <= 5; i++)
    enemies_img[i - 1] = p5.loadImage(`images/enemies/${i}.png`);

  //Boss
  boss_img = p5.loadImage("images/bosses/boss.png");
  trident_img = p5.loadImage("images/bosses/trident.png");

  shark_img[0] = p5.loadImage("images/shark/shark1.png");
  shark_img[1] = p5.loadImage("images/shark/shark2.png");
  shark_img[2] = p5.loadImage("images/shark/shark3.png");
  shark_img[3] = p5.loadImage("images/shark/shark4.png");
  gun_img = p5.loadImage("images/gun.png");

  //Sounds
  background_song = p5.loadSound("sounds/background.wav");
  background_song.setVolume(0.2);
  shoot_sound = p5.loadSound("sounds/shoot.wav");
  shoot_sound.setVolume(0.1);
  kill_sound = p5.loadSound("sounds/kill.wav");
  die_sound = p5.loadSound("sounds/die.wav");
}

function setup(p5, canvasParentRef) {
  canvas = p5.createCanvas(window.innerWidth, window.innerHeight);
  if (p5.width < p5.height) {
    background_song.pause();
    gameStopped = true;
    document.querySelector("#rotInfo").style.display = "block";
    canvas.hide();
  } else {
    document.querySelector("#rotInfo").style.display = "none";
    canvas.show();
    gameStopped = false;
    if (scene == "game" && !background_song.isPlaying()) background_song.play();
  }
  shark = new Shark();

  playBtn = new Button(p5.width * 0.6, p5.height * 0.6,p5.width * 0.2, p5.height * 0.1);

  for (let i = 0; i < 5; i++) {
    obstacles.push(new Obstacle(i * (p5.height / 5)));
  }

  for (let i = 0; i < 4; i++) {
    bg.push(new p5.background(i *p5.width, bg_img[i], bg));
  }
  for (let i = 0; i < 2; i++) {
    bgmid.push(new p5.background(i *p5.width, bg_img[4], bgmid));
    bgfor.push(new p5.background(2 * i *p5.width +p5.width, bg_img[5], bgfor));
  }

  textFont("VT323");
  pixelDensity(1);

  document.querySelector(".lds-ring").style.display = "none";
}

function draw() {
  if (scene == "game") {
    bg.forEach((view) => {
      view.update();
    });
    bgmid.forEach((view) => {
      view.update();
    });
    bgfor.forEach((view) => {
      view.update();
    });

    shark.draw();
    if (!gameStopped) shark.move();

    obstacles.forEach((obstacle) => {
      if (!gameStopped) obstacle.move();
      if (!lost) obstacle.collision();
      obstacle.draw();
    });

    for (let i in bullets) {
      if (!gameStopped && !lost) bullets[i].move();
      bullets[i].draw();
      if (bullets[i].outOfBounds() || bullets[i].hit()) bullets.splice(i, 1);
    }

    for (let i in tridents) {
      if (!gameStopped) tridents[i].move();
      tridents[i].draw();
      if (tridents[i].outOfBounds() || tridents[i].hit()) tridents.splice(i, 1);
    }
  }

  if (boss) {
    boss.draw();
    if (!boss.summoned) boss.summon();
    else {
      if (!boss.dying) boss.move();
      boss.fight();
    }
  }

  UI();
}

function windowResized() {
  p5.resizeCanvas(window.innerWidth, window.innerHeight);
  if (p5.width < p5.height) {
    background_song.pause();
    gameStopped = true;
    document.querySelector("#rotInfo").style.display = "block";
    canvas.hide();
  } else {
    document.querySelector("#rotInfo").style.display = "none";
    canvas.show();
    gameStopped = false;
    if (scene == "game" && !background_song.isPlaying()) background_song.play();
  }

  for (let i = 0; i < 4; i++) {
    bg[i].x = i *p5.width;
  }
  for (let i = 0; i < 2; i++) {
    bgmid[i].x = i *p5.width;
    bgfor[i].x = 2 * i *p5.width +p5.width;
  }

  if (boss) {
    boss.w =p5.width * 0.2;
    boss.h = p5.height * 0.4;
    boss.x =p5.width - boss.w * 1.2;
  }

  playBtn = new Button(p5.width * 0.6, p5.height * 0.6,p5.width * 0.2, p5.height * 0.1);
}

function mouseClicked() {
  if (!gameStopped && !touches.length) {
    if (scene == "menu") {
      if (playBtn.clicked(p5.mouseX, p5.mouseY)) {
        scene = "game";
        noCursor();
        background_song.loop();
      }
    } else {
      if (lost) {
        lost = false;
        lives = 3;
        score = 0;
        shark = new Shark();
        boss = undefined;
        bg = [];
        bullets = [];
        tridents = [];
        for (let i = 0; i < 4; i++)
          bg.push(new p5.background(i *p5.width, bg_img[i], bg));
        background_song.loop();
      } else {
        bullets.push(new Bullet());
        shoot_sound.play();
      }
    }
  }
}

function mouseMoved() {
  if (scene == "menu") {
    if (playBtn.clicked(p5.mouseX, p5.mouseY)) cursor("pointer");
    else cursor("default");
  }
}

function touchStarted() {
  if (!gameStopped) {
    if (scene == "menu") {
      if (playBtn.clicked(p5.mouseX, p5.mouseY)) {
        scene = "game";
        noCursor();
        background_song.loop();
      }
    } else {
      if (lost) {
        lost = false;
        lives = 3;
        score = 0;
        shark = new Shark();
        boss = undefined;
        bg = [];
        bullets = [];
        tridents = [];
        for (let i = 0; i < 4; i++)
          bg.push(new p5.background(i *p5.width, bg_img[i], bg));
        background_song.loop();
      } else if (touches.length > 1) {
        bullets.push(new Bullet());
        shoot_sound.play();
      }
    }
  }
}

function UI() {
  if (scene == "game") {
    p5.fill(0);
    p5.stroke(255);
    p5.strokeWeight(p5.width * 0.002);
    p5.textAlign(p5.RIGHT, p5.TOP);
    p5.textSize(p5.width * 0.06);
    p5.text(`Score: ${score}`,p5.width, 0);
    p5.textAlign(p5.LEFT, p5.TOP);
    p5.text(`Lives: ${lives}`, 0, 0);

    if (lost) {
      p5.fill(200, 0, 0);
      p5.stroke(0);
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.text(`You lost!`,p5.width / 2, p5.height / 2);
      p5.text(`Click to restart...`,p5.width / 2, p5.height / 2 + p5.textAscent());
    }
  } else {
    image(menu_bg_img[0], 0, 0,p5.width, p5.height);
    image(
      menu_bg_img[1],
     p5.width * 0.45,
      p5.height * 0.1,
     p5.width * 0.5,
      p5.height * 0.4
    );
    image(menu_bg_img[2],p5.width * 0.6, p5.height * 0.6,p5.width * 0.2, p5.height * 0.1);
  }
}

function Button(x, y,p5.width, p5.height) {
  this.x = x;
  this.y = y;
  this.w =p5.width;
  this.h = p5.height;
  this.clicked = function (mx, my) {
    if (
      mx >= this.x &&
      mx <= this.x + this.w &&
      my >= this.y &&
      my <= this.y + this.h
    )
      return true;
    else return false;
  };
}

function p5.background(x, img, bgarr) {
  this.x = x;
  this.img = img;
  this.speed =
    bgarr == bgfor
      ?p5.width * 0.003
      : bgarr == bgmid
      ?p5.width * 0.002
      :p5.width * 0.001;
  this.bgarr = bgarr;
  this.update = function () {
    if (!lost && !gameStopped) this.x -= this.speed;
    if (this.x +p5.width < 0)
      this.x = (this.bgarr.length - 1) *p5.width - this.speed;
    image(this.img, this.x, 0,p5.width, p5.height);
  };
}

function getMouseVector(x, y) {
  let p5.mouseXalt = p5.mouseX - x;
  let p5.mouseYalt = p5.mouseY - y;
  let mouseDir = createVector(p5.mouseXalt, p5.mouseYalt);
  mouseDir.normalize();
  return mouseDir;
}

document.addEventListener("contextmenu", (event) => event.preventDefault());
