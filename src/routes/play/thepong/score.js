import { paddle1, paddle2, ball, stopped, scene, mode, p5 } from "./globals";

//Drawing Score on the screen
export function DrawScore() {
  p5.value.push();
  p5.value.fill(255);
  p5.value.textSize(60);
  p5.value.textAlign(p5.value.LEFT, p5.value.BOTTOM);
  p5.value.text(
    paddle1.value.points,
    p5.value.width / 8,
    p5.value.height / 2 - 20
  );
  p5.value.textAlign(p5.value.LEFT, p5.value.CENTER);
  p5.value.text(
    paddle2.value.points,
    p5.value.width / 8,
    p5.value.height / 2 + p5.value.textAscent() + 10
  );
}

//Resetting all of the positions, to prepare object for the stage
export function Reset() {
  let p1 = paddle1.value;
  p1.y = 0;
  p1.x = p5.value.width / 2 - paddle1.value.width / 2;
  paddle1.set(p1);

  let p2 = paddle2.value;
  p2.y = p5.value.height - paddle2.value.height;
  p2.x = p5.value.width / 2 - paddle1.value.width / 2;

  let bl = ball.value;
  bl.x = p5.value.width / 2;
  bl.y = p5.value.height / 2;
  bl.xvel = p5.value.random(-5, 5);
  bl.yvel = (ball.value.yvel / ball.value.yvel) * (p5.value.height / 100);
  bl.radius = 10 + 0.02 * p5.value.height;
  ball.set(bl);

  stopped.set(true);
}

//Adding points to top paddle
export function PointUp() {
  let bl = ball.value;
  bl.yvel = p5.value.height / 100;
  let p1 = paddle1.value;
  p1.points++;
  paddle1.set(p1);

  // SCORE LIMIT
  if (paddle1.value.points >= 3) {
    stopped.value = true;
    scene.value = "menu";
    mode.value = "none";
    paddle1.value.points = 0;
    paddle2.value.points = 0;
  }
}

//Adding points to bottom paddle
export function PointDown() {
  let bl = ball.value;
  bl.yvel = -(p5.value.height / 100);
  let p2 = paddle2.value;
  p2.points++;
  paddle2.set(p2);

  //SCORE LIMIT
  if (paddle2.value.points >= 3) {
    stopped.value = true;
    scene.value = "menu";
    mode.value = "none";
    paddle1.value.points = 0;
    paddle2.value.points = 0;
  }
}
