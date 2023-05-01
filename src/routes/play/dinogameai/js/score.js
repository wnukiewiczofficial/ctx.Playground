var scoreBlocks = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var score = 0;
var scoreController = 0;

var scoreFontSprites = [
  {x: 484, y: 2, w: 9, h: 11}, // 0
  {x: 495, y: 2, w: 8, h: 11}, // 1
  {x: 504, y: 2, w: 9, h: 11}, // 2
  {x: 514, y: 2, w: 9, h: 11}, // 3
  {x: 524, y: 2, w: 9, h: 11}, // 4
  {x: 534, y: 2, w: 9, h: 11}, // 5
  {x: 544, y: 2, w: 9, h: 11}, // 6
  {x: 554, y: 2, w: 9, h: 11}, // 7
  {x: 564, y: 2, w: 9, h: 11}, // 8
  {x: 574, y: 2, w: 9, h: 11} // 9
];

function recursiveScore(index){
  if(index >= 0 && index < scoreBlocks.length)
  {
    scoreBlocks[index]++;
    if(scoreBlocks[index] > 9){
      scoreBlocks[index] = 0;
      recursiveScore(index-1);
    }
  }
}

function showScore(){

  scoreController++;
  if(scoreController >= 60/16){
    recursiveScore(scoreBlocks.length-1);
    scoreController = 0;
  }

  for(i = 0; i < scoreBlocks.length; i++)
  {
    let idx = scoreBlocks[i];
    ctx.drawImage(sprites,scoreFontSprites[idx].x,scoreFontSprites[idx].y,
      scoreFontSprites[idx].w,scoreFontSprites[idx].h,
      (canvas.width-scoreBlocks.length*canvas.width/80)+canvas.width/96*i, canvas.height/4, canvas.width/96, canvas.width/96);

  }
}
