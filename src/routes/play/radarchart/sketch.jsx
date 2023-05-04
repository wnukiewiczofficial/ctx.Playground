import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";
import data from "./data.json";
import Wheel from "./wheel";

export default function RadarChart() {
  let p5;
  let pickedStock;
  let cnvParent;
  let categories = [
    { name: "Career", value: 0, col: undefined },
    { name: "Finance", value: 2, col: undefined },
    { name: "Personal Growth", value: 5, col: undefined },
    { name: "Health", value: 7, col: undefined },
    { name: "Family", value: 6, col: undefined },
    { name: "Relationships", value: 7, col: undefined },
    { name: "Social Life", value: 9, col: undefined },
    { name: "Attitude", value: 10, col: undefined },
  ];
  let wheel;
  let btn;

  let name, description;
  let info;

  const setup = (_p5, canvasParentRef) => {
    p5 = _p5;
    cnvParent = canvasParentRef;
    p5.createCanvas(
      canvasParentRef.parentElement.clientWidth,
      canvasParentRef.parentElement.clientHeight
    ).parent(canvasParentRef);

    wheel = new Wheel(
      p5.width / 2,
      p5.height / 2,
      p5.min(p5.width, p5.height) * 0.3
    );

    p5.textFont("Cambria");
    for (let i in categories) {
      categories[i].col = p5.color(
        p5.floor(p5.random(50, 150)),
        p5.floor(p5.random(50, 150)),
        p5.floor(p5.random(50, 150))
      );
    }

    btn = p5.createButton("Pick a Stock").parent(canvasParentRef);
    btn.mousePressed(pickAstock);
    btn.position(wheel.cx, wheel.cy + wheel.r + p5.textAscent());
    btn.class("-translate-x-1/2 bg-gray-500 text-white p-4 rounded");

    info = p5.createDiv().parent(canvasParentRef);
    info.position(wheel.cx, p5.textAscent());
    info.class("-translate-x-1/2 text-center w-full md:w-3/4 p-4");

    name = p5.createP("asdswwwwqeqwewqeqwweqwead").parent(info);
    name.class("font-semibold text-xl");
    description = p5.createP("sadoasndiajdj").parent(info);

    pickAstock();
  };

  const draw = () => {
    p5.background(255);
    wheel.draw(p5, categories, pickedStock);
  };

  const windowResized = () => {
    p5.resizeCanvas(
      cnvParent.parentElement.clientWidth,
      cnvParent.parentElement.clientHeight
    );
    wheel.r = p5.min(p5.width, p5.height) * 0.3;
    wheel.cx = p5.width / 2;
    wheel.cy = p5.height / 2;
    btn.position(wheel.cx, wheel.cy + wheel.r + p5.textAscent());
    info.position(wheel.cx, p5.textAscent());
  };

  function pickAstock() {
    let randomStock = p5.floor(p5.random(0, data.length));
    pickedStock = [];

    // Creating random values for each category
    for (let i = 0; i < 8; i++) {
      let val = 0;
      let tmp;
      for (let a = 0; a < 20; a++) val += p5.floor(p5.random(1, 10));

      while (val > 9) {
        tmp = val;
        val = 0;
        while (tmp) {
          val += tmp % 10;
          tmp = p5.floor(tmp / 10);
        }
      }
      pickedStock[i] = val;
    }
    name.html(
      `${data[randomStock]["CompanyName"]} (${data[randomStock]["Symbol"]} : ${data[randomStock]["Exchange"]})`
    );
    description.html(data[randomStock]["Description"]);
  }

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
}
