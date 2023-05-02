let t = 0;
let font;

let pickedStock;

let penaltyTimeout;

let p5.randomSecond;

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

let luckiesUsed = 0;
let firstUseDate;

let wheel;
let clock;

let cnv;
let stock_title = document.querySelector("#stock_title");

let bell;
function preload() {
  bell = p5.loadSound("sounds/bell.wav");
}

function setup(p5, canvasParentRef) {
  let cnvSize =
    window.innerWidth > 1000
      ? window.innerWidth * 0.4
      : window.innerHeight * 0.5 > window.innerWidth * 0.9
      ? window.innerWidth * 0.9
      : window.innerWidth > window.innerHeight
      ? window.innerHeight * 0.9
      : window.innerHeight * 0.5;
  cnv = p5.createCanvas(cnvSize, cnvSize);
  clock = new Clock(p5.width / 2, p5.height / 2,p5.width * 0.4);
  font = "Cambria";
  textFont(font);
  for (let i in categories)
    categories[i].col = color(
      p5.floor(p5.random(50, 150)),
      p5.floor(p5.random(50, 150)),
      p5.floor(p5.random(50, 150))
    );
  p5.randomSecond = p5.floor(p5.random(0, 60));
}

function draw() {
  p5.background(255);
  if (wheel) wheel.draw();
  else {
    clock.draw();
    clock.ring();
  }
}

function windowResized() {
  let cnvSize =
    window.innerWidth > 1000
      ? window.innerWidth * 0.4
      : window.innerHeight * 0.5 > window.innerWidth * 0.9
      ? window.innerWidth * 0.9
      : window.innerWidth > window.innerHeight
      ? window.innerHeight * 0.9
      : window.innerHeight * 0.5;
  p5.resizeCanvas(cnvSize, cnvSize);
  clock.r =p5.width * 0.4;
  clock.cx =p5.width / 2;
  clock.cy = p5.height / 2;
  if (wheel) {
    wheel.r =p5.width * 0.4;
    wheel.cx =p5.width / 2;
    wheel.cy = p5.height / 2;
  }
}

function switchScene() {
  let scene1 = document.querySelector(".scene1");
  let scene2 = document.querySelector(".scene2");
  let stock_space = document.querySelector(".stock_space");

  if (scene1.style.display == "none") {
    scene1.style.display = "flex";
    scene2.style.display = "none";
    stock_space.style.display = "none";
    wheel = undefined;
    cnv.show();
    clearTimeout(penaltyTimeout);
  } else {
    scene1.style.display = "none";
    scene2.style.display = "flex";
    hideAstock();
    cnv.hide();
  }
}

function pickAstock() {
  let minutes = 1;

  let cookies =
    document.cookie.split(";").find((uses) => uses.includes("uses=")) || 0;
  luckiesUsed =
    typeof cookies != "number" ? parseInt(cookies.split("=")[1]) : cookies;
  luckiesUsed++;

  if (luckiesUsed <= 5) {
    if (firstUseDate == undefined || luckiesUsed == 1) {
      firstUseDate = new Date();
      document.cookie = `uses=${luckiesUsed};path=/;max-age=${minutes * 60};`;
    } else {
      let currentTime = new Date();
      let expiration = round(
        (currentTime.getTime() - firstUseDate.getTime()) / 1000
      );
      document.cookie = `uses=${luckiesUsed};path=/;max-age=${Math.floor(
        minutes * 60 - expiration
      )};`;
    }

    let stock_html = document.querySelector(".stock_space");
    let stock_info_html = document.querySelector(".stock_info");
    let p5.randomStock = p5.floor(p5.random(0, data.length));
    pickedStock = [];
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

    let stock_title_html = document.querySelector(".heading");
    let stock_description_html = document.querySelector(".description");
    stock_title_html.innerHTML = `${data[randomStock]["CompanyName"]} (${data[randomStock]["Symbol"]} : ${data[randomStock]["Exchange"]})`;
    stock_description_html.innerHTML = data[randomStock]["Description"];

    let stock_info_link = document.querySelector("#stock_info");
    stock_info_link.setAttribute(
      "href",
      `https://finance.yahoo.com/quote/${data[randomStock]["Symbol"]}`
    );

    wheel = new Wheel(p5.width / 2, p5.height / 2,p5.width * 0.4);
    stock_html.style.display = "flex";
    stock_info.style.display = "flex";
  } else {
    switchScene();
    penaltyTimeout = setTimeout(switchScene, 1000 * 10);
  }
}

function hideAstock() {
  let stock_html = document.querySelector(".stock_space");
  let stock_info_html = document.querySelector("#stock_info");
  stock_html.style.display = "none";
  stock_info_html.style.display = "none";

  let stock_title_html = document.querySelector(".heading");
  let stock_description_html = document.querySelector(".description");
  stock_title_html.innerHTML = "Please wait to get a stock...";
  stock_description_html.innerHTML =
    "You have to stay on the website to see your stock.";

  wheel = undefined;
  p5.randomSecond = p5.floor(p5.random(0, 60));
}
