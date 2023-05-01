//Bool that tells to game play or don't play
var stopped = true;

//Showing Game and all of components
function Game() {
  if (scene == "game") {
    DrawDivider(); // Drawing the line that divides halfs
    Logo(p5.width / 2, p5.height / 2, 0.008 * p5.height); // Drawing a logo

    DrawScore(); // Drawing score on the screen, score.js file

    //Drawing a ball
    ball.Display();
    if (!stopped) ball.Move();
    ball.Collision();

    //Drawing paddle 1 and paddle 2
    paddle1.Display();
    paddle2.Display();

    //Activating AI on paddle2
    if (!stopped) paddle1.AI();
  }
}

//Drawing divider based on different sizes
function DrawDivider() {
  push();
  p5.stroke(255);
  p5.strokeWeight(2);

  let purple = color(113, 50, 168);
  let logoSize = 0.008 * p5.height * 11;

  let distance = p5.dist(0, p5.height / 2, p5.width, p5.height / 2); // Distance between start and end for lines
  let linew = distance / (p5.width / 10);

  let spacing = linew / 2; //Spacing between lines

  //Crazy system of drawing lines
  for (var x = linew; x <= p5.width / 2 - logoSize; x += spacing + linew) {
    p5.line(x - linew, p5.height / 2, x, p5.height / 2);
  }
  for (
    var x = p5.width / 2 + logoSize + linew;
    x <= p5.width + linew;
    x += spacing + linew
  ) {
    p5.line(x - linew, p5.height / 2, x, p5.height / 2);
  }
}
