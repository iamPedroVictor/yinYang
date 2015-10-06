"use strict";

//variaveis globais do jogo
var canvas = document.getElementById("canvas"); //Referencia do canvas
var context = canvas.getContext('2d'); //Contexto
var incontext = context;
var fps = 60; //fps desejado
var lastUpdate = Date.now(); //Tempo atual (para a fisica)

//Objetos do jogo
var Player1 = new Player(312,canvas.height - (canvas.height * 0.95),context);
var Player2 = new Player(312,canvas.height - (canvas.height * 0.10),context);
var Bola = new ball(100,100,context);
var buttonPlay = new Image();
buttonPlay.src = 'imgs/play-Button.jpg';
var img = new Image();
img.src = 'imgs/fundo.png';
var gameStart = true;
//inicializando o jogo
function init(){
  //Adicionar as animacoes aqui
  //
  if(gameStart){
  gameloop(); //Chamar o gameloop
}else{
  mainMenu();
}
}

function mainMenu(){
  requestAnimFrame(mainMenu);
  context.clearRect(0,0, canvas.width, canvas.height);
  context.drawImage(buttonPlay,200,500);

}
function gameloop(){
//requisitar o proximo frame
requestAnimFrame(gameloop);
//Atualizar estado interno do jogo
update();
//Desenhar os objetos no canvas
render();
}


function update(){ //Atualiza o estado interno do jogo
  //registar a diferenca do tempo atual
  var now = Date.now();
  var dt = now - lastUpdate;
  lastUpdate = now;
  //Atualizar posicao do player, com as teclas e deltaTime

if(Bola.isCollidingWith(Player1.getCollider())){
  Bola.vy *= -1;
  Bola.y += 15;
}else if(Bola.isCollidingWith(Player2.getCollider())){
  Bola.vy *= -1;
  Bola.y -= 15;
}

  Player1.update(keys,dt,"Player1");
  Player2.update(keys,dt,"Player2");
  Bola.update(dt);

}

function render(){//Desenhar os objetos no canvas
  //limpar a tela
  context.clearRect(0,0, canvas.width, canvas.height);
  //Camada de fundo - inicio
  context.drawImage(img,0,0);
  //Camada de fundo - fim
  //Camada dos objetos - inicio
  Player1.draw();
  Player2.draw();
  Bola.draw();
  //Camada dos objetos - Fim
}

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / fps);
          };
})();
