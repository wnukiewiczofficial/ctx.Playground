function createMap(){
  flagCount = 0;
  correctFlags = 0;
  timePassed = 0;
  discovered = 0;
  won = false;

  for(i = 0; i < cells.length; i++){
  	cells[i] = new Array(tilesInRow);
  }

  // Creating new cells
  for(i = 0; i < cells.length; i++){
  	for(j = 0; j < cells[i].length; j++){
  		cells[i][j] = new Cell(boxW/tilesInRow*i+canvas.width/2-boxW/2, boxH/tilesInRow*j + canvas.height/2-boxH/2, boxW/tilesInRow/2, boxH/tilesInRow/2, i, j);
  	}
  }
  for(x = 0; x < bombCount; x++){
  	let i = Math.floor(Math.random()*cells.length);
  	let j = Math.floor(Math.random()*cells[i].length);

  	if(cells[i][j].isBomb){
  		x--;
  	}else cells[i][j].isBomb = true;
  }

  for(i = 0; i < cells.length; i++){
  	for(j = 0; j < cells[i].length; j++){
  		cells[i][j].checkBombsAround();
  	}
  }
}

function checkWin(){
  if(discovered == tileCount-bombCount && flagCount == bombCount){
    started = false;
    canDiscover = false;
    won = true;

    clearInterval(intervalVar);
  }
}
