//frameworks
const express = require ('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

//configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.set('port', 3000);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//rutas
app.use(require('./routes/index'));

//middleware
app.use(express.static(path.join(__dirname, 'public')));

//escucha
app.listen(app.get('port'), () => {
    console.log(__dirname);
    console.log('eschuchando en el puerto ', app.get('port'));
});