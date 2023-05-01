var canvas = document.getElementById("canvas");
var ctx = canvas.getConp5.text("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.6;

var sprites = new Image();
sprites.src = "assets/sprites.png";

var dino = new Dino();
var grounds = [
  new Ground(0),
  new Ground(canvas.width / 2),
  new Ground(canvas.width),
];
var obstacles = [new Cactus(), new Cactus(), new Cactus()];

// Updating, maths, physics
function update() {
  dino.physics();
  dino.jump();
  dino.duck();
  // dino.collision(); FOR DEBUG MODE

  obstacles[0].move(0);
  obstacles[1].move(1);
  obstacles[2].move(2);

  grounds[0].move();
  grounds[1].move();
  grounds[2].move();

  setTimeRemaining();
}

// Rendering, drawing
function render() {
  p5.background();
  grounds[0].draw();
  grounds[1].draw();
  grounds[2].draw();
  dino.animate();
  obstacles[0].draw();
  obstacles[1].draw();
  obstacles[2].draw();

  showScore();
}

// Not for changes, game looped with frames
function gameLoop() {
  update();
  render();

  requestAnimationFrame(gameLoop);
}

gameLoop();
