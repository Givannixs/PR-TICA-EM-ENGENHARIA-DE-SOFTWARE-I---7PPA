const express = require('express');
const SolicitarFeriasController= require('../controllers/solicitarFeriasController');
const Autenticacao = require('../middleware/autenticacao');
class SolicitarFeriasRoute {

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
        let ctrl = new SolicitarFeriasController();
        this.#router.get('/',auth.usuarioEstaLogado, ctrl.listarView);
        this.#router.post('/cadastrarsolicitacaoferias',auth.usuarioEstaLogado, ctrl.cadastrarSolicitarFerias);
        
    }
}

module.exports = SolicitarFeriasRoute;