function createMap(){
  if(!ending){
    for(i = 0; i < cells.length; i++){
    	cells[i] = new Array(4);
    }

    // Creating new cells
    for(i = 0; i < cells.length; i++){
    	for(j = 0; j < cells[i].length; j++){
    		cells[i][j] = new Cell(boxW/4*i+canvas.width/2-boxW/2, boxH/4*j + canvas.height/2-boxH/4, boxW/4/2, boxH/4/2, "cell", i, j, false);
      }
    }

    for(i = 0; i < bar.length; i++){
      bar[i] = new Cell(boxW/4*i+canvas.width/2-boxW/2, boxH/4*4 + canvas.height/2-boxH/4, boxW/4/2, boxH/4/2, "bar", i, -1, false);
    }
  }
  else{
    for(i = 0; i < cells.length; i++){
    	cells[i] = new Array(5);

    }

    // Creating new cells
    for(i = 0; i < cells.length; i++){
    	for(j = 0; j < cells[i].length; j++){
    		cells[i][j] = new Cell(boxW/4*i+canvas.width/2-boxW/2, boxH/4*j + canvas.height/2-boxH/4, boxW/4/2, boxH/4/2, "points", i, j, false);
      }
    }


  }
}

function shuffleBar(){
  specialDrawn = false;
  animationON = false;
  for(i = 0; i < bar.length; i++){
    if(Math.random() < 0.1 && !specialDrawn){
      bar[i] = new Cell(boxW/4*i+canvas.width/2-boxW/2, boxH/4*5 + canvas.height/2-boxH/2, boxW/4/2, boxH/4/2, "bar", i, 5, true);
      specialDrawn = true;
      specialValue = bar[i].value;
    }
    else bar[i] = new Cell(boxW/4*i+canvas.width/2-boxW/2, boxH/4*5 + canvas.height/2-boxH/2, boxW/4/2, boxH/4/2, "bar", i, 5, false);
  }
}

function AnimateVertical(i){
  animationON = true;
  let x = i;
  let y = 0;
  animationIntervals.push(setInterval(() => {
    if(y < cells[x].length){
      cells[x][y].tint = 0.2;
    }
    else{
      for(let a in cells[x]) cells[x][a].tint = 1;
      clearInterval(animationIntervals.shift());
      animationON = false;
    }
    y++;
  }, 100));
}

function AnimateHorizontal(j){
  animationON = true;
  let x = 0;
  let y = j;
  animationIntervals.push(setInterval(() => {
    if(x < cells.length){
      cells[x][y].tint = 0.2;
    }
    else{
      for(let a in cells) cells[a][y].tint = 1;
      clearInterval(animationIntervals.shift());
      animationON = false;
    }
    x++;
  }, 100));
}

function AnimateDiagonal(side){
  animationON = true;
  if(side == "left"){
    let x = 0;
    let y = 0;
    animationIntervals.push(setInterval(() => {
      if(x < cells.length){
        cells[x][y].tint = 0.2;
      }
      else{
        for(let a = 0, b = 0; a < cells.length; a++, b++){
          cells[a][b].tint = 1;
        }
        clearInterval(animationIntervals.shift());
        animationON = false;
      }
      x++;
      y++;
    }, 100));
  }
  else if(side == "right"){
    let x = cells.length-1;
    let y = 0;
    animationIntervals.push(setInterval(() => {
      if(x >= 0){
        cells[x][y].tint = 0.2;
      }
      else{
        for(let a = cells.length-1, b = 0; a >= 0; a--, b++){
          cells[a][b].tint = 1;
        }
        clearInterval(animationIntervals.shift());
        animationON = false;
      }
      x--;
      y++;
    }, 200));
  }
}

function checkLines(i, j, isScoring){
  let clear = 0;
  // Vertical
  for(let x in cells[i]){
    if(!cells[i][x].matched) break;
    if(x == bar.length-1){
      clear++;
      if(isScoring) AnimateVertical(i);
    }
  }

  // Horizontal
  for(let x = 0; x < bar.length; x++){
    if(!cells[x][j].matched) break;
    if(x == bar.length-1){
      clear++;
      if(isScoring) AnimateHorizontal(j);
    }
  }

  //Diagonal
  if(i == j){
    for(let x = 0; x < bar.length; x++){
      if(!cells[x][x].matched) break;
      if(x == bar.length-1){
        clear++;
        if(isScoring) AnimateDiagonal("left");
      }
    }
  }
  if(j == cells[j].length-1-i){
    for(let x = 0, x2 = bar.length-1; x < bar.length; x++, x2--){
      if(!cells[x][x2].matched) break;
      if(x == bar.length-1){
        clear++;
        if(isScoring) AnimateDiagonal("right");
      }
    }
  }

  //Checking the whole field
  let wholeField = true;
  for(let x = 0; x < cells.length; x++){
    for(let y = 0; y < cells[x].length; y++){
      if(!cells[x][y].matched){
        wholeField = false;
        break;
      }
      if(x == cells.length-1 && y == cells[x].length-1 && wholeField) clear = 5;
    }
  }
  return clear;
}

function calculateBonuses(value){
  if(value == "-5%"){
    score -= Math.floor(score * 0.05);
  } else if(value == "0%"){
    score = score;
  } else if(value == "5%"){
    score += Math.ceil(score * 0.05);
  } else if(value == "2x"){
    score *= 2;
  } else if(value == "4x"){
    score *= 4;
  }
}

function Restart(){
  won = false;
  started = true;
  ending = false;

  hintShown = false;
  hintCell = undefined;
  bonusCell = undefined;

  animationON = false;
  animationIntervals = [];

  specialDrawn = undefined;
  specialValue = undefined;
  specialUsed = false;

  round = 1;
  score = 0;

  values = [];
  cells = new Array(4);
  bar = new Array(4);

  pointsValuesCounter = {
  	minper5: 0,
  	per0: 0,
  	per5: 0,
  	x2: 0,
  	x4: 0
  };
}
