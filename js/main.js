
(function(){

  var menuElem = document.getElementById("menu-container");
  var canvasElem = document.getElementById("canvas-container");
  var aboutElem = document.getElementById("about-container");


  var bgSound = new Audio("assets/menu_converted.ogg");
  bgSound.loop = true;
  var startBtn = document.getElementById('start_btn');
  var aboutBtn = document.getElementById('about_btn');
  var backBtn = document.getElementById('back_btn');

  startBtn.onclick = function(){

    menuElem.style.display = "none";
    canvasElem.style.display = "block";

    bgSound.pause();
    gameInit();
  }

  aboutBtn.onclick = function(){

    menuElem.style.display = "none";
    aboutElem.style.display = "block";
  }

  back_btn.onclick = function(){
    menuElem.style.display = "block";
    aboutElem.style.display = "none";
  }



  function init() {

    ImageLoader.load({
        'player1' : 'sprite/pandaP1.png',
        'player2' : 'sprite/pandaP2.png',
        'bolaAzul': 'sprite/bolaazul.png',
        'bolaVermelha': 'sprite/bolavermelha.png',
        'fundo': 'imgs/fundo.jpg',
        'vitoria': 'imgs/VITORIA.jpg'
    }, function(){
        menuElem.style.display = "block";
        bgSound.currentTime = 0;
        bgSound.play();
    });
  }

  window.init = init;

})();
