"use strict";

//Construtor - Funcao que irar criar o Objeto
function Player(x,y, context){
  this.x = x;
  this.y = y;
  this.width = 100;
  this.height = 100;
  this.context = context;
  this.velocityX = 0.5; //pixel/segundo
  this.velocityY = 0.1; //pixel/segundo
}

Player.prototype.draw = function(){
  //Irar desenhar na tecla
  this.context.drawImage(this.image,this.x,this.y);
}

Player.prototype.update = function(input, dt, controler){
  //Atualizar posicao do jogador utilizando a velocidade
  if(controler == "Player1"){
    if(input.left == true){
        this.y -= this.velocityX * dt;
        if(this.y < 0){//verifica se esta colidindo com a parede
          this.y = 0;}
        } else if(input.right == true){
          this.y += this.velocityX * dt;
          if(this.y + this.height > canvas.height){//verifica se esta colidindo com a parede
            this.y = canvas.height - this.height;}
          }
  }
  if(controler == "Player2"){
    if(input.up == true){
        this.y -= this.velocityX * dt;
        if(this.y < 0){//verifica se esta colidindo com a parede
          this.y = 0;}
        } else if(input.down == true){
          this.y += this.velocityX * dt;
          if(this.y + this.height > canvas.height){//verifica se esta colidindo com a parede
            this.y = canvas.height - this.height;}
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
