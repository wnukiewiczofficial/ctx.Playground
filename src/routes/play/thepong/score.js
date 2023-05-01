//Drawing Score on the screen
function DrawScore() {
  push();
  p5.fill(255);
  p5.textSize(60);
  textAlign(p5.LEFT, BOTTOM);
  p5.text(paddle1.points, p5.width / 8, p5.height / 2 - 20);
  textAlign(p5.LEFT, p5.CENTER);
  p5.text(paddle2.points, p5.width / 8, p5.height / 2 + p5.textAscent() + 10);
}

//Resetting all of the positions, to prepare object for the stage
function Reset() {
  paddle1.y = 0;
  paddle2.y = p5.height - paddle2.height;

  paddle1.x = p5.width / 2 - paddle1.width / 2;
  paddle2.x = p5.width / 2 - paddle2.width / 2;
  ball.x = p5.width / 2;
  ball.y = p5.height / 2;
  ball.xvel = p5.random(-5, 5);

  ball.yvel = (ball.yvel / ball.yvel) * (p5.height / 100);

  ball.radius = 10 + 0.02 * p5.height;

  stopped = true;
}

//Adding points to top paddle
function PointUp() {
  ball.yvel = p5.height / 100;
  paddle1.points++;

  // SCORE LIMIT
  // if(paddle1.points >= 3){
  //   stopped = true;
  //   scene = "menu";
  //   mode = "none";
  //   paddle1.points = 0;
  //   paddle2.points = 0;
  // }
}

//Adding points to bottom paddle
function PointDown() {
  ball.yvel = -(height / 100);
  paddle2.points++;

  //SCORE LIMIT
  // if(paddle2.points >= 3){
  //   stopped = true;
  //   scene = "menu";
  //   mode = "none";
  //   paddle1.points = 0;
  //   paddle2.points = 0;
  // }
}
