"use strict";

//variaveis globais do jogo
var canvas = document.getElementById("canvas"); //Referencia do canvas
var context = canvas.getContext('2d'); //Contexto
var fps = 60; //fps desejado
var gameStart = false;
var lastUpdate = null; //Tempo atual (para a fisica)
var win = '';
var restart_btn = document.getElementById("restart");
var menu_btn = document.getElementById("Menu");
var Player1 = new Player(312,canvas.height - (canvas.height * 0.98),context);
var Player2 = new Player(312,canvas.height - (canvas.height * 0.18),context);
var BolaO = new ball(8,100,context);
var BolaT = new ball(8,canvas.height/2,context);
//Objetos do jogo
var blocosGame = [];

//inicializando o jogo
function gameInit(){
  Player1 = new Player(312,canvas.height - (canvas.height * 0.98),context);
  Player2 = new Player(312,canvas.height - (canvas.height * 0.18),context);
  BolaO = new ball(8,100,context);
  BolaT = new ball(8,canvas.height/2,context);
  restart_btn.style.display = "none";
  menu_btn.style.display = "none"

  lastUpdate = Date.now(); //Tempo atual (para a fisica)

  //Adicionar as animacoes aqui
  for(var i = 0; i < 12; i++){
    blocosGame.push(new Blocos(
      (10 + i*60),
      (canvas.height/2),
      context))
  }
  gameStart = true;
  gameloop(); //Chamar o gameloop

}

function gameloop(){
//requisitar o proximo frame
if(gameStart){
requestAnimFrame(gameloop);
//Atualizar estado interno do jogo
update();
//Desenhar os objetos no canvas
render();
} else{
  gameOver();
}
}


function update(){ //Atualiza o estado interno do jogo
  //registar a diferenca do tempo atual
  var now = Date.now();
  var dt = now - lastUpdate;
  lastUpdate = now;
  //Atualizar posicao do player, com as teclas e deltaTime

if(BolaO.isCollidingWith(Player1.getCollider())){
  BolaO.vy *= -1;
  BolaO.y += 15;
}else if(BolaO.isCollidingWith(Player2.getCollider())){
  BolaO.vy *= -1;
  BolaO.y -= 15;
}

for(var i= 0; i < blocosGame.length; i++) {

  if(BolaO.isCollidingWith(blocosGame[i].getCollider())){
    blocosGame.splice(i, 1);
    BolaO.vy *= -1;
  }

}
if(BolaO.y - BolaO.raio < 0){
  win = 'Player2';
  gameStart = false;
} else if( BolaO.y > canvas.height - BolaO.raio){
  win = 'Player1';
  gameStart = false;
}
  Player1.update(keys,dt,"Player1");
  Player2.update(keys,dt,"Player2");
  BolaO.update(dt);
  BolaT.update(dt);

}

function render(){//Desenhar os objetos no canvas
  //limpar a tela
  context.clearRect(0,0, canvas.width, canvas.height);
  //Camada de fundo - inicio
  context.drawImage(ImageLoader.images['fundo'],0,0);
  //Camada de fundo - fim
  //Camada dos objetos - inicio
  BolaO.draw();
  BolaT.draw();
  context.drawImage(ImageLoader.images['player1'],Player1.x,Player1.y);
  context.drawImage(ImageLoader.images['player2'],Player2.x,Player2.y);
  for(var i = 0; i < blocosGame.length; i++){
    blocosGame[i].draw();
  }
  //Camada dos objetos - Fim
}

function gameOver(){
console.debug("GameOver");
context.clearRect(0,0, canvas.width, canvas.height);
context.font = '42pt Magic Pies';
context.fillStyle = '#000000';
context.fillText("O Jogador " + win + " Venceu", (canvas.width / 2) - 180, (canvas.height / 2) - 50);
restart_btn.style.display = "block";
menu_btn.style.display = "block"
console.debug("Restart block");
restart_btn.onclick = function(){
  gameInit();
}
menu_btn.onclick = function(){
  gameInit();
}
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
