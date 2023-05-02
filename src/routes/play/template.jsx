import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";

export default function ColorLine() {
  let p5;

  const setup = (_p5, canvasParentRef) => {
    p5 = _p5;
    p5.createCanvas(
      canvasParentRef.parentElement.clientWidth,
      canvasParentRef.parentElement.clientHeight
    ).parent(canvasParentRef);
  };

  const draw = () => {};

  return <Sketch setup={setup} draw={draw} />;
}
