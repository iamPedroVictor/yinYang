"use strict";

function ball(x,y,context){
  this.context = context;
  this.x = x;
  this.y = y;
  this.vx = 0.3;
  this.vy = 0.3;
  this.collidables = [];
  this.width = 25;
  this.height = 25;

  this.color = 'black';
}


ball.prototype.update = function(dt){
  if(this.x < this.width || this.x > canvas.width - this.width)
    this.vx *= -1;
  if(this.y < this.height ){
    this.vy *= -1;
    this.y += 10;
  } else if(this.y > canvas.height - this.height){
    this.vy *= -1;
    this.y -= 10;
  }

  this.x += this.vx * dt;
  this.y += this.vy * dt;

}

ball.prototype.getCollider = function(){
  return {x: this.x, y: this.y, w: 35, h: 35};
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
