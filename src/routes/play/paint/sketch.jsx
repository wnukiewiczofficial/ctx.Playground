import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";

export default function Paint() {
  let p5;
  let cnvParent;
  let drawingPath = [];

  const setup = (_p5, canvasParentRef) => {
    p5 = _p5;
    cnvParent = canvasParentRef;
    p5.createCanvas(
      canvasParentRef.parentElement.clientWidth,
      canvasParentRef.parentElement.clientHeight
    ).parent(canvasParentRef);
    p5.noCursor();
  };

  const draw = () => {
    p5.background(255);
    p5.fill(0);
    p5.ellipse(p5.mouseX, p5.mouseY, 10, 10);

    if (p5.mouseIsPressed) {
      let lastPt = drawingPath[drawingPath.length - 1];
      if (!lastPt) {
        drawingPath.push(p5.createVector(p5.mouseX, p5.mouseY));
      } else if (p5.dist(p5.mouseX, p5.mouseY, lastPt.x, lastPt.y) > 5) {
        drawingPath.push(p5.createVector(p5.mouseX, p5.mouseY));
      }
    }
    // for (let pt of drawingPath) {
    //   p5.ellipse(pt.x, pt.y, 10, 10);
    // }

    p5.noFill();
    p5.strokeWeight(6);
    for (let i = 0; i < drawingPath.length; i++) {
      if (!drawingPath[i] || !drawingPath[i + 1]) continue;
      if (i < drawingPath.length - 1) {
        p5.beginShape();
        p5.vertex(drawingPath[i].x, drawingPath[i].y);
        p5.vertex(drawingPath[i + 1].x, drawingPath[i + 1].y);
        p5.endShape(p5.CLOSE);
      }
    }
  };

  const windowResized = () => {
    p5.resizeCanvas(
      cnvParent.parentElement.clientWidth,
      cnvParent.parentElement.clientHeight
    );
  };

  // const mousePressed = () => {};
  const mouseReleased = () => {
    drawingPath.push(null);
  };

  return (
    <Sketch
      mouseReleased={mouseReleased}
      setup={setup}
      draw={draw}
      windowResized={windowResized}
    />
  );
}
