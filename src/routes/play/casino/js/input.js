var mobileX, mobileY;

window.addEventListener("contextmenu", e => e.preventDefault()); // Deleting RMB context

window.addEventListener('touchstart', (e) => {
  let rect = canvas.getBoundingClientRect();
  mobileX = e.touches[0].clientX - rect.left;
  mobileY = e.touches[0].clientY - rect.top;
}, false);
//MOUSE
window.addEventListener('mousedown', interact, false);

function interact(e){
  if(!started){
    started = true;

    cells = new Array(4);
    bar = new Array(4);
    createMap();
  }
  else if(started){
    var pos = getMousePos(canvas, e);

    if(won){
       Restart();
       createMap();
    }
    else{
      if(e.button == 0){
      for(i = 0; i < cells.length; i++){
  			for(j = 0; j < cells[i].length; j++){
  				if(pos.x > cells[i][j].x && pos.x < cells[i][j].x+cells[i][j].w*2 &&
             pos.y > cells[i][j].y && pos.y < cells[i][j].y+cells[i][j].h*2)
             {
               if(cells[i][j].value == bar[i].value && cells[i][j].state == "cell" && !cells[i][j].matched && !specialUsed){
                 let discoveredBeforeMatch = checkLines(i, j, false) == 5 ? 0 : checkLines(i, j, false);
                 cells[i][j].matched = true;
                 bar[i].matched = true;
                 score += 250;
                 if(checkLines(i,j, false) == 5) score += 5000;
                 else score += 1000*(checkLines(i, j, true) - discoveredBeforeMatch);
               }

               if(specialDrawn && !ending && !cells[i][j].matched && specialUsed){
                 if(specialValue == "SW" || specialValue == "G"){
                   let discoveredBeforeMatch = checkLines(i, j, false) == 5 ? 0 : checkLines(i, j, false);
                   cells[i][j].matched = true;
                   if(specialValue == "G") score = Math.floor(score/2);
                   score += 250;
                   if(checkLines(i,j, false) == 5) score += 5000;
                   else score += 1000*(checkLines(i, j, true) - discoveredBeforeMatch);
                   for(let i in bar){
                     if(bar[i].value == "SW" || bar[i].value == "G"){
                       bar[i].matched = true;
                       bar[i].tint = 1;
                       specialDrawn = false;
                       specialUsed = false;
                     }
                   }
                 }
                 else if(specialValue == "W"){
                   for(let x in bar){
                     if(cells[i][j].i == bar[x].i && bar[x].value == "W"){
                       let discoveredBeforeMatch = checkLines(i, j, false) == 5 ? 0 : checkLines(i, j, false);
                       cells[i][j].matched = true;
                       bar[x].matched = true;
                       bar[x].tint = 1;
                       specialDrawn = false;
                       specialUsed = false;
                       score += 250;
                       if(checkLines(i,j, false) == 5) score += 5000;
                       else score += 1000*(checkLines(i, j, true) - discoveredBeforeMatch);
                     }
                   }
                 }
               }

               if(cells[i][j].state == "points" && ending){
                 if(typeof hintCell == "undefined"){
                   cells[i][j].matched = true;
                   hintCell = {i: i, j: j, p5.filled: false, showing: false};
                   cells[hintCell.i][hintCell.j].tint = 0.5;
                   cells[hintCell.i][hintCell.j].applying = true;
                   setTimeout(function(){
                     calculateBonuses(cells[hintCell.i][hintCell.j].value);
                     cells[hintCell.i][hintCell.j].applying = false;
                   }, 1000);
                 } else{
                   if(i == hintCell.i && j == hintCell.j){
                     if(!hintShown && !hintCell.p5.filled){
                       let tmp = cells[i][j].value;
                       cells[i][j].value = "";
                       hintCell.p5.filled = true;
                       hintCell.showing = true;

                       if(bonusCell.j < hintCell.j) cells[i][j].value += "🡱";
                       else if(bonusCell.j > hintCell.j) cells[i][j].value += "🡳";

                       if(bonusCell.i < hintCell.i) cells[i][j].value += "🡰";
                       else if(bonusCell.i > hintCell.i) cells[i][j].value += "🡲";

                       if(cells[i][j].value == "🡱🡰") cells[i][j].value = "🡴";
                       else if(cells[i][j].value == "🡱🡲") cells[i][j].value = "🡵";
                       else if(cells[i][j].value == "🡳🡰") cells[i][j].value = "🡷";
                       else if(cells[i][j].value == "🡳🡲") cells[i][j].value = "🡶";

                       setTimeout(function(){cells[hintCell.i][hintCell.j].value = tmp; hintShown = true; hintCell.showing = false;}, 1500);
                     } else if(hintShown && hintCell.p5.filled){
                       won = true;
                     }

                   } else{
                     if(!hintCell.showing){
                       cells[i][j].matched = true;
                       let x = i, y = j;
                       won = true;
                       cells[hintCell.i][hintCell.j].tint = 0.5;
                       cells[x][y].tint = 0.5;
                       cells[x][y].applying = true;
                       setTimeout(function(){
                         calculateBonuses(cells[x][y].value);
                         cells[x][y].applying = false;
                       }, 1000);
                     }
                   }
                 }
               }
             }
  			}
  		}
    }
      for(let i in bar){
        if(pos.x > bar[i].x && pos.x < bar[i].x+bar[i].w*2 &&
           pos.y > bar[i].y && pos.y < bar[i].y+bar[i].h*2){
             if(bar[i].state == "bar"){
               if(bar[i].special && !specialUsed && specialDrawn){
                 specialUsed = true;
                 bar[i].tint = 0.5;
                 break;
               }
               if(!specialUsed){
                 round++;
                 if(round > 12){
                   round = 13;
                   if(!ending){
                     ending = true;
                     createMap();
                   }
                 }
                 else shuffleBar();
               }
               if(bar[i].special && specialUsed){
                 specialUsed = false;
                 bar[i].tint = 1;
               }
             }
           }
      }
    }
  }
}

window.addEventListener('mousemove', (e) => {
  var pos = getMousePos(canvas, e);
  if(pos.x > canvas.width/2 - boxW/2 && pos.x < canvas.width/2 + boxW/2 &&
     pos.y > canvas.height/2 - boxH/4 && pos.y < canvas.height/2 + boxH)
     {
       if(!mobileX && !mobileY) canvas.style.cursor = "pointer";
     } else canvas.style.cursor = "default";
}, false);

// Function that returns mouse position
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
