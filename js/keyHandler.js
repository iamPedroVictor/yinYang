//Objeto que registra quais keys foram pressionadas
//Pode ser usado diretamente no main.js
// Outras teclas podem ser adicionadas utilizando os códigos disponíveis aqui:
//
var keys = {
    up: false, // Indica se a tecla cima foi pressionada
    down: false, // Indica se a tecla baixo foi pressionada
    left: false, // Indica se a tecla esquerda foi pressionada
    right: false, // Indica se a tecla direita foi pressionada
    code : { // codigos para cada tecla
		left : 37,
		right : 39,
    up: 65,
		down : 68
	}
}


function keyDown(e) { // detecta quando a tecla foi pressionada
    if (e.keyCode == keys.code.up) { // se a tecla pressionada for igual ao código up
        keys.up = true; // indica que a tecla cima foi pressionada
    }
    else if (e.keyCode == keys.code.down) {
        keys.down = true;
    }

    if (e.keyCode == keys.code.left) {
        keys.left = true;
    }
    else if (e.keyCode == keys.code.right) {
        keys.right = true;
    }
}

function keyUp(e) { //detecta quando a tecla foi solta
    if (e.keyCode == keys.code.up) { // se a tecla solta for igual ao código up
        keys.up = false; // indica que a tecla cima foi solta
    }
    else if (e.keyCode == keys.code.down) {
        keys.down = false;
    }

    if (e.keyCode == keys.code.left) {
        keys.left = false;
    }
    else if (e.keyCode == keys.code.right) {
        keys.right = false;
    }
}

// Executar função keyDown quando uma tecla for pressionada.
document.addEventListener('keydown', keyDown, false);
// Executar função keyUp quando uma tecla for solta;
document.addEventListener('keyup', keyUp, false);
