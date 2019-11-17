const listareservada = document.getElementById("listareservada"); //ingresa la palabra que el usuario ingreso en el input
const listabooleano = document.getElementById("listabooleano"); // son todas las listas que van a formar parte del trabajo
const listaoperador = document.getElementById("listaoperador");
const listaagrupacion = document.getElementById("listaagrupacion");
const listasigno = document.getElementById("listasigno");
const listaentero = document.getElementById("listaentero");
const listaflotante = document.getElementById("listaflotante");
const listaid = document.getElementById("listaid");
const listaerror = document.getElementById("listaerror");
var palabra = {};

function siguiente(json) {
  palabra = json;
  if (json.tipo != "") {
    switch (json.tipo) {
      case "reservada":
        listareservada.innerHTML =
          listareservada.innerHTML +
          '<div class="container btn-outline-dark"><h4>' +
          json.palabra +
          "</h4></div>";
        break;
      case "boolean":
        listabooleano.innerHTML =
          listabooleano.innerHTML +
          '<div class="container btn-outline-dark"><h4>' +
          json.palabra +" linea: "+json.fila
          "</h4></div>";
        break;
      case "operador":
        listaoperador.innerHTML =
          listaoperador.innerHTML +
          '<div class="container btn-outline-dark"><h4>' +
          json.palabra +
          "</h4></div>";
        break;
      case "agrupacion":
        listaagrupacion.innerHTML =
          listaagrupacion.innerHTML +
          '<div class="container btn-outline-dark"><h4>' +
          json.palabra +
          "</h4></div>";
        break;
      case "signo":
        listasigno.innerHTML =
          listasigno.innerHTML +
          '<div class="container btn-outline-dark"><h4>' +
          json.palabra +
          "</h4></div>";
        break;
      case "entero":
        listaentero.innerHTML =
          listaentero.innerHTML +
          '<div class="container btn-outline-dark"><h4>' +
          json.palabra +
          "</h4></div>";
        break;
      case "flotante":
        listaflotante.innerHTML =
          listaflotante.innerHTML +
          '<div class="container btn-outline-dark"><h4>' +
          json.palabra +
          "</h4></div>";
        break;
      case "id":
        listaid.innerHTML =
          listaid.innerHTML +
          '<div class="container btn-outline-dark"><h4>' +
          json.palabra +
          "</h4></div>";
        break;
      case "error":
        listaerror.innerHTML =
          listaerror.innerHTML +
          '<div class="container btn-outline-dark"><h4 style="color: red;">' +
          json.palabra +
          "</h4></div>";
        break;
      case "null":
        alert('No hay mas tokens, regresar a la pagina inicial \n Ingresar nuevo texto');
        break;
    }
  }
}
