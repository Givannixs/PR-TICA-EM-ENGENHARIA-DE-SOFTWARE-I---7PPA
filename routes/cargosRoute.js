const express = require('express');
const CargosController = require('../controllers/cargosController');
const Autenticacao = require('../middleware/autenticacao');
class CargosRoute {

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
        let ctrl = new CargosController();
        this.#router.get('/',auth.usuarioEstaLogado, ctrl.listarView);
        this.#router.get('/deletarcargos/:id',auth.usuarioEstaLogado, ctrl.deletarCargos);
        this.#router.post('/cadastrarcargos',auth.usuarioEstaLogado, ctrl.cadastrarCargos);
        this.#router.post('/buscarcargos',auth.usuarioEstaLogado, ctrl.buscarCargos);
        this.#router.post('/alterarcargos',auth.usuarioEstaLogado, ctrl.alterarCargos);
        this.#router.get('/listarfetch',auth.usuarioEstaLogado, ctrl.listarJson);
    }
}

module.exports = CargosRoute;