const homeModel = require("../models/homeModel");


class HomeController {

    constructor() {

    }

   async homeView(req, res) {
        let home = new homeModel();
        let lista = await home.listarComunicado();
        res.render('home/index', { lista: lista});
    }


    async alterarHome(req, res) {
        
        console.log(req.body);
        let home = new homeModel();

        home.Comunicado= req.body.Comunicado;
       

        let retorno = await home.alterarComunicado();
        let lista = await home.listarComunicado();
        res.render('home/index', { lista: lista});
    }
}




module.exports = HomeController;