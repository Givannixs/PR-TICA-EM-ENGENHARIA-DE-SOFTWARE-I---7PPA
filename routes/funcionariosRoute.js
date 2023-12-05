const express = require('express');
const FuncionariosController = require('../controllers/funcionariosController');
const Autenticacao = require('../middleware/autenticacao');
class FuncionariosRoute {

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
        let ctrl = new FuncionariosController();
        this.#router.get('/',auth.usuarioEstaLogado, ctrl.listarView);
        this.#router.post('/buscarfuncionarios',auth.usuarioEstaLogado, ctrl.buscarFuncionarios);
        this.#router.get('/deletarfuncionarios/:id',auth.usuarioEstaLogado, ctrl.deletarFuncionarios);
        this.#router.post('/cadastrarfuncionarios',auth.usuarioEstaLogado, ctrl.cadastrarFuncionarios);
        this.#router.post('/alterarfuncionarios',auth.usuarioEstaLogado, ctrl.alterarFuncionarios);
        
    }
}

module.exports = FuncionariosRoute;