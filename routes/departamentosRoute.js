const express = require('express');
const DepartamentosController = require('../controllers/departamentosController');
const Autenticacao = require('../middleware/autenticacao');
class DepartamentosRoute {

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
        let ctrl = new DepartamentosController();
        this.#router.get('/',auth.usuarioEstaLogado, ctrl.listarView);
        this.#router.get('/deletardepartamentos/:id',auth.usuarioEstaLogado, ctrl.deletarDepartamentos);
        this.#router.post('/cadastrardepartamentos',auth.usuarioEstaLogado, ctrl.cadastrarDepartamentos);
        this.#router.post('/buscardepartamentos',auth.usuarioEstaLogado, ctrl.buscarDepartamentos);
        this.#router.post('/alterardepartamentos',auth.usuarioEstaLogado, ctrl.alterarDepartamentos);
        this.#router.get('/listarfetch',auth.usuarioEstaLogado, ctrl.listarJson);
    }
}

module.exports = DepartamentosRoute;