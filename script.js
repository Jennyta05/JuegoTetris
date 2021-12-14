let canvas = document.getElementById('tetris');
let context = canvas.getContext('2d');

context.scale(20, 20);

let escenario = createMatrix(12, 20);

function eliminar() {
    let rowCount = 1;
    outer: for (let y = escenario.length -1; y > 0; --y) {
        for (let x = 0; x < escenario[y].length; ++x) {
            if (escenario[y][x] === 0) {
                continue outer;                               
            }
        }

        let row = escenario.splice(y, 1)[0].fill(0);
        escenario.unshift(row);
        ++y;

        jugador.score += rowCount * 10;
        rowCount *= 2;
        
    }
    
}

function colision(escenario, jugador) {
    let m = jugador.matrix;
    let o = jugador.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (escenario[y + o.y] &&
                escenario[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function createMatrix(w, h) {
    let matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function createPiece(forma)
{
    if (forma === 'I') {
        return [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ];
    } else if (forma === 'L') {
        return [
            [0, 2, 0],
            [0, 2, 0],
            [0, 2, 2],
        ];
    } else if (forma === 'J') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [3, 3, 0],
        ];
    } else if (forma === 'O') {
        return [
            [4, 4],
            [4, 4],
        ];
    } else if (forma === 'Z') {
        return [
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0],
        ];
    } else if (forma === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (forma === 'T') {
        return [
            [0, 7, 0],
            [7, 7, 7],
            [0, 0, 0],
        ];
    }
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colores[value];
                context.fillRect(x + offset.x,
                                 y + offset.y,
                                 1, 1);
            }
        });
    });
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    drawMatrix(escenario, {x: 0, y: 0});
    drawMatrix(jugador.matrix, jugador.pos);
}

function merge(escenario, jugador) {
    jugador.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                escenario[y + jugador.pos.y][x + jugador.pos.x] = value;
            }
        });
    });
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}
let jugador = {
    pos: {x: 0, y: 0},
    matrix: null,
    score: 0,
};

function jugadorDrop() {
    jugador.pos.y++;
    if (colision(escenario, jugador)) {
        jugador.pos.y--;
        merge(escenario, jugador);
        jugadorReset();
        eliminar();
        updateScore();
        
    }
    dropCounter = 0;
}

function jugadorMove(offset) {
    jugador.pos.x += offset;
    if (colision(escenario, jugador)) {
        jugador.pos.x -= offset;
    }
}

function jugadorReset() {
    
    let pieces = 'TJLOSZI';
    jugador.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    jugador.pos.y = 0;
    jugador.pos.x = (escenario[0].length / 2 | 0) -
                   (jugador.matrix[0].length / 2 | 0);
                   
    if (colision(escenario, jugador)) {       
        
        escenario.forEach(row => row.fill(0));
        
        updateScore();   
        
        alert("su puntaje es de " + jugador.score);
        setInterval(function(){
         
        }); 
        jugador.score = 0;
    }
    
}

function jugadorRotate(dir) {
    let pos = jugador.pos.x;
    let offset = 1;
    rotate(jugador.matrix, dir);
    while (colision(escenario, jugador)) {
        jugador.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > jugador.matrix[0].length) {
            rotate(jugador.matrix, -dir);
            jugador.pos.x = pos;
            return;
        }
    }
}

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;
function update(time = 0) {
    let deltaTime = time - lastTime;
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        jugadorDrop();
    }
    lastTime = time;
    draw();
    requestAnimationFrame(update);
}

function updateScore() {
    document.getElementById('score').innerText = jugador.score;
}

document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        jugadorMove(-1);
    } else if (event.keyCode === 39) {
        jugadorMove(1);
    } else if (event.keyCode === 40) {
        jugadorDrop();
    } else if (event.keyCode === "p") {
        jugadorpause(-1);
    } else if (event.keyCode === 38) {
      jugadorRotate(1);
    }
});

let colores = [
    null,
    "#EC407A",
    "#BA68C8",
    "#42A5F5",
    "#8BC34A",
    "#FFEE58",
    "#FF3D00",
    "#FE2C6F",
    "#2CC9FF",
    "#FD9415",
];

jugadorReset();
updateScore();
update();