function Blocos (x,y,context){
  this.x = x;
  this.y = y;
  this.context = context;
  this.width = 50;
  this.height = 30;
  this.color = 'blue';
}

Blocos.prototype.draw = function (){
  this.context.save();
  this.context.fillStyle = this.color;
  this.context.strokeStyle = 'red';
  this.context.strokeRect(this.x,this.y,this.width,this.height);
  this.context.fillRect(this.x,this.y,this.width, this.height);
  this.context.restore();
}

Blocos.prototype.getCollider = function(){
  return {x: this.x, y: this.y, w: this.width, h: this.height};
}
