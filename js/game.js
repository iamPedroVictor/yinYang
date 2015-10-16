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
var BolaO = new ball((Player1.x + 115),(Player1.y - 50),context);
var BolaT = new ball((Player2.x - 115),(Player2.y - 50),context);
var restart_btn = document.getElementById("restart");
var menu_btn = document.getElementById("Menu");
var contadori = 0;
var contadorj = 0;
var timei = 0;
var timej = 0;
var blocosGame = [];
//Objetos do jogo
var bgSound = new Audio("assets/menu_converted.ogg");
bgSound.loop = true;

//inicializando o jogo
function gameInit(){
  //limpeza blocosGame
  bgSound.currentTime = 0;
  bgSound.play();
  blocosGame.splice(0,blocosGame.length);

  var contadori = 0;
  var contadorj = 0;
  Player1 = new Player(canvas.width - (canvas.width * 0.98),(canvas.height/2)-50,context);
  Player2 = new Player(canvas.width - (canvas.width * 0.10),(canvas.height/2)-50,context);
  BolaO = new ball((Player1.x + 115),(Player1.y - 50),context);
  BolaT = new ball((Player2.x - 115),(Player2.y - 50),context);

  lastUpdate = Date.now(); //Tempo atual (para a fisica)

  //Adicionar as animacoes aqui
  for(var i = 0; i < 5; i++){
    for(var j= 0; j < 7; j++){
      blocosGame.push(new Blocos(
        (460 + i*24),
        (250 + j*30),
        context));
        console.debug("Criou bloco");
    }
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

//Reduzir velocidade das bolas, até atingir um valor mínimo
//if(((BolaO.vx < -0.3)||(0.3 < BolaO.vx)) && ((BolaO.vy < -0.3)||(0.3 < BolaO.vy))){
/*if(0.7 < (BolaO.vx + BolaO.vx)){
  BolaO.vx *= 0.98
  BolaO.vy *= 0.98
}
if(0.7 < (BolaT.vx + BolaT.vx)){
  BolaT.vx *= 0.98
  BolaT.vy *= 0.98
}
*/
//Atualizar a bola ao colidir com os players
if(BolaO.isCollidingWith(Player1.getCollider("Player1")) && contadori == 0){
  if((keys.kw == true) && (-0.8 < BolaO.vy)){
    BolaO.vy -= 0.2
  }
  else if((keys.ks == true) && (BolaO.vy < 0.8)){
    BolaO.vy += 0.2
  }
  if((BolaO.y+35 < Player1.y + 21) && (0 < BolaO.vy)){
    BolaO.y -= 5;
    BolaO.vy *= -1;
  } else if((Player1.y + 80 < BolaO.y) && (BolaO.vy < 0)){
    BolaO.y += 5;
    BolaO.vy *= -1;
  }
  BolaO.x += 5;
  BolaO.vx = 0.5;
  contadori = 1;

}else if(BolaO.isCollidingWith(Player2.getCollider("Player2")) && contadori == 0){
  if((keys.up == true) && (-0.8 < BolaT)){
    BolaO.vy -= 0.2
  }
  else if((keys.down == true) && (BolaT < 0.8)){
    BolaO.vy += 0.2
  }
  if((BolaO.y+35 < Player2.y + 21) && (0 < BolaO.vy)){
    BolaO.y -= 5;
    BolaO.vy *= -1;
  }else if((Player2.y + 80 < BolaO.y) && (BolaO.vy < 0)){
    BolaO.y += 5;
    BolaO.vy *= -1;
  }
  BolaO.x -= 5;
  BolaO.vx = -0.5;
  contadori = 1;
}

if(BolaT.isCollidingWith(Player1.getCollider("Player1")) && contadorj == 0){
  if(keys.kw == true){
    BolaT.vy -= 0.2
  }
  else if(keys.ks == true){
    BolaT.vy += 0.2
  }
  if((BolaT.y+35 < Player1.y + 21) && (0 < BolaT.vy)){
    BolaT.y -= 5;
    BolaT.vy *= -1;
  }else if((Player1.y + 80 < BolaT.y) && (BolaT.vy < 0)){
    BolaT.y += 5;
    BolaT.vy *= -1;
  }
  BolaT.x += 5;
  BolaT.vx = 0.5;
  contadorj = 1;
}else if(BolaT.isCollidingWith(Player2.getCollider("Player2")) && contadorj == 0){
  if(keys.up == true){
    BolaT.vy -= 0.2
  }
  else if(keys.down == true){
    BolaT.vy += 0.2
  }
  if((BolaT.y+35 < Player2.y + 21) && (0 < BolaT.vy)){
    BolaT.vy *= -1;
    BolaT.y -= 5;
  } else if((Player2.y + 80 < BolaT.y) && (BolaT.vy < 0)){
    BolaT.vy *= -1;
    BolaT.y += 5;
  }
  BolaT.x -= 5;
  BolaT.vx = -0.5;
  contadorj = 1;
}

for(var i= 0; i < blocosGame.length; i++) {
  if((BolaO.isCollidingWith(blocosGame[i].getCollider()))){
    blocosGame.splice(i, 1);
    //contadori = 1;
    if((BolaO.x < blocosGame[i].x)){
      BolaO.vx *= -1;
      BolaO.x -=5;
    }
    else if((blocosGame[i].x < BolaO.x)){
      BolaO.vx *= -1;
      BolaO.x +=5;
    }
    else if((BolaO.y < blocosGame[i].y)){
      BolaO.vy *= -1;
      BolaO.y -= 5;
    }
    else if((blocosGame[i].y < BolaO.y)){
      BolaO.vy *= -1;
      BolaO.y += 5;
    }
  }
}

for(var i= 0; i < blocosGame.length; i++) {
  if((BolaT.isCollidingWith(blocosGame[i].getCollider())) && (contadorj == 0)){
    blocosGame.splice(i, 1);
    contadorj = 1;
    if((BolaT.x < blocosGame[i].x) || (blocosGame[i].x < BolaT.x)){
      BolaT.vx *= -1;
    }
    else if((BolaT.y < blocosGame[i].y) || (blocosGame[i].y < BolaT.y)){
      BolaT.vy *= -1;
    }
  }
}


//condicao de vitoria
if((BolaO.x - BolaO.width < 0) || (BolaT.x - BolaT.width < 0)){
  win = 'Player2';
  gameStart = false;
} else if((BolaO.x > canvas.width - BolaO.width) || (BolaT.x > canvas.width - BolaO.width)){
  win = 'Player1';
  gameStart = false;
}

/*if(BolaT.x - BolaT.width < 0){
  win = 'Player2';
  gameStart = false;
} else if(BolaT.x > canvas.width - BolaO.width){
  win = 'Player1';
  gameStart = false;
}*/

//update dos objetos
  Player1.update(keys,dt,"Player1");
  Player2.update(keys,dt,"Player2");
  BolaO.update(dt);
  BolaT.update(dt);
  if(contadori == 1){
    console.debug("Contadori = 1")
    timei += dt;
    if(timei >= 200){
        console.debug(timei);
        timei = 0;
        contadori = 0;
        console.debug("Zerou contadori " + contadori + " time "+ timei);
    }
  }
  if(contadorj == 1){
    console.debug("Contadorj = 1")
    timej += dt;
    if(timej >= 200){
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
    //blocosGame[i]
    context.drawImage(ImageLoader.images['bambu'],blocosGame[i].x,blocosGame[i].y,20,25);
}
  //Camada dos objetos - Fim
}


function gameOver(){
bgSound.pause();
blocosGame.splice(0,blocosGame.length);
console.debug("GameOver");
context.clearRect(0,0, canvas.width, canvas.height);
if(win == "Player1"){
  document.getElementById('gameOver-container').style.backgroundImage="url(imgs/blueWin.jpg)";
  document.getElementById('restart').style.color= "#000000";
  document.getElementById('Menu').style.color= "#000000";
  document.getElementById('textWin').style.color= "#000000";
  document.getElementById("textWin").innerHTML = "Player 1 Win <br><br>";

  document.getElementById("gameOver-container").style.boxShadow = "1px 1px 60px Aqua";

}else if(win == "Player2"){
  document.getElementById('gameOver-container').style.backgroundImage="url(imgs/redWin.jpg)";
  document.getElementById('restart').style.color= "#FFFFFF";
  document.getElementById('Menu').style.color= "#FFFFFF";
  document.getElementById('textWin').style.color= "#FFFFFF";
  document.getElementById("textWin").innerHTML = "Player 2 Win <br><br>";
  document.getElementById("gameOver-container").style.boxShadow = "1px 1px 60px red";
}
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
