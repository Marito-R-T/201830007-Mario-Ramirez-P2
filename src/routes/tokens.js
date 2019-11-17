const boolean = "VERDADERO,FALSO,";
const reservada =
  "variable,entero,decimal,booleano,cadena,si,sino,mientras,hacer,";
const operadores = "+,-,*,/,%,=,==,<,>,>=,<=,";
const agrupacion = "(,),{,},";
const signo = "“,;,”";
const digito = "0123456789";
const alfabeto = "abcdefghijklmnñiopqrstuvwxyzABCDEFGHIJKLMNÑIOPQRSTUVWXYZ";
const comillas = '"';
const comillassimples = "'";
const simbolo = agrupacion + signo + digito + operadores + reservada + alfabeto + " ";
var tipo;
var palabra;
var nueva;
var posicion;
var numero;
var ultima;

console.log(comillas);
//Verificar digito o flotante
//////////////////////////////
/////////////////////////////
function verificarEF2() {
  if (palabra.length > posicion) {
    if (digito.indexOf(palabra[posicion]) != -1) {
      nueva += palabra[posicion];
      posicion += 1;
      verificarEF2();
    } else {
      verificarEF3();
    }
  } else {
    tipo = "entero";
    ultima = nueva;
  }
}

function verificarEF3() {
  if (".".indexOf(palabra[posicion]) != -1) {
    nueva += palabra[posicion];
    posicion += 1;
    verificarEF4(false);
  } else {
    tipo = "entero";
    verificarAlfabeto(palabra[posicion], true);
  }
}

function verificarEF4(aceptado) {
  if (palabra.length > posicion) {
    if (digito.indexOf(palabra[posicion]) != -1) {
      nueva += palabra[posicion];
      posicion += 1;
      verificarEF4(true);
    } else {
      if (aceptado) {
        tipo = "flotante";
        verificarAlfabeto(palabra[posicion], true);
      } else {
        nueva += palabra[posicion];
        tipo = "error";
        ultima = nueva;
        nueva = "";
        posicion += 1;
      }
    }
  } else {
    if (aceptado) {
      tipo = "flotante";
      ultima = nueva;
    } else {
      tipo = "error";
      ultima = nueva;
    }
  }
}
//////////////////////////////
/////////////////////////////////////////
///////////////////////////////////////
//   VERIFICACION DE ID ////////////////
///////////////////////////////////////
//////////////////////////////////////7

function verificarID1() {
  if (palabra.length > posicion) {
    if (
      digito.indexOf(palabra[posicion]) != -1 ||
      alfabeto.indexOf(palabra[posicion]) != -1
    ) {
      nueva += palabra[posicion];
      posicion += 1;
      verificarID1();
    } else {
      verificarreservadas();
      if (nueva != "") {
        tipo = "id";
        verificarAlfabeto(palabra[posicion], true);
      }
    }
  } else {
    verificarreservadas();
    if (nueva != "") {
      tipo = "id";
      ultima = nueva;
    }
  }
}

//////////////////////////////
/////////////////////////////////////////
///////////////////////////////////////
//   VERIFICACION DE PALABRA RESERVADA ////////////////
///////////////////////////////////////
//////////////////////////////////////7

function verificarreservadas() {
  var palabrareservada = nueva + ",";
  if (
    boolean.indexOf(palabrareservada) != -1 &&
    alfabeto.indexOf(nueva) == -1
  ) {
    tipo = "boolean";
    ultima = nueva;
    nueva = "";
  } else if (
    reservada.indexOf(palabrareservada) != -1 &&
    alfabeto.indexOf(nueva) == -1
  ) {
    tipo = "reservada";
    ultima = nueva;
    nueva = "";
  }
}

//////////////////////////////
/////////////////////////////////////////
///////////////////////////////////////
//   VERIFICACION DE ALFABETO ////////////////
///////////////////////////////////////
//////////////////////////////////////7

function verificarAlfabeto(letra, verificar) {
  if (operadores.indexOf(letra) != -1) {
    if (nueva == "") {
      if ("=><".indexOf(letra) != -1) {
        posicion += 1;
        if (palabra.length > posicion && "=".indexOf(palabra[posicion] != -1)) {
          tipo = "operador";
          nueva = letra + palabra[posicion];
          ultima = nueva;
        } else {
          posicion -= 1;
          tipo = "operador";
          nueva = letra;
          ultima = nueva;
        }
      } else {
        tipo = "operador";
        nueva = letra;
        ultima = nueva;
      }
    } else {
      ultima = nueva;
      posicion -= 1;
    }
  } else if (agrupacion.indexOf(letra) != -1) {
    console.log(letra);
    if (nueva == "") {
      tipo = "agrupacion";
      nueva = letra;
      ultima = nueva;
    } else {
      posicion -= 1;
      ultima = nueva;
    }
  } else if (signo.indexOf(letra) != -1) {
    if (nueva == "") {
      tipo = "signo";
      nueva = letra;
      ultima = nueva;
    } else {
      posicion -= 1;
      ultima = nueva;
    }
  } else {
    tipo = "error";
    nueva += letra;
    ultima = nueva;
  }
  nueva = "";
  posicion += 1;
}
//////////////////////////////
/////////////////////////////////////////
///////////////////////////////////////
//   VERIFICACION DE Cadena ////////////////
///////////////////////////////////////
//////////////////////////////////////7

function verificarCadena() {
  if (palabra.length > posicion) {
    if (comillas.indexOf(palabra[posicion]) != -1) {
      nueva += palabra[posicion];
      tipo = "Cadena";
      ultima = nueva;
      posicion += 1;
    } else if (simbolo.indexOf(palabra[posicion]) != -1) {
      nueva += palabra[posicion];
      posicion += 1;
      verificarCadena();
    } else {
      tipo = "error";
      nueva += palabra[posicion];
      ultima = nueva;
      posicion += 1;
    }
  } else {
    tipo = "error";
    ultima = nueva;
  }
}

//////////////////////////////
/////////////////////////////////////////
///////////////////////////////////////
//   VERIFICACION DE CARACTER ////////////////
///////////////////////////////////////
//////////////////////////////////////7

function verificarCaracter() {
  if (palabra.length > posicion) {
    if (simbolo.indexOf(palabra[posicion]) != -1) {
      nueva += palabra[posicion];
      posicion += 1;
      verificarCaracterC();
    } else {
      tipo = "error";
      nueva += palabra[posicion];
      ultima = nueva;
      posicion += 1;
    }
  } else {
    tipo = "error";
    ultima = nueva;
  }
}

function verificarCaracterC() {
  if (palabra.length > posicion) {
    if (comillassimples.indexOf(palabra[posicion]) != -1) {
      nueva += palabra[posicion];
      tipo = "Cadena";
      ultima = nueva;
      posicion += 1;
    } else if (simbolo.indexOf(palabra[posicion]) != -1) {
      nueva += palabra[posicion];
      posicion += 1;
      verificarCaracterC();
    } else {
      tipo = "error";
      nueva += palabra[posicion];
      ultima = nueva;
      posicion += 1;
    }
  } else {
    tipo = "error";
    ultima = nueva;
  }
}
//////////////////////////////
/////////////////////////////////////////
///////////////////////////////////////
//   VERIFICACION DE COMENTARIO ////////////////
///////////////////////////////////////
//////////////////////////////////////7

function verificarComentario() {
  if (palabra.length > posicion) {
    if ("*".indexOf(palabra[posicion]) != -1) {
      nueva += palabra[posicion];
      posicion += 1;
      verificarComentarioB();
    } else {
      tipo = "signo";
      ultima = nueva;
    }
  } else {
    tipo = "error";
    ultima = nueva;
  }
}

function verificarComentarioB(){
  if (palabra.length > posicion) {
    if (comillassimples.indexOf(palabra[posicion]) != -1) {
      nueva += palabra[posicion];
      posicion += 1;
      verificarComentarioC();
    } else {
      tipo = "error";
      nueva += palabra[posicion];
      ultima = nueva;
      posicion += 1;
    }
  } else {
    tipo = "error";
    ultima = nueva;
  }
}
function verificarComentarioC(){
  if (palabra.length > posicion) {
    if (simbolo.indexOf(palabra[posicion]) != -1) {
      nueva += palabra[posicion];
      posicion += 1;
      verificarComentarioD();
    } else {
      tipo = "error";
      nueva += palabra[posicion];
      ultima = nueva;
      posicion += 1;
    }
  } else {
    tipo = "error";
    ultima = nueva;
  }
}

function verificarComentarioD() {
  if (palabra.length > posicion) {
    if (comillassimples.indexOf(palabra[posicion]) != -1) {
      nueva += palabra[posicion];
      posicion += 1;
      verifciarComentarioE();
    } else if (simbolo.indexOf(palabra[posicion]) != -1) {
      nueva += palabra[posicion];
      posicion += 1;
      verificarComentarioD();
    } else {
      tipo = "error";
      nueva += palabra[posicion];
      ultima = nueva;
      posicion += 1;
    }
  } else {
    tipo = "error";
    ultima = nueva;
  }
}

function verifciarComentarioE(){
  if (palabra.length > posicion) {
    if ("*".indexOf(palabra[posicion]) != -1) {
      nueva += palabra[posicion];
      posicion += 1;
      verificarComentarioF();
    } else {
      tipo = "error";
      nueva += palabra[posicion];
      ultima = nueva;
      posicion += 1;
    }
  } else {
    tipo = "error";
    ultima = nueva;
  }
}

function verificarComentarioF(){
  if (palabra.length > posicion) {
    if ("/".indexOf(palabra[posicion]) != -1) {
      nueva += palabra[posicion];
      tipo = "Comentario";
      ultima = nueva;
      posicion += 1;
    } else {
      tipo = "error";
      nueva += palabra[posicion];
      ultima = nueva;
      posicion += 1;
    }
  } else {
    tipo = "error";
    ultima = nueva;
  }
}
//////////////////////////////
/////////////////////////////////////////
///////////////////////////////////////
//   VERIFICACION DE PALABRA ////////////////
///////////////////////////////////////
//////////////////////////////////////7

function verificarPalabra() {
  if (palabra.length > posicion) {
    console.log(palabra);
    if (digito.indexOf(palabra[posicion]) != -1) {
      nueva += palabra[posicion];
      posicion += 1;
      verificarEF2();
    } else if (alfabeto.indexOf(palabra[posicion]) != -1) {
      nueva += palabra[posicion];
      posicion += 1;
      verificarID1();
    } else if (comillas.indexOf(palabra[posicion]) != -1) {
      nueva += palabra[posicion];
      posicion += 1;
      verificarCadena();
    } else if (comillassimples.indexOf(palabra[posicion]) != -1) {
      nueva += palabra[posicion];
      posicion += 1;
      verificarCaracter();
    } else if ("/".indexOf(palabra[posicion]) != -1) {
      nueva += palabra[posicion];
      posicion += 1;
      verificarComentario();
    } else {
      verificarAlfabeto(palabra[posicion], false);
    }
  }
}

module.exports = function evaluar(primera, pos, no) {
  console.log(pos);
  nueva = "";
  ultima = "";
  palabra = primera;
  posicion = pos;
  numero = no;
  verificarPalabra();
  posicion++;
  if (palabra.length < posicion) {
    numero += 1;
    posicion = 0;
  }
  if (posicion != 0) {
    posicion -= 1;
  }
  return { posicion: posicion, nocolumna: numero, palabra: ultima, tipo: tipo };
};

var datos = [];
var objeto = {};
