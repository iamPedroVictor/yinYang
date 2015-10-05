"use strict";

//Construtor - Funcao que irar criar o Objeto
function Player(x,y, context){
  this.x = x;
  this.y = y;
  this.width = 200;
  this.height = 50;
  this.context = context;
  this.velocityX = 0.5; //pixel/segundo
  this.velocityY = 0.1; //pixel/segundo
}

Player.prototype.draw = function(){
  //Irar desenhar na tecla
  this.context.save();
  this.context.fillStyle = this.color;
  this.context.fillRect(this.x,this.y,this.width, this.height);
  this.context.restore();
}

Player.prototype.update = function(input, dt, controler){
  //Atualizar posicao do jogador utilizando a velocidade
  if(controler == "Player1"){
    if(input.left == true){
        this.x -= this.velocityX * dt;
        if(this.x < 0){//verifica se esta colidindo com a parede
          this.x = 0;}
        } else if(input.right == true){
          this.x += this.velocityX * dt;
          if(this.x + this.width > canvas.width){//verifica se esta colidindo com a parede
            this.x = canvas.width - this.width;}
          }
  }
  if(controler == "Player2"){
    if(input.up == true){
        this.x -= this.velocityX * dt;
        if(this.x < 0){//verifica se esta colidindo com a parede
          this.x = 0;}
        } else if(input.down == true){
          this.x += this.velocityX * dt;
          if(this.x + this.width > canvas.width){//verifica se esta colidindo com a parede
            this.x = canvas.width - this.width;}
          }
  }
}


Player.prototype.getCollider = function(){
  return {x: this.x, y: this.y, w: this.width, h: this.height};
}

Player.prototype.isCollidingWith = function(other){
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
