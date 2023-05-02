import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";

export default function Snake() {
  let snake = []; // Snake body
  let apples = [];

  let fieldSize; // Size of the field where an apple or snake fits in
  let direction = { x: 0, y: 0 };
  let p5;

  const setup = (_p5, canvasParentRef) => {
    p5 = _p5;
    const cnv = p5
      .createCanvas(
        canvasParentRef.parentElement.clientWidth,
        canvasParentRef.parentElement.clientHeight
      )
      .parent(canvasParentRef);

    if (p5.width > p5.height) p5.resizeCanvas(p5.height, p5.height);
    else if (p5.height > p5.width) p5.resizeCanvas(p5.width, p5.width);

    fieldSize = p5.width / 20;
    p5.ellipseMode(p5.CORNER);

    // Snake head on a p5.random position
    snake.push({
      x: p5.floor(p5.random(0, 20)),
      y: p5.floor(p5.random(0, 20)),
    });

    // Apples on p5.random positions
    for (let i = 0; i < 2; i++) {
      apples.push({
        x: p5.floor(p5.random(0, 20)),
        y: p5.floor(p5.random(0, 20)),
      });
    }
  };

  const draw = () => {
    p5.background(0);

    DrawApples();

    DrawSnake();
    if (direction.x != 0 || direction.y != 0) {
      UpdateSnake();
      UpdateApples();
    }
  };

  const keyPressed = (event) => {
    let start = !direction.x && !direction.y;
    switch (event.keyCode) {
      case 87: // W
        if (direction.y != 1 || snake.length == 1) {
          direction.x = 0;
          direction.y = -1;
          if (start) for (let i = 0; i < 30; i++) SnakeExpand(); // Add a part of a body (30 times)
        }
        break;
      case 83: // S
        if (direction.y != -1 || snake.length == 1) {
          direction.x = 0;
          direction.y = 1;
          if (start) for (let i = 0; i < 30; i++) SnakeExpand(); // Add a part of a body (30 times)
        }
        break;
      case 65: // A
        if (direction.x != 1 || snake.length == 1) {
          direction.x = -1;
          direction.y = 0;
          if (start) for (let i = 0; i < 30; i++) SnakeExpand(); // Add a part of a body (30 times)
        }
        break;
      case 68: // D
        if (direction.x != -1 || snake.length == 1) {
          direction.x = 1;
          direction.y = 0;
          if (start) for (let i = 0; i < 30; i++) SnakeExpand(); // Add a part of a body (30 times)
        }
        break;
    }
  };

  function DrawSnake() {
    // Draw head
    p5.noStroke();
    p5.fill(0, 100, 0);
    for (let i = 0; i < snake.length; i++) {
      p5.ellipse(
        snake[i].x * fieldSize,
        snake[i].y * fieldSize,
        fieldSize,
        fieldSize
      );
    }
  }

  function UpdateSnake() {
    let pos = snake[0];

    if (SnakeLoses()) {
      //Restart the game
      snake = [
        { x: p5.floor(p5.random(0, 20)), y: p5.floor(p5.random(0, 20)) },
      ];
      direction = { x: 0, y: 0 };
      apples = [];
      for (let i = 0; i < 2; i++) {
        apples.push({
          x: p5.floor(p5.random(0, 20)),
          y: p5.floor(p5.random(0, 20)),
        });
      }
      return;
    }
    snake[0] = { x: pos.x + direction.x / 10, y: pos.y + direction.y / 10 };

    for (let i = 1; i < snake.length; i++) {
      let tmp = snake[i];
      snake[i] = pos;
      pos = tmp;
    }
  }

  function DrawApples() {
    p5.noStroke();
    p5.fill(150, 0, 0);
    for (let i = 0; i < apples.length; i++) {
      p5.ellipse(
        apples[i].x * fieldSize + fieldSize * 0.1,
        apples[i].y * fieldSize + fieldSize * 0.1,
        fieldSize * 0.8,
        fieldSize * 0.8
      );
    }
  }

  function UpdateApples() {
    for (let i = 0; i < apples.length; i++) {
      if (
        snake[0].x * 20 <= apples[i].x * 20 + fieldSize &&
        snake[0].x * 20 + fieldSize >= apples[i].x * 20 &&
        snake[0].y * 20 <= apples[i].y * 20 + fieldSize &&
        snake[0].y * 20 + fieldSize >= apples[i].y * 20
      ) {
        apples.splice(i, 1);
        let randPos = {
          x: p5.floor(p5.random(0, 20)),
          y: p5.floor(p5.random(0, 20)),
        };
        for (let j = 0; j < apples.length; j++) {
          if (randPos.x == apples[j].x && randPos.y == apples[j].y) {
            randPos = {
              x: p5.floor(p5.random(0, 20)),
              y: p5.floor(p5.random(0, 20)),
            };
            j = 0;
          }
        }

        apples.push(randPos);
      }
    }
  }

  function SnakeExpand() {
    let lastDir = { x: snake[0].x - direction.x, y: snake[0].y - direction.y };

    if (snake.length > 1) {
      if (snake[snake.length - 1].x > snake[snake.length - 2].x)
        lastDir = { x: 1, y: 0 };
      else if (snake[snake.length - 1].x < snake[snake.length - 2].x)
        lastDir = { x: -1, y: 0 };
      else if (snake[snake.length - 1].y > snake[snake.length - 2].y)
        lastDir = { x: 0, y: 1 };
      else if (snake[snake.length - 1].y < snake[snake.length - 2].y)
        lastDir = { x: 0, y: -1 };
    }

    snake.push({
      x: snake[snake.length - 1] - lastDir.x,
      y: snake[snake.length - 1] - lastDir.y,
    });
  }

  function SnakeLoses() {
    // If snake goes out of available fields
    if (
      snake[0].x < 0 ||
      snake[0].y < 0 ||
      snake[0].x >= 19 ||
      snake[0].y >= 19
    )
      return true;
    return false;
  }

  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />;
}
