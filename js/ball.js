"use strict";

function ball(x,y,context){
  this.context = context;
  this.x = x;
  this.y = y;
  this.vx = 0.5;
  this.vy = 0.5;
  this.collidables = [];

  this.color = 'black';
  this.raio = 10;
}

ball.prototype.draw = function(){
  this.context.save();
  this.context.fillStyle = this.cor;
  this.context.beginPath();
  this.context.arc(this.x, this.y, this.raio, 0, 2 * Math.PI, false);
  this.context.fill();
  this.context.restore();
}

ball.prototype.update = function(dt){
  if(this.x < this.raio || this.x > canvas.width - this.raio)
    this.vx *= -1;
  if(this.y < this.raio || this.y > canvas.height - this.raio)
    this.vy *= -1;

  this.x += this.vx * dt;
  this.y += this.vy * dt;

}

ball.prototype.getCollider = function(){
  return {x: this.x - this.raio, y: this.y - this.raio, w: 20, h: 20};
}

ball.prototype.isCollidingWith = function(other){
    if(other == null) return false;

    var collider = this.getCollider();
    if((collider.x + collider.w) > other.x &&
       (collider.y + collider.h) > other.y &&
       collider.x < (other.x + other.w) &&
       collider.y < (other.y + other.h)){
        return true;
    }
    else return false;
}
