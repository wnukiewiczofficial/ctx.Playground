import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";

export default function FlilTheTriangle() {
  let p5;
  let p1 = { x: 50, y: 500 }; // Vertex number one, down-left
  let p2 = { x: 550, y: 500 }; // Vertex number two, down-right
  let p3 = { x: 300, y: 100 }; // Vertex number three, up
  let basearea; // The area of the triangle

  let redpixels = 0; // Counter of red pixels (Program checks how many are there)

  let isinside = false; // Bollean which tell if the mouse is inside the triangle

  let winningThreshold = 96620; // Minimum of red pixels to win - caluclated from testing
  // IT CAN BE CHANGED TO 96620 or 96625, because sometimes it's hard to find one small missing px

  const setup = (_p5, canvasParentRef) => {
    p5 = _p5;
    p5.createCanvas(
      600, // canvasParentRef.parentElement.clientWidth,
      600 // canvasParentRef.parentElement.clientHeight
    ).parent(canvasParentRef);

    //createCanvas(600, 600); // Creating a canvas 600px wide and 600px high IT MUST BE THESE DIMENSIONS
    p5.pixelDensity(1);
    p5.background(255); // White color for the background
    basearea = p5.abs(
      (p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y)
    ); // Calculating the area
  };

  const draw = () => {
    redpixels = 0; // Clearing the red pixel counter on the beginning of each frame

    // Painting tool, which works if mouse is inside the shape
    if (isinside) {
      p5.push();
      p5.stroke(p5.color(255, 0, 0));
      p5.strokeWeight(40);
      p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
    }

    // Changing the background to white, so it clears everything that is outside the shape
    p5.loadPixels();
    for (let x = 0; x < p5.width; x++) {
      for (let y = 0; y < p5.height; y++) {
        let index = (x + y * p5.width) * 4;

        let area1 = p5.abs((p1.x - x) * (p2.y - y) - (p2.x - x) * (p1.y - y));
        let area2 = p5.abs((p2.x - x) * (p3.y - y) - (p3.x - x) * (p2.y - y));
        let area3 = p5.abs((p3.x - x) * (p1.y - y) - (p1.x - x) * (p3.y - y));

        if (area1 + area2 + area3 != basearea) {
          p5.pixels[index] = 255;
          p5.pixels[index + 1] = 255;
          p5.pixels[index + 2] = 255;
          p5.pixels[index + 3] = 255;
        }
      }
    }
    p5.updatePixels();

    // Drawing a triangle
    p5.stroke(0);
    p5.strokeWeight(4);
    p5.noFill();
    p5.beginShape(p5.TRIANGLES);
    p5.vertex(p1.x, p1.y);
    p5.vertex(p2.x, p2.y);
    p5.vertex(p3.x, p3.y);
    p5.endShape();

    // Responding to mouse collisions
    mousecollision();

    // Checking how many red pixels are in the triangle
    colorCheck();
  };

  const windowResized = function () {
    p5.resizeCanvas(600, 600);
  };

  // Event that clears and restarts the sketch after mouse click
  const mousePressed = function () {
    p5.background(255);
    p5.loop();
  };

  // Function that responds to mouse collisions
  function mousecollision() {
    let area1 = p5.abs(
      (p1.x - p5.mouseX) * (p2.y - p5.mouseY) -
        (p2.x - p5.mouseX) * (p1.y - p5.mouseY)
    );
    let area2 = p5.abs(
      (p2.x - p5.mouseX) * (p3.y - p5.mouseY) -
        (p3.x - p5.mouseX) * (p2.y - p5.mouseY)
    );
    let area3 = p5.abs(
      (p3.x - p5.mouseX) * (p1.y - p5.mouseY) -
        (p1.x - p5.mouseX) * (p3.y - p5.mouseY)
    );

    if (area1 + area2 + area3 == basearea) {
      isinside = true;
    } else {
      if (isinside) {
        isinside = false;

        negPopup();

        p5.noLoop();
      }
    }
  }

  // Function that shows the losing alert
  function negPopup() {
    p5.push();
    p5.fill(180);
    p5.textSize(40);
    p5.textAlign(p5.CENTER);
    p5.stroke(0);
    p5.strokeWeight(4);
    p5.text("You lost!", p5.width / 2, p5.height / 2);
    p5.text(
      "Click on the screen to restart...",
      p5.width / 2,
      p5.height / 2 + p5.textAscent() * 1.5
    );
  }

  // Function that shows the winning alert
  function posPopup() {
    p5.push();
    p5.fill(180);
    p5.textSize(35);
    p5.textAlign(p5.CENTER);
    p5.stroke(0);
    p5.strokeWeight(4);
    p5.text("You won!", p5.width / 2, p5.height / 2);
    p5.text(
      "Click on the screen to play again...",
      p5.width / 2,
      p5.height / 2 + p5.textAscent() * 1.5
    );
  }

  // Fuction that checks how many red pixels are in the triangle
  function colorCheck() {
    p5.loadPixels();
    for (let i = 0; i < p5.pixels.length; i += 4) {
      if (
        p5.pixels[i] == 255 &&
        p5.pixels[i + 1] == 0 &&
        p5.pixels[i + 2] == 0
      ) {
        redpixels++;
      }
    }

    if (redpixels >= winningThreshold) {
      posPopup();
      p5.noLoop();
    }
  }

  return (
    <Sketch
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      mousePressed={mousePressed}
    />
  );
}
