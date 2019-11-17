const boolean = "VERDADERO,FALSO,";
const reservada =
  "variable,entero,decimal,booleano,cadena,si,sino,mientras,hacer,";
const operadores = "+,-,*,/,%,=,==,<,>,>=,<=,";
const agrupacion = "(,),{,},";
const signo = "“,;,”";
const digito = "0123456789";
const alfabeto = "abcdefghijklmnñiopqrstuvwxyzABCDEFGHIJKLMNÑIOPQRSTUVWXYZ";
var tipo;
var palabra;
var nueva;
var numero;
var posicion;
var linea;
var tipos = new Array();
var palabras = new Array();
var columna = new Array();
var fila = new Array();
var datosfila = new Array();

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
    tipos.push(tipo);
    palabras.push(nueva);
    columna.push(numero);
    fila.push(linea);
    numero += 1;
  }
}

function verificarEF3() {
  if (".".indexOf(palabra[posicion]) != -1) {
    console.log(nueva);
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
        tipos.push(tipo);
        palabras.push(nueva);
        columna.push(numero);
        fila.push(linea);
        nueva = "";
        numero += 1;
        posicion += 1;
        verificarPalabra();
      }
    }
  } else {
    if (aceptado) {
      tipo = "flotante";
    } else {
      tipo = "error";
    }
    tipos.push(tipo);
    palabras.push(nueva);
    columna.push(numero);
    fila.push(linea);
    numero += 1;
  }
}

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
      tipo = "id";
      verificarAlfabeto(palabra[posicion], true);
    }
  } else {
    verificarreservadas();
    if (nueva != "") {
      tipo = "id";
      tipos.push(tipo);
      palabras.push(nueva);
      columna.push(numero);
      fila.push(linea);
      numero += 1;
    }
  }
}

function verificarreservadas() {
  var palabrareservada = nueva + ",";
  if (
    boolean.indexOf(palabrareservada) != -1 &&
    alfabeto.indexOf(nueva) == -1
  ) {
    tipo = "boolean";
    tipos.push(tipo);
    palabras.push(nueva);
    columna.push(numero);
    fila.push(linea);
    numero += 1;
    nueva = "";
  } else if (
    reservada.indexOf(palabrareservada) != -1 &&
    alfabeto.indexOf(nueva) == -1
  ) {
    tipo = "reservada";
    tipos.push(tipo);
    palabras.push(nueva);
    columna.push(numero);
    fila.push(linea);
    numero += 1;
    nueva = "";
  }
}

function verificarAlfabeto(letra, verificar) {
  if (operadores.indexOf(letra) != -1) {
    if (nueva != "") {
      tipos.push(tipo);
      palabras.push(nueva);
      columna.push(numero);
      fila.push(linea);
      numero += 1;
    }
    if("=><".indexOf(letra) != -1){
      posicion+=1;
      console.log(palabra[posicion]);
      if(palabra.length>posicion&&'='.indexOf(palabra[posicion] != -1)){
        tipo= "operador";
        nueva = letra+palabra[posicion];
      }else{
        posicion-=1;
      tipo = "operador";
      nueva = letra;
      }
    }else{
      tipo = "operador";
      nueva = letra;
    }
  } else if (agrupacion.indexOf(letra) != -1) {
    if (nueva != "") {
      tipos.push(tipo);
      palabras.push(nueva);
      columna.push(numero);
      fila.push(linea);
      numero += 1;
    }
    tipo = "agrupacion";
    nueva = letra;
  } else if (signo.indexOf(letra) != -1) {
    if (nueva != "") {
      tipos.push(tipo);
      palabras.push(nueva);
      columna.push(numero);
      fila.push(linea);
      numero += 1;
    }
    tipo = "signo";
    nueva = letra;
  } else {
    tipo = "error";
    nueva += letra;
  }
  posicion += 1;
  tipos.push(tipo);
  palabras.push(nueva);
  columna.push(numero);
  fila.push(linea);
  nueva = "";
  numero += 1;
  if (verificar) {
    verificarPalabra();
  }
}

function empezarCiclo() {
  var listaactual = datosfila[linea - 1].split(/\s+/);
  for (var i = 0; i < listaactual.length; i++) {
    nueva = "";
    palabra = listaactual[i];
    posicion = 0;
    verificarPalabra();
  }
}

function verificarPalabra() {
  if (palabra.length > posicion) {
    if (digito.indexOf(palabra[posicion]) != -1) {
      nueva += palabra[posicion];
      posicion += 1;
      verificarEF2();
    } else if (alfabeto.indexOf(palabra[posicion]) != -1) {
      nueva += palabra[posicion];
      posicion += 1;
      verificarID1();
    } else {
      verificarAlfabeto(palabra[posicion], false);
      verificarPalabra();
    }
  }
}
module.exports = function evaluar(arreglo) {
  datosfila = arreglo;
  numero = 1;
  linea = 0;
  for (var i = 0; i < datosfila.length; i++) {
    linea = i + 1;
    numero = 1;
    empezarCiclo();
  }
  convertirJSON();
  return objeto;
};

var datos = [];
var objeto = {};

function convertirJSON() {
  for (var i = 0; i < palabras.length; i++) {
    var nombre = palabras[i];

    datos.push({
      palabra: palabras[i],
      tipo: tipos[i],
      columna: columna[i],
      fila: fila[i]
    });
  }
  objeto.datos = datos;
}
