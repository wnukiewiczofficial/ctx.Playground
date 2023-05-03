let nicknameInput1;
let nicknameInput2;
let button;
let requireInfo;
import {
  p5,
  menuBackgroundImg,
  infoFont,
  titleFont,
  players,
  started,
  cnvParent,
} from "./globals";
import Player from "./player";

export default function Menu() {
  p5.value.image(
    menuBackgroundImg.value,
    -p5.value.width / 2,
    0,
    p5.value.width * 2,
    p5.value.height
  ); // BG

  domInfo();
  createForm();
  gameTitle();
}

function domInfo() {
  p5.value.fill(255);
  p5.value.stroke(0);
  p5.value.strokeWeight(5);
  p5.value.textSize(60);
  p5.value.textAlign(p5.value.CENTER, p5.value.CENTER);
  p5.value.textFont(infoFont.value);
  p5.value.text(
    "Enter player nicknames !",
    p5.value.width / 2,
    p5.value.height / 4 - p5.value.textAscent()
  );
}

function gameTitle() {
  p5.value.noFill();
  p5.value.stroke(0);
  p5.value.strokeWeight(5);
  p5.value.textSize(150);
  p5.value.textAlign(p5.value.CENTER, p5.value.CENTER);
  p5.value.textFont(titleFont.value);
  p5.value.text("TAG GAME", p5.value.width / 2, p5.value.height / 2);
}

function createForm() {
  try {
    nicknameInput1 = p5.value.createInput(players.value[0].nickname);
  } catch (err) {
    nicknameInput1 = p5.value.createInput("");
  }
  nicknameInput1.position(p5.value.width / 2 - 220, p5.value.height / 4);
  nicknameInput1.size(200);
  nicknameInput1.attribute("placeholder", "Player 1");
  nicknameInput1.attribute("maxlength", "8");
  nicknameInput1.attribute("required", "true");
  nicknameInput1.parent(cnvParent.value);

  try {
    nicknameInput2 = p5.value.createInput(players.value[1].nickname);
  } catch (err) {
    nicknameInput2 = p5.value.createInput("");
  }
  nicknameInput2.position(p5.value.width / 2 + 20, p5.value.height / 4);
  nicknameInput2.size(200);
  nicknameInput2.attribute("placeholder", "Player 2");
  nicknameInput2.attribute("maxlength", "8");
  nicknameInput2.attribute("required", "true");
  nicknameInput2.parent(cnvParent.value);

  button = p5.value.createButton("Start the game");
  button.position(p5.value.width / 2 - 75, p5.value.height / 4 + 30);
  button.size(150);
  button.mousePressed(buttonStart);
  button.parent(cnvParent.value);

  requireInfo = p5.value.createP("Both fields are required!");
  requireInfo.position(p5.value.width / 2 - 84, p5.value.height / 4 - 35);
  requireInfo.style("color", "#FF0000");
  requireInfo.style("font-weight", "bold");
  requireInfo.size(168);
  requireInfo.hide();
  requireInfo.parent(cnvParent.value);
}

function buttonStart() {
  if (nicknameInput1.value() != "" && nicknameInput2.value() != "") {
    nicknameInput1.remove();
    nicknameInput2.remove();
    button.remove();
    requireInfo.remove();

    started.set(true);
    let pl = players.value;
    pl[0] = new Player(
      50,
      p5.value.height - 0.03 * (p5.value.width + p5.value.height),
      nicknameInput1.value(),
      0
    );
    pl[1] = new Player(
      p5.value.width - 50,
      0.03 * (p5.value.width + p5.value.height),
      nicknameInput2.value(),
      1
    );
    pl[Math.floor(Math.random() * 2)].tagged = true;

    players.set(pl);
  } else {
    requireInfo.show();
  }
}
