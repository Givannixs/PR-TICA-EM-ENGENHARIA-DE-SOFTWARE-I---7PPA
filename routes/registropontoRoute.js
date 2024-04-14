const express = require('express');
const RegistrapontoController = require('../controllers/registropontoController');
const Autenticacao = require('../middleware/autenticacao');
class RegistrapontoRoute {

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
        let ctrl = new RegistrapontoController();
        this.#router.get('/',auth.usuarioEstaLogado, ctrl.listarView);
        //this.#router.get('/deletarregistroponto/:id',auth.usuarioEstaLogado, ctrl.deletarResgistroponto);
        this.#router.post('/cadastrarresgistroponto',auth.usuarioEstaLogado, ctrl.cadastrarResgistroponto);
        //this.#router.post('/buscarregistroponto',auth.usuarioEstaLogado, ctrl.buscarResgistroponto);
        this.#router.post('/alterarregistroponto',auth.usuarioEstaLogado, ctrl.alterarResgistroponto);
        this.#router.get('/listarfetch',auth.usuarioEstaLogado, ctrl.listarJson);


        //admin registro ponto
        this.#router.get('/listar',auth.usuarioEstaLogado, ctrl.listarViewadmin);
        this.#router.get('/deletarregistropontoadmin/:id',auth.usuarioEstaLogado, ctrl.deletarResgistropontoadmin);
        this.#router.post('/cadastrarresgistropontoadmin',auth.usuarioEstaLogado, ctrl.cadastrarResgistropontoadmin);
        this.#router.post('/buscarregistropontoadmin',auth.usuarioEstaLogado, ctrl.buscarResgistropontoadmin);
        this.#router.post('/alterarregistropontoadmin',auth.usuarioEstaLogado, ctrl.alterarResgistropontoadmin);
        this.#router.get('/listarfetchadmin',auth.usuarioEstaLogado, ctrl.listarJsonadmin);
    }
}

module.exports = RegistrapontoRoute;