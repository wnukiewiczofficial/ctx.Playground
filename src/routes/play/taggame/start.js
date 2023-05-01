let nicknameInput1;
let nicknameInput2;
let button;
let requireLabel = null;

function Menu() {
  image(menuBackgroundImg, -width / 2, 0, p5.width * 2, p5.height); // BG

  domInfo();
  createForm();
  gameTitle();
}

function domInfo() {
  p5.fill(255);
  p5.stroke(0);
  p5.strokeWeight(5);
  p5.textSize(60);
  textAlign(p5.CENTER, p5.CENTER);
  textFont(infoFont);
  p5.text(
    "Enter player nicknames !",
    p5.width / 2,
    p5.height / 4 - p5.textAscent()
  );
}

function gameTitle() {
  nop5.fill();
  p5.stroke(0);
  p5.strokeWeight(5);
  p5.textSize(150);
  textAlign(p5.CENTER, p5.CENTER);
  textFont(titleFont);
  p5.text("TAG GAME", p5.width / 2, p5.height / 2);
}

function createForm() {
  try {
    nicknameInput1 = createInput(players[0].nickname);
  } catch (err) {
    nicknameInput1 = createInput("");
  }
  nicknameInput1.position(p5.width / 2 - 220, p5.height / 4);
  nicknameInput1.size(200);
  nicknameInput1.attribute("placeholder", "Player 1");
  nicknameInput1.attribute("maxlength", "8");

  try {
    nicknameInput2 = createInput(players[1].nickname);
  } catch (err) {
    nicknameInput2 = createInput("");
  }
  nicknameInput2.position(p5.width / 2 + 20, p5.height / 4);
  nicknameInput2.size(200);
  nicknameInput2.attribute("placeholder", "Player 2");
  nicknameInput2.attribute("maxlength", "8");

  button = createButton("Start the game");
  button.position(p5.width / 2 - 75, p5.height / 4 + 30);
  button.size(150);
  button.mousePressed(buttonStart);

  requireInfo = createP("Both fields are required!");
  requireInfo.position(p5.width / 2 - 84, p5.height / 4 - 35);
  requireInfo.style("color", "#FF0000");
  requireInfo.style("font-weight", "bold");
  requireInfo.size(168);
  requireInfo.hide();
}

function buttonStart() {
  if (nicknameInput1.value() != "" && nicknameInput2.value() != "") {
    nicknameInput1.remove();
    nicknameInput2.remove();
    button.remove();
    requireInfo.remove();

    started = true;
    players[0] = new Player(
      50,
      p5.height - 0.03 * (p5.width + p5.height),
      nicknameInput1.value(),
      0
    );
    players[1] = new Player(
      p5.width - 50,
      0.03 * (p5.width + p5.height),
      nicknameInput2.value(),
      1
    );
    players[Math.floor(Math.random() * 2)].tagged = true;
  } else {
    requireInfo.show();
  }
}
