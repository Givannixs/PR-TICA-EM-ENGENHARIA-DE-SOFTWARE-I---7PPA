const funcionarioModel = require("../models/funcionariosModel");

class LoginController {

    constructor() {

    }

    loginView(req, res) {
        res.render('login/index', { layout: 'login/index' });
    }

    logoutUsuario(req, res) {
        res.clearCookie('usuarioLogado');
        res.clearCookie('undefinedusuarioLogado');
        res.clearCookie('operadorusuarioLogado');
        res.clearCookie('administradorusuarioLogado');
        res.redirect('/login');
        res.end();
    }

    async autenticarUsuario(req, res) {
        if(req.body.inputEmail != "" && req.body.inputPassword != "") {
            var usuario = new funcionarioModel();
            var usuario = await usuario.autenticarFuncionario(req.body.inputEmail, req.body.inputPassword);
            if(usuario != null){
                console.log(usuario[0]);
                res.cookie(usuario[0].funcionarioAcesso+'usuarioLogado', usuario[0].idFuncionario);
                res.redirect('/');
            }
            else{
                res.render('login', { layout: 'login/index', msgErro: 'Usuário/senha não foram inseridos corretamente!'})
            }
        }
        else {
            res.render('login', { layout: 'login/index', msgErro: 'Por favor, preencha os campos corretamente!'})
        }
    }
}

module.exports = LoginController;