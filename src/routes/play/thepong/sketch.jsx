import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";

import Ball from "./ball";
// Menu, Game, Reset
import { Menu } from "./menu";
import { Game } from "./game";
import { ball, paddle1, paddle2, p5 } from "./globals";
import Paddle from "./paddle";
import { Reset } from "./score";

import {
  touchStarted,
  touchMoved,
  touchEnd,
  mousePressed,
  mouseDragged,
  mouseReleased,
} from "./input";

// Paddle, Ball

export default function ThePong() {
  //The orientation of the view
  let viewport;
  let cnvParent;

  const setup = (_p5, canvasParentRef) => {
    p5.set(_p5);
    cnvParent = canvasParentRef.parentElement;
    p5.value
      .createCanvas(
        canvasParentRef.parentElement.clientWidth,
        canvasParentRef.parentElement.clientHeight
      )
      .parent(canvasParentRef);

    //Creating a new paddle based on which side is it
    paddle1.set(new Paddle("down"));
    paddle2.set(new Paddle("up"));

    //Creating a new ball
    ball.set(new Ball());

    //Setting the font
    p5.value.textFont("Bebas Neue");

    //Checking if the device runs the game horizontally or vertically
    cnvParent.clientWidth >= cnvParent.clientHeight
      ? (viewport = "horizontal")
      : (viewport = "vertical");
    if (viewport !== "vertical")
      p5.value.resizeCanvas(cnvParent.clientHeight, cnvParent.clientHeight);
  };

  const draw = () => {
    //Setting up the background
    p5.value.background(0);

    //Menu Scene, the menu.js file
    Menu();

    //Game Scene, the game.js file
    Game();
  };

  const windowResized = () => {
    cnvParent.clientWidth >= cnvParent.clientHeight
      ? (viewport = "horizontal")
      : (viewport = "vertical");
    if (viewport === "vertical")
      p5.value.resizeCanvas(cnvParent.clientWidth, cnvParent.clientHeight);
    else p5.value.resizeCanvas(cnvParent.clientHeight, cnvParent.clientHeight);

    Reset();
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Sketch
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      touchStarted={touchStarted}
      touchMoved={touchMoved}
      touchEnd={touchEnd}
      mousePressed={mousePressed}
      mouseDragged={mouseDragged}
      mouseReleased={mouseReleased}
    />
  );
}
