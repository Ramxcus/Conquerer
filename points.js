function points(x, y){
  this.x = x;
  this.y = y;
  this.r = 10;
  let c = color('orange');

  this.display = function(){
    fill(c);
    ellipse(this.x, this.y, this.r);
  }

  this.clicked = function(mX, mY, cX, cY){
    //find dist between mouse click and all points
    let d = dist(mX, mY, cX, cY);
    let bool = false
    
    //found closest point
    if(d <= this.r){
      bool = true;
      c = color('white');
      return bool;
    }
    else return bool;
  }
  
  this.resetColor = function(){
    c = color('orange');
  }
}