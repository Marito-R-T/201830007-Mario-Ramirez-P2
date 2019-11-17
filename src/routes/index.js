const express = require("express");
const router = express.Router();
router.use(express.json());
const path = require("path");
const tokens = require("./tokens");
var texto = " ";
var linea = 0;
var columna = 0;
var nocolumna = 0;
var palabra;
var posicion = 0;
var separados = [];
var lineaactual = [];
//var tokensanalizados;
//rutas
router.get("/", (req, res) => {
  res.render("texto");
});

router.post("/automata", (req, res) => {
  linea = 0;
  columna = 0;
  nocolumna = 0;
  posicion = 0;
  texto = req.body.txt;
  separacion();
  //tokensanalizados = tokens(separados);
  //var initData = JSON.parse(JSON.stringify(tokensanalizados));
  //console.log(initData);
  res.render("analizador" /*, initData*/);
});

router.get("/info", (req, res) => {
  res.render("info");
});

router.get("/diagramas", (req, res) => {
  res.render("diagramas");
});

router.get("/automata/siguiente", (req, res) => {
  if(linea<separados.length){
  nocolumna += 1;
  lineaactual = separados;
  console.log(lineaactual);
  var tokeningresar = tokens(lineaactual[columna], posicion, columna);
  console.log(tokeningresar);
  posicion = tokeningresar.posicion;
  columna = tokeningresar.nocolumna;
  var token = {
    tipo: tokeningresar.tipo,
    palabra: tokeningresar.palabra,
    columna: nocolumna,
    fila: linea + 1
  };
  if (lineaactual.length <= columna) {
    linea += 1;
    columna = 0;
    nocolumna = 0;
  }
  res.json(token);
}else{
  var token = {
    tipo: "null",
    palabra: "",
    columna: "",
    fila: ""
  };
  res.json(token);
}
});

function separacion() {
  separados = texto.split(/,/);
}

module.exports = router;
