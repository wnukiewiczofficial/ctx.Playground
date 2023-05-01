import Sketch from "react-p5";
import "p5/lib/addons/p5.dom";
import "p5/lib/addons/p5.sound";

export default function ColorLine() {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(
      canvasParentRef.parentElement.clientWidth,
      canvasParentRef.parentElement.clientHeight
    ).parent(canvasParentRef);
  };

  const draw = (p5) => {};

  return <Sketch setup={setup} draw={draw} />;
}
