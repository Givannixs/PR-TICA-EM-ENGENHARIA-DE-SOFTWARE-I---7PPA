//importando os packages instalados
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const HomeRoute = require('./routes/homeRoute');
const FuncionariosRoute = require('./routes/funcionariosRoute');
const CargosRoute = require('./routes/cargosRoute');
const DepartamentosRoute = require('./routes/departamentosRoute');
const EscalasRoute = require ('./routes/escalasRoute');
const LoginRoute = require('./routes/loginRoute');

const app = express();

//configurando a nossa pasta public como o nosso repositorio de arquivos estáticos (css, js, imagens)
app.use(express.static(__dirname + "/public"))
//configuração das nossas views para utilizar a ferramenta EJS
app.set('view engine', 'ejs');
//Configuração de onde ficará nossas views
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//configuração da nossa página de layout
app.set('layout', './layout');
app.use(expressLayouts);

//definindo as rotas que o nosso sistema vai reconhecer através da url do navegador
let homeRota = new HomeRoute();
app.use('/', homeRota.router)


let funcionariosRota = new FuncionariosRoute();
app.use('/funcionarios', funcionariosRota.router);

let cargosRota = new CargosRoute();
app.use('/cargos', cargosRota.router);

let departamentosRota = new DepartamentosRoute();
app.use('/departamentos', departamentosRota.router);

let escalasRota = new EscalasRoute();
app.use('/escalas', escalasRota.router);

let loginRota = new LoginRoute();
app.use('/login', loginRota.router);


//ponto de inicio do nosso servidor web
const server = app.listen('5000', function() {
    console.log('Servidor web iniciado');
});
