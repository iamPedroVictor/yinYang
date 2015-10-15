function Blocos (x,y,context){
  this.x = x;
  this.y = y;
  this.context = context;
  this.width = 20;
  this.height = 25;
  this.color = 'blue';
  this.image = "sprite/bambu.png"
}

Player.prototype.draw = function(){
  //Irar desenhar na tecla
  this.context.drawImage(this.image,this.x,this.y);
}

/*Blocos.prototype.draw = function (){
  this.context.save();
  this.context.fillStyle = this.color;
  this.context.strokeStyle = 'red';
  this.context.strokeRect(this.x,this.y,this.width,this.height);
  this.context.fillRect(this.x,this.y,this.width, this.height);
  this.context.restore();
}*/

Blocos.prototype.getCollider = function(){
  return {x: this.x, y: this.y, w: this.width, h: this.height};
}
