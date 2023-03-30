function boxes(x, y){
  this.x = x;
  this.y = y;
  let c = 200;
  
  this.display = function(){
    fill(c)
    rect(this.x, this.y, 35);
  }
  
  this.color = function(player){
    if(player > 0){
      c = 255;
    } else{
      c = 0
    }
  }
  
  this.splice = function(player){
    return player;
  }
}