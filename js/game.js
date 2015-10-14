"use strict";

//variaveis globais do jogo
var canvas = document.getElementById("canvas"); //Referencia do canvas
var context = canvas.getContext('2d'); //Contexto
var fps = 60; //fps desejado
var gameStart = true;
var lastUpdate = null; //Tempo atual (para a fisica)
var win = '';
var menuElem = document.getElementById("menu-container");
var canvasElem = document.getElementById("canvas-container");
var overElem = document.getElementById("gameOver-container");
var Player1 = new Player(canvas.width - (canvas.width * 0.98),(canvas.height/2)-50,context);
var Player2 = new Player(canvas.width - (canvas.width * 0.10),(canvas.height/2)-50,context);
var BolaO = new ball(Player1.x + 115,Player1.y - 50,context);
var BolaT = new ball((Player2.x - 10),(Player2.y - 50),context);
var restart_btn = document.getElementById("restart");
var menu_btn = document.getElementById("Menu");
var contadori = 0;
var contadorj = 0;
var timei = 0;
var timej = 0;
//Objetos do jogo
var blocosGame = [];

//inicializando o jogo
function gameInit(){
  var contadori = 0;
  var contadorj = 0;
  Player1 = new Player(canvas.width - (canvas.width * 0.98),(canvas.height/2)-50,context);
  Player2 = new Player(canvas.width - (canvas.width * 0.10),(canvas.height/2)-50,context);
  BolaO = new ball((Player1.x + 115),(Player1.y - 50),context);
  BolaT = new ball((Player2.x - 10),(Player2.y - 50),context);

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

//Atualizar a bola ao colidir com os players
if(BolaO.isCollidingWith(Player1.getCollider("Player1")) && contadori == 0){
  if(BolaO.y+35 < Player1.y + 11){
    BolaO.vy *= -1;
    BolaO.y -= 10;
  } else if(Player1.y + 90 < BolaO.y){
    BolaO.vy *= -1;
    BolaO.y += 10;
  }
  BolaO.vx *= -1;
  BolaO.x += 10;
  contadori = 1;
}else if(BolaO.isCollidingWith(Player2.getCollider("Player2")) && contadori == 0){
  if(BolaO.y+35 < Player2.y + 11){
    BolaO.vy *= -1;
    BolaO.y -= 10;
  }else if(Player2.y + 90 < BolaO.y){
    BolaO.vy *= -1;
    BolaO.y += 10;
  }
  BolaO.vx *= -1;
  BolaO.x -= 10;
  contadori = 1;
}

if(BolaT.isCollidingWith(Player1.getCollider("Player1")) && contadorj == 0){
  if(BolaT.y+35 < Player1.y + 11){
    BolaT.vy *= -1;
    BolaT.y -= 10;
  }else if(Player1.y + 90 < BolaT.y){
    BolaT.vy *= -1;
    BolaT.y += 10;
  }
  BolaT.vx *= -1;
  BolaT.y += 10;
  contadorj = 1;
}else if(BolaT.isCollidingWith(Player2.getCollider("Player2")) && contadorj == 0){
  if(BolaT.y+35 < Player2.y + 11){
    BolaT.vy *= -1;
    BolaT.y -= 10;
  } else if(Player2.y + 90 < BolaT.y){
    BolaT.vy *= -1;
    BolaT.y += 10;
  }
  BolaT.vx *= -1;
  BolaT.x -= 10;
  contadorj = 1;
}


for(var i= 0; i < blocosGame.length; i++) {

  if(BolaO.isCollidingWith(blocosGame[i].getCollider())){
    blocosGame.splice(i, 1);
  //  BolaO.vy *= -1;
    BolaO.vx *= -1;
  }
}

for(var i= 0; i < blocosGame.length; i++) {

  if(BolaT.isCollidingWith(blocosGame[i].getCollider())){
    blocosGame.splice(i, 1);
  //  BolaT.vy *= -1;
    BolaT.vx *= -1;
  }
}


//condicao de vitoria
if(BolaO.x - BolaO.width < 0){
  win = 'Player2';
  gameStart = false;
} else if( BolaO.x > canvas.width - BolaO.width){
  win = 'Player1';
  gameStart = false;
}

if(BolaT.x - BolaT.width < 0){
  win = 'Player2';
  gameStart = false;
} else if( BolaT.x > canvas.width - BolaO.width){
  win = 'Player1';
  gameStart = false;
}

//update dos objetos
  Player1.update(keys,dt,"Player1");
  Player2.update(keys,dt,"Player2");
  BolaO.update(dt);
  BolaT.update(dt);
  if(contadori == 1){
    console.debug("Contadori = 1")
    timei += dt;
    if(timei >= 1000){
        console.debug(timei);
        timei = 0;
        contadori = 0;
        console.debug("Zerou contadori " + contadori + " time "+ timei);
    }
  }
  if(contadorj == 1){
    console.debug("Contadorj = 1")
    timej += dt;
    if(timej >= 1000){
        console.debug(timej);
        timej = 0;
        contadorj = 0;
        console.debug("Zerou contadorj " + contadorj + " time "+ timej);
    }
  }

}

function render(){//Desenhar os objetos no canvas
  //limpar a tela
  context.clearRect(0,0, canvas.width, canvas.height);
  //Camada de fundo - inicio
  context.drawImage(ImageLoader.images['fundo'],0,0);
  //Camada de fundo - fim
  //Camada dos objetos - inicio
  context.drawImage(ImageLoader.images['bolaAzul'],BolaO.x,BolaO.y,35,35);
  context.drawImage(ImageLoader.images['bolaVermelha'],BolaT.x,BolaT.y,35,35);
  context.drawImage(ImageLoader.images['player1'],Player1.x,Player1.y,100,100);
  context.drawImage(ImageLoader.images['player2'],Player2.x,Player2.y,100,100);

  for(var i = 0; i < blocosGame.length; i++){
    blocosGame[i].draw();
  }
  //Camada dos objetos - Fim
}


function gameOver(){
console.debug("GameOver");
context.clearRect(0,0, canvas.width, canvas.height);
//context.drawImage(ImageLoader.images['vitoria'],0,0);
//context.font = '40pt CHINESETAKEAWAY';
//context.fillStyle = '#000000';
//context.fillText("O Jogador " + win + " Venceu", (canvas.width / 2) - 220, canvas.height - (canvas.height * 0.10));
canvasElem.style.display = "none";
overElem.style.display = 'block';
console.debug("Restart block");
restart_btn.onclick = function(){
  gameInit();
  canvasElem.style.display = "block";
  overElem.style.display = 'none';
}
menu_btn.onclick = function(){
    overElem.style.display = 'none';
    menuElem.style.display = "block";
    canvasElem.style.display = "none";
    init();
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
