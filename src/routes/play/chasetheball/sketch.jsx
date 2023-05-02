import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";
import Ball from "./ball";
import { useEffect } from "react";

export default function ChaseTheBall() {
  let scene = "menu";
  let balls = [];
  let level = 1;
  let score = 0;
  let timer = 0;
  let timerInterval;

  useEffect(() => {
    return () => {
      canvas;
      clearInterval(timerInterval);
    };
  }, []);

  const setup = (p5, canvasParentRef) => {
    const cnv = p5
      .createCanvas(
        canvasParentRef.parentElement.clientWidth,
        canvasParentRef.parentElement.clientHeight
      )
      .parent(canvasParentRef.parentElement);
    balls[0] = new Ball(p5, level);

    cnv.mouseReleased((event) => {
      if (scene == "gameover" || scene == "win") {
        scene = "menu";
        timer = 0;
      }
    });
  };

  const draw = (p5) => {
    p5.background(0);

    if (scene == "menu") {
      drawMenu(p5);
    }

    if (scene == "game") {
      GuideLine(p5);
      for (let i in balls) {
        balls[i].move(p5, level);
        balls[i].draw(p5);
      }

      Level(p5);
      Score(p5);
      Timer(p5);
    }

    if (scene == "gameover") {
      drawGameover(p5);
    }

    if (scene == "win") {
      drawWin(p5);
    }
  };

  function GuideLine(p5) {
    for (let i in balls) {
      let distance = p5.dist(p5.mouseX, p5.mouseY, balls[i].x, balls[i].y);

      if (distance <= balls[i].d / 2) {
        if (i == 0) {
          if (level >= 4) balls.push(new Ball(p5, level));
          score++;
          balls.shift();
          balls.push(new Ball(p5, level));
        } else {
          scene = "gameover";
          clearInterval(timerInterval);
        }
      }
    }

    p5.stroke(200, 0, 0);
    p5.strokeWeight(2);
    p5.line(p5.mouseX, p5.mouseY, balls[0].x, balls[0].y);
  }

  function Level(p5) {
    if (score == 10) level = 2;
    if (score == 20) level = 3;
    if (score == 30) level = 4;
    if (score == 40) level = 5;
    if (score == 50) {
      scene = "win";
      score = 0;
      balls = [];
      balls[0] = new Ball(p5, level);
      clearInterval(timerInterval);
    }

    p5.fill(255);
    p5.noStroke();
    p5.textAlign(p5.LEFT, p5.TOP);
    p5.textSize(p5.width * 0.03);
    p5.text("Level " + level, 0, 0);
  }

  function Score(p5) {
    p5.fill(255);
    p5.noStroke();
    p5.textAlign(p5.CENTER, p5.TOP);
    p5.textSize(p5.width * 0.03);
    p5.text("Score " + score, p5.width / 2, 0);
  }

  function Timer(p5) {
    p5.fill(255);
    p5.noStroke();
    p5.textAlign(p5.RIGHT, p5.TOP);
    p5.textSize(p5.width * 0.03);
    p5.text("Time " + timer, p5.width, 0);
  }

  function drawMenu(p5) {
    p5.fill(255);
    p5.noStroke();
    p5.textAlign(p5.CENTER, p5.TOP);
    p5.textSize(p5.width * 0.1);
    p5.text("Chase The Ball", p5.width / 2, p5.textAscent());

    p5.noFill();
    p5.stroke(255);
    p5.strokeWeight(4);
    p5.rect(
      p5.width / 2 - (p5.width * 0.3) / 2,
      p5.height / 2 - (p5.height * 0.15) / 2,
      p5.width * 0.3,
      p5.height * 0.15
    );
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.text("PLAY", p5.width / 2, p5.height / 2);

    if (p5.mouseIsPressed) {
      if (
        p5.mouseX >= p5.width / 2 - (p5.width * 0.3) / 2 &&
        p5.mouseX <= p5.width / 2 + (p5.width * 0.3) / 2 &&
        p5.mouseY >= p5.height / 2 - (p5.height * 0.15) / 2 &&
        p5.mouseY <= p5.height / 2 + (p5.height * 0.15) / 2
      ) {
        scene = "game";
        timerInterval = setInterval(() => {
          timer++;
        }, 1000);
      }
    }
  }

  function drawGameover(p5) {
    p5.fill(200, 0, 0);
    p5.stroke(255);
    p5.strokeWeight(3);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textSize(p5.width * 0.1);
    p5.text("You Lost!", p5.width / 2, p5.height / 2);
  }

  function drawWin(p5) {
    p5.fill(0, 200, 0);
    p5.stroke(255);
    p5.strokeWeight(3);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textSize(p5.width * 0.1);
    p5.text("You Win!", p5.width / 2, p5.height / 2);
  }

  return <Sketch setup={setup} draw={draw} />;
}
