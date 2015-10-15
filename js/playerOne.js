"use strict";

//Construtor - Funcao que irar criar o Objeto
function Player(x,y, context){
  this.x = x;
  this.y = y;
  this.width = 100;
  this.height = 100;
  this.context = context;
  this.velocityX = 0.1; //pixel/segundo
  this.velocityY = 0.7; //pixel/segundo
}

Player.prototype.draw = function(){
  //Irar desenhar na tecla
  this.context.drawImage(this.image,this.x,this.y);
}

Player.prototype.update = function(input, dt, controler){
  //Atualizar posicao do jogador utilizando a velocidade
  if(controler == "Player2"){
    if(input.kup == true){
        this.y -= this.velocityY * dt;
        if(this.y < 0){//verifica se esta colidindo com a parede
          this.y = 0;}
        } else if(input.kdown == true){
          this.y += this.velocityY * dt;
          if(this.y + this.height > canvas.height){//verifica se esta colidindo com a parede
            this.y = canvas.height - this.height;}
          }
  }
  if(controler == "Player1"){
    if(input.kw == true){
        this.y -= this.velocityY * dt;
        if(this.y < 0){//verifica se esta colidindo com a parede
          this.y = 0;}
        } else if(input.ks == true){
          this.y += this.velocityY * dt;
          if(this.y + this.height > canvas.height){//verifica se esta colidindo com a parede
            this.y = canvas.height - this.height;}
          }
  }
}


Player.prototype.getCollider = function(player){
  if(player == "Player1")
    return {x: (this.x + 80), y: this.y, w: 20, h: this.height};
  else if(player == "Player2")
    return {x: this.x, y: this.y, w: 20, h: this.height};
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
