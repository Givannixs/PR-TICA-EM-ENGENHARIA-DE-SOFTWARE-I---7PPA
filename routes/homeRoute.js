const express = require('express');
const HomeController = require('../controllers/homeController');
const Autenticacao = require('../middleware/autenticacao');
class HomeRoute {

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
        let ctrl = new HomeController();
        this.#router.get('/',auth.usuarioEstaLogado, ctrl.homeView);
        
    }
}

module.exports = HomeRoute;