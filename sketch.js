let point = [];
let connectLine = [];
let box = [];
let boxFilled = [];
let pick1;
let pick2;
let pTurn = 0;
let players = ['Player 1', 'Player 2'];
let order;
let topText = '';
let botText = '';

function setup() {
  createCanvas(400, 455);
  // background(200);
  
  //renaming global variables for alteration
  let offset = 400 / 20;
  let x = 400 / 10 - offset;
  let y = 400 / 10 - offset;

  //create those points
  for(let i = 0; i <= 99; i++){
    point.push(new points(x,y));
    x += 400/10;
    if(x >= 400){
      y += 400/10;
      x = 400/10 - offset;
    }
  }
  
  //rename global variables again
  offset = 2.5
  x = 20 + offset;
  y = 20 + offset;
  
  //creating box array
  for(let i = 0; i < 81; i++){
    box.push(new boxes(x, y));
    x += 40;
    if(x >= 400-40){
      y += 40;
      x = 20 + offset;
    }
  }
  
  //Array of undefined for boxes that get completed
  for(let i = 0; i < 81; i++){
    boxFilled[i] = undefined;
  }
  
  order = 0;
  
  reset = createButton('Reset');
  reset.position(345,430);
  reset.mousePressed(newGame);
}

function draw() {
  
  background(200);
  
  if(topText != ''){
    textSize(32);
    fill(0);
    text(topText, 10, 420);
  }
  
  if(botText != ''){
    textSize(32);
    fill(0);
    text(botText, 10, 450);
  }
  
  //drawing boxes
  for(let i = 0; i < box.length; i++){
    strokeWeight(0);
    box[i].display();
  }
  
  //drawing connectLines
  for(let i = 0; i < connectLine.length; i++){
    if(connectLine[0] != undefined){
      strokeWeight(5);
      connectLine[i].display();
    }
  }
  
  //Drawing points
  for(let i = 0; i < point.length; i++){
    strokeWeight(1);
    point[i].display();
  }
  
}

function newGame(){
  topText = '';
  botText = '';
  pick1 = '';
  pick2 = '';
  pTurn = -1;
  order = 0;
  
  connectLine.splice(0,connectLine.length);
  
  //Array of undefined for boxes that get completed
  for(let i = 0; i < 81; i++){
    boxFilled[i] = undefined;
  }
}

function mouseClicked(){
  let turn;
  pTurn += 1;
  
  //first choice
  while(pTurn == 1){
    
    //Nab those point 1 coord
    for(let i = 0; i < point.length; i++){

      // true/false was point 1 selected?
      let bool = point[i].clicked(mouseX, mouseY, point[i].x, point[i].y);

      //create local variable
      if(bool==true){
        pick1 = point[i];
        pTurn++;
        botText = '';
        break;
      }
      else if(i==point.length-1){
        botText = 'No point selected';
        // console.log('No point selected');
        pTurn--;
      }
    }
  }
  
  //Blank
  while(pTurn == 2){
    //Nothing to see here
    break;
  }
  
  // second choice
  while(pTurn == 3 || pTurn == 4){

    //Nab those point 2 coord
    for(let i = 0; i < point.length; i++){
      let bool = false;

      while(bool == false){
        // true/false was point 2 selected?
        bool = point[i].clicked(mouseX, mouseY, point[i].x, point[i].y);
        if(bool == false){
          botText = 'No point selected';
          pTurn = 2;
          break;
        }
      }

      //create local variable
      if(bool==true){
        pick2 = point[i];
        pTurn++;
        botText = '';
        //continue for color reset
        break;
      }
      else if(i==point.length-1){
        
        botText = 'No point selected';
        // console.log('No point selected');
        pTurn = 2;
        
      }
    }
    //reset all point color
    while(pTurn == 4){
      
      for(let i = 0; i < point.length; i++){
        point[i].resetColor();
      }
      pTurn++;
    }
  }

  // Draw connectLine between 2 points & check if box has 4 walls
  if(pTurn == 5){
    
    //If the first pick has higher value, then flip values with second pick
    if(pick1.x > pick2.x && pick1.y == pick2.y || pick1.y > pick2.y && pick1.x == pick2.x){
      let tempX = pick2.x;
      let tempY = pick2.y;
      
      pick2.x = pick1.x;
      pick2.y = pick1.y;
      
      pick1.x = tempX;
      pick1.y = tempY;
    }

    //Right left
    if(pick1.x - 40 == pick2.x && pick1.y == pick2.y){
      connectLine.push(new lines(pick1.x, pick1.y, pick2.x, pick2.y));
    }
    
    //Left right
    if(pick1.x + 40 == pick2.x && pick1.y == pick2.y){
      connectLine.push(new lines(pick1.x, pick1.y, pick2.x, pick2.y));
    }
    
    //Bottom up
    if(pick1.x == pick2.x && pick1.y - 40 == pick2.y){
      connectLine.push(new lines(pick1.x, pick1.y, pick2.x, pick2.y));
    }
    
    //Top down
    if(pick1.x == pick2.x && pick1.y + 40 == pick2.y){
      connectLine.push(new lines(pick1.x, pick1.y, pick2.x, pick2.y));
    }
        
    //look to see if box was completed
    for(let i = 0; i < box.length; i++){
      
      let offset = 2.5;
      
      let box_TL = [box[i].x - offset, box[i].y - offset];
      let box_TR = [box[i].x + 40 - offset, box[i].y - offset];
      let box_BL = [box[i].x - offset, box[i].y + 40 - offset];
      let box_BR = [box[i].x + 40 - offset, box[i].y + 40 - offset];

      let countSides = 0;
      //Link between touching connectors
      for(let j = 0; j < connectLine.length; j++){
        
        //Top
        if(box_TL[0] == connectLine[j].x1 && box_TR[0] == connectLine[j].x2 &&
          box_TL[1] == connectLine[j].y1 && box_TR[1] == connectLine[j].y2){
          countSides++;
        }
        
        //Bottom
        if(box_BL[0] == connectLine[j].x1 && box_BR[0] == connectLine[j].x2 &&
          box_BL[1] == connectLine[j].y1 && box_BR[1] == connectLine[j].y2){
          countSides++;
        }
        
        //Right
        if(box_TR[0] == connectLine[j].x1 && box_BR[0] == connectLine[j].x2 &&
          box_TR[1] == connectLine[j].y1 && box_BR[1] == connectLine[j].y2){
          countSides++;
        }
        
        //Left
        if(box_TL[0] == connectLine[j].x1 && box_BL[0] == connectLine[j].x2 &&
          box_TL[1] == connectLine[j].y1 && box_BL[1] == connectLine[j].y2){
          countSides++;
        }
        
        //Does a box have 4 walls
        if(countSides == 4){
          
          //is the box empty
          if(boxFilled[i] == undefined){
            boxFilled[i] = order;
            box[i].color(order);
            pTurn++;
            turn = order;
          }
        }
      }
    }
    
  }

  //Change player turn from 1 to 2
  if(order == 0 && pTurn >= 5){
    
    if(players[order] == 'Player 1' && turn == 0){
      pTurn = 0;
      topText = players[order] + ' earned a point.';
    }
    else{
      order++;
      pTurn = 0;
      topText = players[order] + ' turn.';
    }
  }
  
  //Change player turn from 2 to 1
  else if(order == 1 && pTurn >= 5){
    
    if(players[order] == 'Player 2' && turn == 1){
      pTurn = 0;
      topText = players[order] + ' earned a point.';
    }
    else{
      order--;
      pTurn = 0;
      topText = players[order] + ' turn.';
    }
  }
}