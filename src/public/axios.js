const btnsisguiente = document.querySelector("#siguiente");
//const jsontext = document.querySelector("#textjson");
//const tokensanalizados = JSON.parse(jsontext.value);
const url = "http://localhost:3000/automata/siguiente";
//console.log(tokensanalizados);
var numero = 0;

const getData = () => {
  axios.get(url).then(response => {
    console.log(response.data);
    siguiente(response.data);
      /*if (tokensanalizados.length > numero) {
        siguiente(tokensanalizados[numero]);
        numero++;
      }else{
        siguiente({tipo: 'null'});
      }*/
    })
    .catch(error => {
      console.log(error);
    });
};

btnsisguiente.addEventListener("click", getData);