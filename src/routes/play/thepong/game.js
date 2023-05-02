import { scene, ball, stopped, paddle1, paddle2 } from "./globals";
import { Logo } from "./menu";
import { DrawScore } from "./score";
import { p5 } from "./globals";

//Showing Game and all of components
export function Game() {
  if (scene.value == "game") {
    DrawDivider(); // Drawing the line that divides halfs
    Logo(p5.value.width / 2, p5.value.height / 2, 0.008 * p5.value.height); // Drawing a logo

    DrawScore(); // Drawing score on the screen, score.js file
    //Drawing a ball
    ball.value.Display();
    if (!stopped.value) ball.value.Move();
    ball.value.Collision();

    //Drawing paddle 1 and paddle 2
    paddle1.value.Display();
    paddle2.value.Display();

    //Activating AI on paddle2
    if (!stopped.value) paddle1.value.AI();
  }
}

//Drawing divider based on different sizes
export function DrawDivider() {
  p5.value.push();
  p5.value.stroke(255);
  p5.value.strokeWeight(2);

  // let purple = p5.value.color(113, 50, 168);
  let logoSize = 0.008 * p5.value.height * 11;

  let distance = p5.value.dist(
    0,
    p5.value.height / 2,
    p5.value.width,
    p5.value.height / 2
  ); // Distance between start and end for lines
  let linew = distance / (p5.value.width / 10);

  let spacing = linew / 2; //Spacing between lines

  //Crazy system of drawing lines
  for (
    let x = linew;
    x <= p5.value.width / 2 - logoSize;
    x += spacing + linew
  ) {
    p5.value.line(x - linew, p5.value.height / 2, x, p5.value.height / 2);
  }
  for (
    let x = p5.value.width / 2 + logoSize + linew;
    x <= p5.value.width + linew;
    x += spacing + linew
  ) {
    p5.value.line(x - linew, p5.value.height / 2, x, p5.value.height / 2);
  }
}
