function processFiles(files) {
  console.log('hoola');
  var file = files[0];
  console.log("hola");
  var reader = new FileReader();

  reader.onload = function(e) {
    var output = document.getElementById("fileOutput");
    output.textContent = e.target.result;
    var string = output.textContent;
    var o = string.split(/\n+/);
    var elemento = document.getElementById('valortexto');
    var elementotxt = document.getElementById('txt');
    elementotxt.value = o;
  };
  reader.readAsText(file);
}