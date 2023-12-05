class Autenticacao {

    constructor() {

    }

    usuarioEstaLogado(req, res, next) {
        if(req.headers.cookie != undefined && req.headers.cookie.includes('usuarioLogado')) {
            next();
        }
        else{
            res.redirect('/login');
        }
    }
}

module.exports = Autenticacao