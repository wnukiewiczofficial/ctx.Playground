//Showing Menu
function Menu() {
  if (scene == "menu") {
    //Buttons
    EasyButton();
    MediumButton();
    HardButton();

    //Logo (three pluses)
    Logo(p5.width / 2, 0.2 * p5.height, 0.05 * p5.width);
  }
}

//Drawing a logo based on vertexes
function Logo(x, y, size) {
  let beginx = x,
    beginy = y;
  translate(beginx - (size * 4 + (size * 3) / 2), beginy - size / 2);
  p5.stroke(color(113, 50, 168));
  p5.fill(color(113, 50, 168));
  p5.strokeWeight(4);

  for (var i = 0, x = 0; i < 3; i++, x += size * 4) {
    beginShape();
    vertex(x, 0);
    vertex(x + size, 0);
    vertex(x + size, 0 - size);
    vertex(x + size * 2, 0 - size);
    vertex(x + size * 2, 0);
    vertex(x + size * 3, 0);
    vertex(x + size * 3, 0 + size);
    vertex(x + size * 2, 0 + size);
    vertex(x + size * 2, 0 + size * 2);
    vertex(x + size, 0 + size * 2);
    vertex(x + size, 0 + size);
    vertex(x, 0 + size);
    vertex(x, 0);
    endShape();
  }
  translate(0, 0);
  pop();
}

//Drawing easy button
function EasyButton() {
  let bw = p5.width * 0.5;
  let bh = p5.height * 0.1;
  let bx = p5.width / 2 - bw / 2;
  let by = p5.height / 2 - bh * 1.2 - bh / 2;
  let radius = 10;
  let fontSize = 40;

  let mouseHit;
  if (
    p5.mouseX >= bx &&
    p5.mouseX <= bx + bw &&
    p5.mouseY >= by &&
    p5.mouseY <= by + bh
  )
    mouseHit = true;
  else mouseHit = false;

  push();
  p5.fill(mouseHit ? 255 : 0);
  p5.stroke(color(113, 50, 168));
  p5.strokeWeight(4);
  p5.textSize(fontSize);

  p5.rect(bx, by, bw, bh, radius);
  p5.fill(mouseHit ? 0 : 255);
  p5.noStroke();
  textAlign(p5.CENTER, p5.CENTER);
  p5.text("EASY", bx + bw / 2, by + bh / 2);
}

//Drawing medium button
function MediumButton() {
  let bw = p5.width * 0.5;
  let bh = p5.height * 0.1;
  let bx = p5.width / 2 - bw / 2;
  let by = p5.height / 2 - bh / 2;
  let radius = 10;
  let fontSize = 40;

  let mouseHit;
  if (
    p5.mouseX >= bx &&
    p5.mouseX <= bx + bw &&
    p5.mouseY >= by &&
    p5.mouseY <= by + bh
  )
    mouseHit = true;
  else mouseHit = false;

  push();
  p5.fill(mouseHit ? 255 : 0);
  p5.stroke(color(113, 50, 168));
  p5.strokeWeight(4);
  p5.textSize(fontSize);

  p5.rect(bx, by, bw, bh, radius);
  p5.fill(mouseHit ? 0 : 255);
  p5.noStroke();
  textAlign(p5.CENTER, p5.CENTER);
  p5.text("MEDIUM", bx + bw / 2, by + bh / 2);
}

//Drawing hard button
function HardButton() {
  let bw = p5.width * 0.5;
  let bh = p5.height * 0.1;
  let bx = p5.width / 2 - bw / 2;
  let by = p5.height / 2 + bh * 1.2 - bh / 2;
  let radius = 10;
  let fontSize = 40;

  let mouseHit;
  if (
    p5.mouseX >= bx &&
    p5.mouseX <= bx + bw &&
    p5.mouseY >= by &&
    p5.mouseY <= by + bh
  )
    mouseHit = true;
  else mouseHit = false;

  push();
  p5.fill(mouseHit ? 255 : 0);
  p5.stroke(color(113, 50, 168));
  p5.strokeWeight(4);
  p5.textSize(fontSize);

  p5.rect(bx, by, bw, bh, radius);
  p5.fill(mouseHit ? 0 : 255);
  p5.noStroke();
  textAlign(p5.CENTER, p5.CENTER);
  p5.text("HARD", bx + bw / 2, by + bh / 2);
}
