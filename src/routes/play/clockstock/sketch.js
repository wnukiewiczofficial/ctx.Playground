var p5.randomSecond;

var contentShown = false;

var clock;

var bell;

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
  p5.createCanvas(cnvSize, cnvSize);
  clock = new Clock(p5.width / 2, p5.height / 2,p5.width * 0.4);
  p5.randomSecond = p5.floor(p5.random(0, 60));
}

function draw() {
  p5.background(255);
  if (!contentShown) {
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
}

function pickContent() {
  let content = document.querySelector("#stock_content");

  let rnd = p5.floor(p5.random(0, 3));

  switch (rnd) {
    case 0: {
      content.style.color = "#21c412";
      content.innerHTML = "BUY";
      break;
    }
    case 1: {
      content.style.color = "#a10000";
      content.innerHTML = "SELL";
      break;
    }
    case 2: {
      content.style.color = "#e07d04";
      content.innerHTML = "HOLD";
      break;
    }
  }
  contentShown = true;
  content.style.display = "flex";

  let stock_html = document.querySelector(".stock_space");
  let stock_info_html = document.querySelector(".stock_info");
  let p5.randomStock = p5.floor(p5.random(0, data.length));

  let stock_title_html = document.querySelector(".heading");
  let stock_description_html = document.querySelector(".description");
  stock_title_html.innerHTML = `${data[randomStock]["CompanyName"]} (${data[randomStock]["Symbol"]} : ${data[randomStock]["Exchange"]})`;
  stock_description_html.innerHTML = data[randomStock]["Description"];

  let stock_info_link = document.querySelector("#stock_info");
  stock_info_link.setAttribute(
    "href",
    `https://finance.yahoo.com/quote/${data[randomStock]["Symbol"]}`
  );

  stock_html.style.display = "flex";
  stock_info.style.display = "flex";
}

function hideContent() {
  let content = document.querySelector("#stock_content");
  content.style.display = "none";

  let stock_html = document.querySelector(".stock_space");
  let stock_info_html = document.querySelector("#stock_info");
  stock_html.style.display = "none";
  stock_info_html.style.display = "none";

  let stock_title_html = document.querySelector(".heading");
  let stock_description_html = document.querySelector(".description");
  stock_title_html.innerHTML = "Please wait to get a stock...";
  stock_description_html.innerHTML =
    "You have to stay on the website to see your stock.";

  clock.col = color(
    p5.floor(p5.random(0, 200)),
    p5.floor(p5.random(0, 200)),
    p5.floor(p5.random(0, 200))
  );
  p5.randomSecond = p5.floor(p5.random(0, 60));
  contentShown = false;
}
