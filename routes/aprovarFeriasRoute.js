const express = require('express');
const AprovarFeriasController = require('../controllers/aprovarFeriasController');
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
        this.#router.post('/alterarsolicitacaoferias',auth.usuarioEstaLogado, ctrl.alterarSolicitacaoFerias);
        this.#router.post('/buscarferias',auth.usuarioEstaLogado, ctrl.buscarFerias);
    }
}

module.exports = AprovarFeriasRoute;