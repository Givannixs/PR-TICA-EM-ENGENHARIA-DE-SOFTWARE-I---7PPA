const express = require('express');
const EscalasController = require('../controllers/escalasController');
const Autenticacao = require('../middleware/autenticacao');
class EscalasRoute {

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
        let ctrl = new EscalasController();
        this.#router.get('/',auth.usuarioEstaLogado, ctrl.listarView);
        this.#router.get('/deletarescalas/:id',auth.usuarioEstaLogado, ctrl.deletarEscalas);
        this.#router.post('/cadastrarescalas',auth.usuarioEstaLogado, ctrl.cadastrarEscalas);
        this.#router.post('/buscarescalas',auth.usuarioEstaLogado, ctrl.buscarEscalas);
        this.#router.post('/alterarescalas',auth.usuarioEstaLogado, ctrl.alterarEscalas);
        this.#router.get('/listarfetch',auth.usuarioEstaLogado, ctrl.listarJson);
    }
}

module.exports = EscalasRoute;