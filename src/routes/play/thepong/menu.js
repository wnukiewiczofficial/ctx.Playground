import { p5, scene } from "./globals";

//Showing Menu
export function Menu() {
  if (scene.value == "menu") {
    //Buttons
    EasyButton();
    MediumButton();
    HardButton();

    //Logo (three pluses)
    Logo(p5.value.width / 2, 0.2 * p5.value.height, 0.05 * p5.value.width);
  }
}

//Drawing a logo based on vertexes
export function Logo(x, y, size) {
  let beginx = x,
    beginy = y;
  p5.value.translate(beginx - (size * 4 + (size * 3) / 2), beginy - size / 2);
  p5.value.stroke(p5.value.color(113, 50, 168));
  p5.value.fill(p5.value.color(113, 50, 168));
  p5.value.strokeWeight(4);

  for (let i = 0, x = 0; i < 3; i++, x += size * 4) {
    p5.value.beginShape();
    p5.value.vertex(x, 0);
    p5.value.vertex(x + size, 0);
    p5.value.vertex(x + size, 0 - size);
    p5.value.vertex(x + size * 2, 0 - size);
    p5.value.vertex(x + size * 2, 0);
    p5.value.vertex(x + size * 3, 0);
    p5.value.vertex(x + size * 3, 0 + size);
    p5.value.vertex(x + size * 2, 0 + size);
    p5.value.vertex(x + size * 2, 0 + size * 2);
    p5.value.vertex(x + size, 0 + size * 2);
    p5.value.vertex(x + size, 0 + size);
    p5.value.vertex(x, 0 + size);
    p5.value.vertex(x, 0);
    p5.value.endShape();
  }
  p5.value.translate(0, 0);
  p5.value.pop();
}

//Drawing easy button
function EasyButton() {
  let bw = p5.value.width * 0.5;
  let bh = p5.value.height * 0.1;
  let bx = p5.value.width / 2 - bw / 2;
  let by = p5.value.height / 2 - bh * 1.2 - bh / 2;
  let radius = 10;
  let fontSize = 40;

  let mouseHit;
  if (
    p5.value.mouseX >= bx &&
    p5.value.mouseX <= bx + bw &&
    p5.value.mouseY >= by &&
    p5.value.mouseY <= by + bh
  )
    mouseHit = true;
  else mouseHit = false;

  p5.value.push();
  p5.value.fill(mouseHit ? 255 : 0);
  p5.value.stroke(p5.value.color(113, 50, 168));
  p5.value.strokeWeight(4);
  p5.value.textSize(fontSize);

  p5.value.rect(bx, by, bw, bh, radius);
  p5.value.fill(mouseHit ? 0 : 255);
  p5.value.noStroke();
  p5.value.textAlign(p5.value.CENTER, p5.value.CENTER);
  p5.value.text("EASY", bx + bw / 2, by + bh / 2);
}

//Drawing medium button
function MediumButton() {
  let bw = p5.value.width * 0.5;
  let bh = p5.value.height * 0.1;
  let bx = p5.value.width / 2 - bw / 2;
  let by = p5.value.height / 2 - bh / 2;
  let radius = 10;
  let fontSize = 40;

  let mouseHit;
  if (
    p5.value.mouseX >= bx &&
    p5.value.mouseX <= bx + bw &&
    p5.value.mouseY >= by &&
    p5.value.mouseY <= by + bh
  )
    mouseHit = true;
  else mouseHit = false;

  p5.value.push();
  p5.value.fill(mouseHit ? 255 : 0);
  p5.value.stroke(p5.value.color(113, 50, 168));
  p5.value.strokeWeight(4);
  p5.value.textSize(fontSize);

  p5.value.rect(bx, by, bw, bh, radius);
  p5.value.fill(mouseHit ? 0 : 255);
  p5.value.noStroke();
  p5.value.textAlign(p5.value.CENTER, p5.value.CENTER);
  p5.value.text("MEDIUM", bx + bw / 2, by + bh / 2);
}

//Drawing hard button
function HardButton() {
  let bw = p5.value.width * 0.5;
  let bh = p5.value.height * 0.1;
  let bx = p5.value.width / 2 - bw / 2;
  let by = p5.value.height / 2 + bh * 1.2 - bh / 2;
  let radius = 10;
  let fontSize = 40;

  let mouseHit;
  if (
    p5.value.mouseX >= bx &&
    p5.value.mouseX <= bx + bw &&
    p5.value.mouseY >= by &&
    p5.value.mouseY <= by + bh
  )
    mouseHit = true;
  else mouseHit = false;

  p5.value.push();
  p5.value.fill(mouseHit ? 255 : 0);
  p5.value.stroke(p5.value.color(113, 50, 168));
  p5.value.strokeWeight(4);
  p5.value.textSize(fontSize);

  p5.value.rect(bx, by, bw, bh, radius);
  p5.value.fill(mouseHit ? 0 : 255);
  p5.value.noStroke();
  p5.value.textAlign(p5.value.CENTER, p5.value.CENTER);
  p5.value.text("HARD", bx + bw / 2, by + bh / 2);
}
