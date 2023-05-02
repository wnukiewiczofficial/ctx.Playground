function Sound(src, vol, loop) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.volume = vol;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  if (loop) this.sound.loop = true;
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.currentTime = 0;
    this.sound.pause();
  };
}

let ob1PNG = new Image();
ob1PNG.src = "./images/obstacle1.png";

let ob2PNG = new Image();
ob2PNG.src = "./images/obstacle2.png";

let ob3PNG = new Image();
ob3PNG.src = "./images/obstacle3.png";

let ob4PNG = new Image();
ob4PNG.src = "./images/obstacle4.png";

let packagePNG = new Image();
packagePNG.src = "./images/package.png";

let housePNG = new Image();
housePNG.src = "./images/house.png";

let fencePNG = new Image();
fencePNG.src = "./images/fence.png";

let skyBG = new Image();
skyBG.src = "./images/sky.png";

let grassPNG = new Image();
grassPNG.src = "./images/grass.png";

let roadPNG = new Image();
roadPNG.src = "./images/road.png";

let pavementPNG = new Image();
pavementPNG.src = "./images/pavement.png";
let pavementH = canvas.height * 0.05;

let nameinput = document.getElementById("name");
let emailinput = document.getElementById("email");
let sendinput = document.getElementById("send");
