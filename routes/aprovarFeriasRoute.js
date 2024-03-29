const express = require('express');
const AprovarFeriasController= require('../controllers/aprovarFeriasController');
const Autenticacao = require('../middleware/autenticacao');
class AprovarFeriasRoute {

    #router;
    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router
    }

    constructor() {
        this.#router = express.Router();
        let auth = new Autenticacao();
        let ctrl = new AprovarFeriasController();
        this.#router.get('/',auth.usuarioEstaLogado, ctrl.listarView);
        
    }
}

module.exports = AprovarFeriasRoute;