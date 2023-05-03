import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";
import {
  menuBackgroundImg,
  gameBackgroundImg,
  titleFont,
  infoFont,
  gameBgX,
  gameBgY,
  bgDir,
  started,
  p5,
  cnvParent,
  players,
} from "./globals";
import Menu from "./start";

export default function TagGame() {
  const preload = (_p5) => {
    menuBackgroundImg.set(_p5.loadImage("/taggame/backgroundMenu.jpg"));
    gameBackgroundImg.set(_p5.loadImage("/taggame/backgroundGame.jpg"));
    titleFont.set(
      _p5.loadFont("https://fonts.cdnfonts.com/s/5757/eurcntrc.woff")
    );
    infoFont.set(
      _p5.loadFont("https://fonts.cdnfonts.com/s/2156/Bou_Collegiate.woff")
    );
  };

  const setup = (_p5, canvasParentRef) => {
    p5.set(_p5);
    cnvParent.set(canvasParentRef);
    p5.value
      .createCanvas(
        canvasParentRef.parentElement.clientWidth,
        canvasParentRef.parentElement.clientHeight
      )
      .parent(canvasParentRef);

    p5.value.frameRate(60);
    p5.value.rectMode(p5.value.CENTER);

    Menu();

    gameBgX.set(p5.value.width / 2 - 0.9 * p5.value.width);
    gameBgY.set(0);
    bgDir.set(1);
  };

  const draw = () => {
    if (started.value) {
      p5.value.image(
        gameBackgroundImg.value,
        gameBgX.value,
        gameBgY.value,
        1.8 * p5.value.width,
        1.1 * p5.value.height
      );

      gameBgX.set(gameBgX.value + 0.2 * bgDir.value);

      if (gameBgX.value <= p5.value.width / 2 - 0.9 * p5.value.width)
        bgDir.set(1);
      if (gameBgX.value >= 0) bgDir.set(-1);

      players.value[0].draw();
      players.value[1].draw();

      players.value[0].drawCounter();
      players.value[1].drawCounter();

      players.value[0].move();
      players.value[1].move();

      players.value[0].collision();
      players.value[1].collision();

      players.value[0].input();
      players.value[1].input();
    }
  };

  return <Sketch preload={preload} setup={setup} draw={draw} />;
}
