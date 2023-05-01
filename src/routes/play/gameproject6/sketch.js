/*

The Game Project 6

*/

var gameChar_x;
var gameChar_vel;
var gravity;
var p5.floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var trees_x;
var clouds;
var mountains;
var canyons;
var collectables;

var game_score;
var flagpole;
var lives;

var lost;
var won;

var platforms;

var enemies;

// Sounds
var pickupSound;
var fallSound;
var jumpSound;

// Loading all sound files in the preloader
function preload() {
  pickupSound = p5.loadSound("./sounds/pickup.mp3");
  fallSound = p5.loadSound("./sounds/fall.mp3");
  jumpSound = p5.loadSound("./sounds/jump.mp3");

  // Setting up the volume for each sound
  pickupSound.setVolume(0.6);
  fallSound.setVolume(0.8);
  jumpSound.setVolume(0.4);
}

function setup(p5, canvasParentRef) {
  p5.createCanvas(1024, 576);
  p5.floorPos_y = (p5.height * 3) / 4;
  lives = 3;
  startGame();
}

function draw() {
  p5.background(100, 155, 255); // p5.fill the sky blue

  p5.noStroke();
  p5.fill(0, 155, 0);
  p5.rect(0, p5.floorPos_y,p5.width, p5.height / 4); // draw some green ground

  push();
  translate(scrollPos, 0);

  // Draw clouds.
  drawCloud();

  // Draw mountains.
  drawMountain();

  // Draw trees.

  drawTrees();

  // Draw canyons.

  for (var i = 0; i < canyons.length; i++) {
    drawCanyon(canyons[i]);
    checkCanyon(canyons[i]);
  }

  // Traverse platforms
  for (let i in platforms) {
    platforms[i].collision();
    platforms[i].draw();
  }

  // Draw collectable items.

  for (var i = 0; i < collectables.length; i++) {
    if (!collectables[i].isFound) {
      drawCollectable(collectables[i]);
      checkCollectable(collectables[i]);
    }
  }

  // Traverse enemies
  for (let i in enemies) {
    if (!lost) {
      enemies[i].move();
      enemies[i].collision();
    }
    enemies[i].draw();
  }

  renderFlagpole();

  checkPlayerDie();

  pop();

  // Draw game character.

  drawGameChar();

  //Draw gameover and win text
  if (lost) {
    p5.fill(200, 0, 0);
    p5.noStroke();
    p5.textSize(40);
    textAlign(p5.CENTER);
    p5.text("Game over. Press space to continue.",p5.width / 2, p5.height / 2);
  } else if (won) {
    p5.fill(0, 200, 0);
    p5.noStroke();
    p5.textSize(40);
    textAlign(p5.CENTER);
    p5.text("Level complete. Press space to continue",p5.width / 2, p5.height / 2);
  }

  textAlign(p5.LEFT);
  p5.fill(255);
  p5.noStroke();
  p5.textSize(20);
  p5.text("Score: " + game_score, 20, 30);

  p5.fill(255);
  p5.noStroke();
  p5.textSize(20);
  p5.text("Lives remaining: ", 20, 60);
  p5.fill(200, 0, 0);
  for (let i = 0; i < lives; i++) ellipse(180 + i * 20, 55, 15); // Draw lives tokens

  // Logic to make the game character move or the background scroll.
  if (isLeft) {
    if (gameChar_x >p5.width * 0.2) {
      gameChar_x -= 5;
    } else {
      scrollPos += 5;
    }
  }

  if (isRight) {
    if (gameChar_x <p5.width * 0.8) {
      gameChar_x += 5;
    } else {
      scrollPos -= 5; // negative for moving against the background
    }
  }

  // Logic to make the game character rise and fall.
  // Adding y velocity and gravity, based on that character rises and falls

  // gameChar_y += gravity;
  if (gameChar_y >= p5.floorPos_y && !isPlummeting) {
    gameChar_y = p5.floorPos_y;
  }
  if (isFalling || isPlummeting) {
    gameChar_vel += gravity;
    gameChar_y += gameChar_vel;
  }

  if (gameChar_y >= p5.floorPos_y) {
    isFalling = false;
  }

  if (flagpole.isReached == false) {
    checkFlagpole();
  }

  // Update real position of gameChar for collision detection.
  gameChar_world_x = gameChar_x - scrollPos;
}

// ---------------------
// Key control functions
// ---------------------

function keyPressed() {
  // if statements below are to control the animation of the character when keys are pressed.
  // If the game is not finished
  if (!lost && !won) {
    if (keyCode == 37) {
      console.log("left arrow");
      isLeft = true;
    } else if (keyCode == 39) {
      console.log("right arrow");
      isRight = true;
    } else if (keyCode == 32 && !isFalling && !isPlummeting) {
      console.log("space bar pressed");
      isFalling = true;
      gravity = 0.8;
      gameChar_vel = -16;
      jumpSound.play();
    }
  }
}

function keyReleased() {
  // if statements below are to control the animation of the character when keys are released.

  if (keyCode == 37) {
    console.log("left arrow");
    isLeft = false;
  } else if (keyCode == 39) {
    console.log("right arrow");
    isRight = false;
  } else if (keyCode == 32) {
    console.log("space bar pressed");
    // If the game is finished restart the game
    if (lost || won) {
      lives = 3;
      startGame();
    }
  }
}

// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar() {
  //the game character
  p5.stroke(0);
  if (isLeft && isFalling) {
    // add your jumping-left code
    p5.fill(200, 150, 150);
    ellipse(gameChar_x, gameChar_y - 59, 35);

    p5.fill(255, 0, 0);
    p5.rect(gameChar_x - 5, gameChar_y - 43, 10, 25);

    p5.fill(0);
    p5.rect(gameChar_x + 5, gameChar_y - 20, -17, 10);

    p5.fill(0);
    beginShape();
    vertex(gameChar_x - 5, gameChar_y - 34);
    vertex(gameChar_x - 17, gameChar_y - 27);
    vertex(gameChar_x - 17, gameChar_y - 22);
    vertex(gameChar_x - 5, gameChar_y - 29);
    endShape(CLOSE);

    p5.fill(0);
    beginShape();
    vertex(gameChar_x - 5, gameChar_y - 34);
    vertex(gameChar_x - 15, gameChar_y - 37);
    vertex(gameChar_x - 15, gameChar_y - 32);
    vertex(gameChar_x - 5, gameChar_y - 29);
    endShape(CLOSE);
  } else if (isRight && isFalling) {
    // add your jumping-right code
    p5.fill(200, 150, 150);
    ellipse(gameChar_x, gameChar_y - 59, 35);

    p5.fill(255, 0, 0);
    p5.rect(gameChar_x - 5, gameChar_y - 43, 10, 25);

    p5.fill(0);
    p5.rect(gameChar_x - 5, gameChar_y - 20, 17, 10);

    p5.fill(0);
    beginShape();
    vertex(gameChar_x + 5, gameChar_y - 34);
    vertex(gameChar_x + 17, gameChar_y - 27);
    vertex(gameChar_x + 17, gameChar_y - 22);
    vertex(gameChar_x + 5, gameChar_y - 29);
    endShape(CLOSE);

    p5.fill(0);
    beginShape();
    vertex(gameChar_x + 5, gameChar_y - 34);
    vertex(gameChar_x + 15, gameChar_y - 37);
    vertex(gameChar_x + 15, gameChar_y - 32);
    vertex(gameChar_x + 5, gameChar_y - 29);
    endShape(CLOSE);
  } else if (isLeft) {
    // add your walking left code
    p5.fill(200, 150, 150);
    ellipse(gameChar_x, gameChar_y - 50, 35);

    p5.fill(255, 0, 0);
    p5.rect(gameChar_x - 5, gameChar_y - 35, 10, 30);

    p5.fill(0);
    p5.rect(gameChar_x - 12, gameChar_y - 5, 17, 10);

    p5.fill(0);
    beginShape();
    vertex(gameChar_x - 5, gameChar_y - 25);
    vertex(gameChar_x - 15, gameChar_y - 20);
    vertex(gameChar_x - 15, gameChar_y - 15);
    vertex(gameChar_x - 5, gameChar_y - 20);
    endShape(CLOSE);
  } else if (isRight) {
    // add your walking right code
    p5.fill(200, 150, 150);
    ellipse(gameChar_x, gameChar_y - 50, 35);

    p5.fill(255, 0, 0);
    p5.rect(gameChar_x - 5, gameChar_y - 35, 10, 30);

    p5.fill(0);
    p5.rect(gameChar_x - 5, gameChar_y - 5, 17, 10);

    p5.fill(0);
    beginShape();
    vertex(gameChar_x + 5, gameChar_y - 24);
    vertex(gameChar_x + 17, gameChar_y - 17);
    vertex(gameChar_x + 17, gameChar_y - 12);
    vertex(gameChar_x + 5, gameChar_y - 19);
    endShape(CLOSE);
  } else if (isFalling || isPlummeting) {
    // add your jumping facing forwards code
    p5.fill(200, 150, 150);
    ellipse(gameChar_x, gameChar_y - 58, 35);

    p5.fill(255, 0, 0);
    p5.rect(gameChar_x - 13, gameChar_y - 42, 26, 30);

    p5.fill(0);
    p5.rect(gameChar_x - 15, gameChar_y - 15, 10, 10);
    p5.rect(gameChar_x + 5, gameChar_y - 15, 10, 10);

    p5.fill(0);
    p5.rect(gameChar_x + 13, gameChar_y - 30, 10, 5);
    p5.rect(gameChar_x - 13, gameChar_y - 30, -10, 5);
  } else {
    // add your standing front facing code
    p5.fill(200, 150, 150);
    ellipse(gameChar_x, gameChar_y - 50, 35);

    p5.fill(255, 0, 0);
    p5.rect(gameChar_x - 13, gameChar_y - 35, 26, 30);

    p5.fill(0);
    p5.rect(gameChar_x - 15, gameChar_y - 5, 10, 10);
    p5.rect(gameChar_x + 5, gameChar_y - 5, 10, 10);
  }
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.

function drawCloud() {
  for (let i = 0; i < clouds.length; i++) {
    p5.fill(255);
    ellipse(clouds[i].pos_x, clouds[i].pos_y, 55, 55);
    ellipse(clouds[i].pos_x + 25, clouds[i].pos_y, 35, 35);
    ellipse(clouds[i].pos_x + 45, clouds[i].pos_y, 25, 25);
  }
}

// Function to draw mountains objects.

function drawMountain() {
  for (let i = 0; i < mountains.length; i++) {
    p5.fill(91, 71, 110);
    p5.strokeWeight(0);
    triangle(
      mountains[i].pos_x + 300,
      mountains[i].pos_y,
      mountains[i].pos_x + 500,
      mountains[i].pos_y,
      mountains[i].pos_x + 400,
      mountains[i].pos_y - 200
    );

    p5.fill(255, 255, 255);
    p5.strokeWeight(0);
    triangle(
      mountains[i].pos_x + 350,
      mountains[i].pos_y - 100,
      mountains[i].pos_x + 450,
      mountains[i].pos_y - 100,
      mountains[i].pos_x + 400,
      mountains[i].pos_y - 200
    );
  }
}

// Function to draw trees objects.

function drawTrees() {
  for (let i = 0; i < trees_x.length; i++) {
    // Anchor Tree Below - I didn't add or subtract anything to "p5.rect(trees_x[i]" below so that the leaves/branches are anchored to the tree trunk
    p5.fill(100, 50, 0);
    p5.rect(trees_x[i], -200 / 2 + p5.floorPos_y, 50, 200 / 2);
    p5.fill(0, 100, 0);
    triangle(
      trees_x[i] - 50,
      -200 / 2 + p5.floorPos_y,
      trees_x[i] + 25,
      -200 + p5.floorPos_y,
      trees_x[i] + 100,
      -200 / 2 + p5.floorPos_y
    );

    triangle(
      trees_x[i] - 75,
      -200 / 4 + p5.floorPos_y,
      trees_x[i] + 25,
      (-200 * 3) / 4 + p5.floorPos_y,
      trees_x[i] + 125,
      -200 / 4 + p5.floorPos_y
    );
  }
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon) {
  p5.fill(139, 69, 19);
  beginShape();
  vertex(t_canyon.pos_x + 237 + t_canyon.width, t_canyon.pos_y);
  vertex(t_canyon.pos_x + 250 + t_canyon.width, 432);
  vertex(t_canyon.pos_x + 313 + t_canyon.width, 577);
  vertex(t_canyon.pos_x + 255 + t_canyon.width, 577);
  endShape();

  p5.fill(139, 69, 19);
  beginShape();
  vertex(t_canyon.pos_x + 201, 454);
  vertex(t_canyon.pos_x + 180, 432);
  vertex(t_canyon.pos_x + 133, 577);
  vertex(t_canyon.pos_x + 180, 577);
  endShape();

  p5.fill(100, 155, 255);
  beginShape();
  vertex(t_canyon.pos_x + 180, 432);
  vertex(t_canyon.pos_x + 250 + t_canyon.width, 432);
  vertex(t_canyon.pos_x + 237 + t_canyon.width, 454);
  vertex(t_canyon.pos_x + 201, 454);
  endShape();
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon) {
  // If the game character is inside the canyon and it is not jumping it over, it falls down (plummeting = true)
  for (let i in canyons) {
    if (
      gameChar_world_x > canyons[i].pos_x + 180 &&
      gameChar_world_x < canyons[i].pos_x + canyons[i].width + 237 &&
      !isFalling
    ) {
      //Checking if player does not collide with platforms
      let colliding = true;
      for (let i in platforms) {
        if (platforms[i].colliding) colliding = false;
      }
      if (colliding) isPlummeting = true;
    }
  }
}

// ----------------------------------
// Factory pattern of platform
// ----------------------------------
function createPlatform(x, y) {
  let pl = {
    x: x,
    y: y,
    w: 120,
    h: 16,
    colliding: false,
    draw: function () {
      push();
      p5.fill(128, 119, 96);
      p5.stroke(50, 80, 0);
      p5.strokeWeight(2);
      p5.rect(this.x, this.y, this.w, this.h, 10);
      p5.fill(0, 100, 0);
      p5.stroke(0, 80, 0);
      p5.rect(this.x, this.y, this.w, this.h / 3, 5);
      pop();
    },
    collision: function () {
      if (
        gameChar_world_x + 10 > this.x &&
        gameChar_world_x < this.x + this.w &&
        gameChar_y + 7 >= this.y &&
        gameChar_y - 95 <= this.y + this.h
      ) {
        if (!this.colliding) {
          gameChar_vel = 0;
          isPlummeting = false;
          if (gameChar_y <= this.y + this.h) {
            isFalling = false;
          }
        }
        this.colliding = true;
      } else {
        if (this.colliding) isFalling = true;
        this.colliding = false;
      }
    },
  };

  return pl;
}

// ----------------------------------
// Constructor of an Enemy
// ----------------------------------

function Enemy(x) {
  this.origin = x;
  this.w = 40;
  this.h = 60;
  this.x = x;
  this.y = p5.floorPos_y - this.h * 0.8;
  this.dir = p5.random(0, 1) < 0.5 ? -1 : 1;
  (this.draw = function () {
    p5.fill(200, 0, 0);
    p5.rect(this.x, this.y, this.w, this.h);
  }),
    (this.move = function () {
      this.x += this.dir;
      if (this.x < this.origin - 100 || this.x + this.w > this.origin + 100)
        this.dir *= -1;
    }),
    (this.collision = function () {
      if (
        gameChar_world_x + 10 > this.x &&
        gameChar_world_x < this.x + this.w &&
        gameChar_y + 7 >= this.y &&
        gameChar_y - 95 <= this.y + this.h
      ) {
        lives--;
        if (lives <= 0) {
          //LOSE
          lost = true;
          isLeft = false;
          isRight = false;
        } else startGame();
        fallSound.play(); // Play fall, hit, lose sound
      }
    });
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable) {
  p5.fill(255, 215, 0);
  ellipse(
    t_collectable.pos_x,
    t_collectable.pos_y,
    t_collectable.size + 50,
    t_collectable.size + 50
  );
  p5.fill(0, 0, 0);
  p5.textSize(30);
  textAlign(p5.LEFT);
  p5.text("$", t_collectable.pos_x - 8, t_collectable.pos_y + 9);
  p5.textSize(12);
}

// Function to check character has collected an item.

function checkCollectable(t_collectable) {
  if (
    p5.dist(
      gameChar_world_x,
      gameChar_y,
      t_collectable.pos_x,
      t_collectable.pos_y
    ) < 20 &&
    !t_collectable.isFound
  ) {
    t_collectable.isFound = true;
    game_score += 1;
    pickupSound.play();
  }
}

function renderFlagpole() {
  push();
  p5.strokeWeight(5);
  p5.stroke(180);
  p5.line(flagpole.pos_x, p5.floorPos_y, flagpole.pos_x, p5.floorPos_y - 250);
  p5.fill(255, 0, 255);
  p5.noStroke();

  if (flagpole.isReached == true) {
    p5.rect(flagpole.pos_x, p5.floorPos_y - 250, 50, 50);
  } else {
    p5.rect(flagpole.pos_x, p5.floorPos_y - 50, 50, 50);
  }

  pop();
}

function checkFlagpole() {
  var d = abs(gameChar_world_x - flagpole.pos_x);

  if (d < 15) {
    flagpole.isReached = true;
    won = true;
    isRight = false;
    isLeft = false;
  }
}

function checkPlayerDie() {
  // If distance between gamechar and bottom of the canvas is < than 20px
  if (p5.dist(gameChar_x, gameChar_y - 70, gameChar_x, p5.height) < 20) {
    lives--;
    if (lives <= 0) {
      //LOSE
      lost = true;
      isLeft = false;
      isRight = false;
    } else startGame();
    fallSound.play(); // Play fall, hit, lose sound
  }
}

function startGame() {
  // Result variables, user wins or loses
  lost = false;
  won = false;

  gameChar_x =p5.width / 2;
  gameChar_y = p5.floorPos_y;
  gameChar_vel = 0;
  gravity = 0.8;
  game_score = 0;

  // Variable to control the background scrolling.
  scrollPos = 0;

  // Variable to store the real position of the gameChar in the game
  // world. Needed for collision detection.
  gameChar_world_x = gameChar_x - scrollPos;

  // Boolean variables to control the movement of the game character.
  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;

  // Platforms
  platforms = [
    createPlatform(600, 300),
    createPlatform(800, 300),
    createPlatform(1000, 200),
  ];

  // Enemies
  enemies = [new Enemy(50), new Enemy(650), new Enemy(850), new Enemy(1350)];
  // Initialise arrays of scenery objects.
  trees_x = [60, 300, 500, 900, 1500, 2000, 2600];

  clouds = [
    { pos_x: 100, pos_y: 200 },
    { pos_x: 600, pos_y: 100 },
    { pos_x: 700, pos_y: 200 },
    { pos_x: 900, pos_y: 200 },
    { pos_x: 1500, pos_y: 200 },
    { pos_x: 2000, pos_y: 200 },
    { pos_x: 2500, pos_y: 200 },
  ];

  mountains = [
    { pos_x: 350, pos_y: p5.floorPos_y },
    { pos_x: 950, pos_y: p5.floorPos_y },
    { pos_x: 1250, pos_y: p5.floorPos_y },
    { pos_x: 2700, pos_y: p5.floorPos_y },
  ];

  canyons = [
    { pos_x: 0, pos_y: p5.floorPos_y,p5.width: 40 },
    { pos_x: 900, pos_y: p5.floorPos_y,p5.width: 40 },
    { pos_x: 1600, pos_y: p5.floorPos_y,p5.width: 40 },
    { pos_x: 2100, pos_y: p5.floorPos_y,p5.width: 40 },
  ];

  collectables = [
    { pos_x: 120, pos_y: p5.floorPos_y, size: 0, isFound: false },
    { pos_x: 600, pos_y: p5.floorPos_y, size: 0, isFound: false },
    { pos_x: 900, pos_y: p5.floorPos_y, size: 0, isFound: false },
    { pos_x: 1600, pos_y: p5.floorPos_y, size: 0, isFound: false },
    { pos_x: 2500, pos_y: p5.floorPos_y, size: 0, isFound: false },
  ];

  flagpole = { isReached: false, pos_x: 1500 };
}
