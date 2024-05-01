class Autenticacao {

    constructor() {

    }

    usuarioEstaLogado(req, res, next) {
        console.log(req.originalUrl);
        if(req.headers.cookie != undefined && req.headers.cookie.includes('usuarioLogado')) {

            if (req.headers.cookie.includes('administrador')) {
                next();
            } else {
                if(req.originalUrl.includes('funcionarios')||req.originalUrl.includes('cargos')||req.originalUrl.includes('departamentos')||req.originalUrl.includes('escalas')||req.originalUrl.includes('registropontoadmin')||req.originalUrl.includes('aprovarferias'))
                res.status(403).send('Acesso negado. Você não tem permissão para acessar esta página.');

                else
                next();
            }
            
        }
        else{
            res.redirect('/login');
        }
    }
}

module.exports = Autenticacao