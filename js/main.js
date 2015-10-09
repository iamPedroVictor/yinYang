
(function(){

  var menuElem = document.getElementById("menu-container");
  var canvasElem = document.getElementById("canvas-container");

  var startBtn = document.getElementById('start_btn');

  startBtn.onclick = function(){

    menuElem.style.display = "none";
    canvasElem.style.display = "block";

    gameInit();
  }

  function init() {

    ImageLoader.load({
        'bambu': 'imgs/bambu.jpg',
        'fundo': 'imgs/fundo.png',
        'player1' : 'imgs/pandaP1.png',
        'player2' : 'imgs/pandaP2.png',
        'MagicPies':'assests/MagicPies.ttf'
    }, function(){
        menuElem.style.display = "block";
    });
  }

  window.init = init;

})();
