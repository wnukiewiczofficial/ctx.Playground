var fields = [[], [], []]; // An 2Dimensional array containing all the fields: 9 fields (3x3)
var boardSize; // Size of the board (p5.width = p5.height)
var cellSize; // Single cell size
var turn = "X"; // What is the turn, is it for X player or O player
var winner = " "; // Who is the winner

var themeColor; // Theme color (board color, X and O color, text color)

var stopped = false; // If the game is stopped or players are playing

//P5JS Setup function
function setup(p5, canvasParentRef) {
  p5.createCanvas(800, 800); // Creating canvas 800px wide and 800px high
  boardSize = p5.width * 0.6; // It's boards size 60% of canvasp5.width
  cellSize = boardSize / 3; // Its single cell size 33% of board size
  rectMode(p5.CENTER); // Every rect drawn on the screen is centered

  themeColor = color(173, 131, 76); //Giving a brown theme color

  // Creating values for every cell
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      fields[i][j] = new Cell(i, j); // Creating a cell with constructor function
    }
  }
}

//P5JS Draw function
function draw() {
  p5.background(100);

  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      p5.stroke(themeColor);
      p5.strokeWeight(1);
      p5.fill(themeColor);
      p5.textSize(80);
      textAlign(p5.LEFT, p5.TOP);
      p5.text(
        fields[i][j].value,
        fields[i][j].x + fields[i][j].size / 4,
        fields[i][j].y + fields[i][j].size / 4,
        fields[i][j].size,
        fields[i][j].size
      );
    }
  }

  drawBoard();
  if (!stopped) Info();
  else Result();
}

function checkValues() {
  let valueArray = [];
  let isFull = true;

  for (i = 0, a = 0; i < 3; i++) {
    for (j = 0; j < 3; j++, a++) {
      valueArray[a] = fields[j][i].value;
      if (valueArray[a] == " ") isFull = false;
    }
  }

  //X values check (Horizontal, vertical and diagonal)
  if (
    (valueArray[0] == "X" && valueArray[1] == "X" && valueArray[2] == "X") ||
    (valueArray[3] == "X" && valueArray[4] == "X" && valueArray[5] == "X") ||
    (valueArray[6] == "X" && valueArray[7] == "X" && valueArray[8] == "X")
  )
    winner = "X";
  else if (
    (valueArray[0] == "X" && valueArray[3] == "X" && valueArray[6] == "X") ||
    (valueArray[1] == "X" && valueArray[4] == "X" && valueArray[7] == "X") ||
    (valueArray[2] == "X" && valueArray[5] == "X" && valueArray[8] == "X")
  )
    winner = "X";
  else if (
    (valueArray[0] == "X" && valueArray[4] == "X" && valueArray[8] == "X") ||
    (valueArray[2] == "X" && valueArray[4] == "X" && valueArray[6] == "X")
  )
    winner = "X";

  //O values check (Horizontal, vertical and diagonal)
  if (
    (valueArray[0] == "O" && valueArray[1] == "O" && valueArray[2] == "O") ||
    (valueArray[3] == "O" && valueArray[4] == "O" && valueArray[5] == "O") ||
    (valueArray[6] == "O" && valueArray[7] == "O" && valueArray[8] == "O")
  )
    winner = "O";
  else if (
    (valueArray[0] == "O" && valueArray[3] == "O" && valueArray[6] == "O") ||
    (valueArray[1] == "O" && valueArray[4] == "O" && valueArray[7] == "O") ||
    (valueArray[2] == "O" && valueArray[5] == "O" && valueArray[8] == "O")
  )
    winner = "O";
  else if (
    (valueArray[0] == "O" && valueArray[4] == "O" && valueArray[8] == "O") ||
    (valueArray[2] == "O" && valueArray[4] == "O" && valueArray[6] == "O")
  )
    winner = "O";

  if (isFull && winner == " ") winner = "X and O";
  if (winner != " ") stopped = true;
}

function Cell(i, j) {
  this.x = p5.width / 2 - boardSize / 2 + cellSize / 2 + i * cellSize;
  this.y = p5.height / 2 - boardSize / 2 + cellSize / 2 + j * cellSize;
  this.size = cellSize * 0.6;
  this.value = " ";

  this.hits = (x, y) => {
    if (
      x >= this.x - this.size / 2 &&
      x <= this.x + this.size / 2 &&
      y >= this.y - this.size / 2 &&
      y <= this.y + this.size / 2
    ) {
      if (this.value == " ") {
        this.value = turn;
        if (turn == "X") turn = "O";
        else if (turn == "O") turn = "X";
        else turn = "X";

        checkValues();
      }
    }
  };
}

function drawBoard() {
  textAlign(p5.CENTER);
  p5.stroke(0);
  p5.strokeWeight(3);
  p5.text("TIC TAC TOE", p5.width / 2, p5.textAscent());

  p5.stroke(themeColor);
  p5.strokeWeight(4);
  nop5.fill();

  // Horizontal lines
  for (i = 1; i < 3; i++)
    p5.line(
      p5.width / 2 - boardSize / 2,
      p5.height / 2 - boardSize / 2 + (i * boardSize) / 3,
      p5.width / 2 + boardSize / 2,
      p5.height / 2 - boardSize / 2 + (i * boardSize) / 3
    );

  // Vertical lines
  for (i = 1; i < 3; i++)
    p5.line(
      p5.width / 2 - boardSize / 2 + (i * boardSize) / 3,
      p5.height / 2 - boardSize / 2,
      p5.width / 2 - boardSize / 2 + (i * boardSize) / 3,
      p5.height / 2 + boardSize / 2
    );

  p5.strokeWeight(10);
  // Border
  p5.rect(p5.width / 2, p5.height / 2, boardSize, boardSize, 20);
}

function Info() {
  textAlign(p5.CENTER);
  p5.stroke(0);
  p5.strokeWeight(3);
  p5.fill(themeColor);
  p5.textSize(60);
  p5.text(
    "It's turn for " + turn,
    p5.width / 2,
    p5.height - p5.textAscent() * 2
  );
}

function Result() {
  textAlign(p5.CENTER, p5.CENTER);
  p5.stroke(0, 200, 0);
  p5.strokeWeight(3);
  p5.fill(0, 200, 0);
  p5.textSize(80);
  p5.text("Winner is " + winner, p5.width / 2, p5.height - p5.textAscent());
}

function mouseClicked() {
  if (!stopped) {
    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        fields[i][j].hits(p5.mouseX, p5.mouseY);
      }
    }
  } else {
    stopped = false;
    turn = "X";
    winner = " ";

    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        fields[i][j] = new Cell(i, j);
      }
    }
  }
}
