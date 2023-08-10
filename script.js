//initial data
let square = {
    a1: "", a2: "", a3: "",
    b1: "", b2: "", b3: "",
    c1: "", c2: "", c3: "",
};

let player = "";

let warning = "";

let playing = false

reset();

//events
document.querySelector(".reset").addEventListener('click', reset)

document.querySelectorAll(".item").forEach(item => {
    item.addEventListener('click', itemClick)
})

//functions

function itemClick(event) {
    let item = event.target.getAttribute('data-item')
    
    if (playing && square[item] === "") {
        square[item] =player
        renderSquare();
        togglePlayer();
    }
}

function togglePlayer() {
    if (player === "x") {
        player = "o"
    } else {
        player = "x"
    }
    renderInfo();
}

function reset() {
    //zera os avisos
    warning = "";

    //escolhe o jogador
    let random = Math.floor(Math.random() * 2);
    
    if (random === 0) {
        player = "x";
    } else {
        player = "o"
    }

    //zera o tabuleiro
    for(let i in square) {
        square[i] = "";
    }

    //reseta e inicia o jogo
    playing = true

    renderSquare();
    renderInfo();
}

function renderSquare() {
    for(let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`)
        item.innerHTML = square[i]
    }

    checkGame();
}

function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',
        
        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',
        
        'a1,b2,c3',
        'a3,b2,c1',
    ];

    for(let w in pos) {
        let pArray = pos[w].split(',') //criei um array com cada uma das possibilidades
        let hasWon = pArray.every(option => square[option] === player);

        if(hasWon) {
            return true
        }
    }

    return false
}

function checkGame() {
    if (checkWinnerFor('x')) {
        warning = "X"
        playing = false
    } else if(checkWinnerFor('o')) {
        warning = "O"
        playing = false
    } else if(isFull()) {
        warning = "Deu velha"
        playing = false
    }
}

function isFull() {
    for(let i in square) {
        if(square[i] === '') {
            return false
        }
    }

    return true
}

function renderInfo() {
    document.querySelector(".vez").innerHTML = player
    document.querySelector(".resultado").innerHTML = warning
}