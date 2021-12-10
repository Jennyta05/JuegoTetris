// variable del lienzo
let canvas

let contexto

let anchoL =20;
let altoL = 20;

// variables de las fichas
let fichaO = "#EC407A";
let fichaI = "#BA68C8";
let fichaS = "#42A5F5";
let fichaZ = "#8BC34A";
let fichaT = "#FFEE58";
let fichaJ = "#FF3D00";
let fichaL = "#FFA726";

//funcion de las matrices

function crearPieza(type){
    if(type =='fichaO'){
        return[
            [1,1],
            [1,1]
        ];
    }
    else if(type =='fichaI'){
        return[
           [0,1,0,0],
           [0,1,0,0],
           [0,1,0,0],
           [0,1,0,0] 
        ];
    }
    else if(type =='fichaS'){
        return[
            [0,1,1],
            [1,1,0],
            [0,0,0]
        ];
    }
    else if(type =='fichaZ'){
        return[
            [1,1,0],
            [0,1,1],
            [0,0,0]
        ];
    }
    else if(type=='fichaT'){
        return[
            [0,0,0],
            [1,1,1],
            [0,1,0]
        ];
    }
    else if(type =='fichaJ'){
        return[
            [0,1,0],
            [0,1,0],
            [1,1,0]
        ];
    }
    else if(type =='fichaL'){
        return[
            [0,1,0],
            [0,1,0],
            [0,1,1]
        ];
    }
    ctx.fillStyle = color
    ctx.fillRect(x*anchoF, y*altoF, anchoF, altoF)
}



