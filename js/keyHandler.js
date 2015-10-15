//Objeto que registra quais keys foram pressionadas
//Pode ser usado diretamente no main.js
// Outras teclas podem ser adicionadas utilizando os códigos disponíveis aqui:
// http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
var keys = {
    kup: false, // Indica se a tecla cima foi pressionada
    kdown: false, // Indica se a tecla baixo foi pressionada
    kw: false, // Indica se a tecla esquerda foi pressionada
    ks: false, // Indica se a tecla direita foi pressionada
    code : { // codigos para cada tecla
		kup : 38,
		kdown : 40,
    kw : 87,
		ks : 83
	}
}


function keyDown(e) { // detecta quando a tecla foi pressionada
    if (e.keyCode == keys.code.kw) { // se a tecla pressionada for igual ao código up
        keys.kw = true; // indica que a tecla cima foi pressionada
    }
    else if (e.keyCode == keys.code.ks) {
        keys.ks = true;
    }

    if (e.keyCode == keys.code.kup) {
        keys.kup = true;
    }
    else if (e.keyCode == keys.code.kdown) {
        keys.kdown = true;
    }
}

function keyUp(e) { //detecta quando a tecla foi solta
    if (e.keyCode == keys.code.kw) { // se a tecla solta for igual ao código up
        keys.kw = false; // indica que a tecla cima foi solta
    }
    else if (e.keyCode == keys.code.ks) {
        keys.ks = false;
    }

    if (e.keyCode == keys.code.kup) {
        keys.kup = false;
    }
    else if (e.keyCode == keys.code.kdown) {
        keys.kdown = false;
    }
}

// Executar função keyDown quando uma tecla for pressionada.
document.addEventListener('keydown', keyDown, false);
// Executar função keyUp quando uma tecla for solta;
document.addEventListener('keyup', keyUp, false);
