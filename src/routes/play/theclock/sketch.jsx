import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";
import Clock from "./clock";

export default function TheClock() {
  let p5;
  let clock;
  let cnvParent;

  const setup = (_p5, canvasParentRef) => {
    p5 = _p5;
    cnvParent = canvasParentRef;
    p5.createCanvas(
      canvasParentRef.parentElement.clientWidth,
      canvasParentRef.parentElement.clientHeight
    ).parent(canvasParentRef);

    clock = new Clock(
      p5.width / 2,
      p5.height / 2,
      p5.min(p5.width, p5.height) * 0.4
    );
  };

  const draw = () => {
    p5.background(255);
    p5.stroke(0, 0, 0);
    p5.textAlign(p5.CENTER);
    p5.textSize(p5.width * 0.05);
    p5.text("The clock shows the current time:", clock.cx, clock.cy - clock.r);
    clock.draw(p5);
  };

  const windowResized = () => {
    p5.resizeCanvas(
      cnvParent.parentElement.clientWidth,
      cnvParent.parentElement.clientHeight
    );
    clock.cx = p5.width / 2;
    clock.cy = p5.height / 2;
    clock.r = p5.min(p5.width, p5.height) * 0.4;
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
}
