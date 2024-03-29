const AprovarFeriasModel = require("../models/aprovarFeriasModel");

class AprovarFeriasController {


    async listarView(req, res) {
        let aprovarFerias = new AprovarFeriasModel();
        let lista = await aprovarFerias.obterListaDeSolicitacoesDeFerias();
        res.render('aprovarferias/listar', {lista: lista});
    }
}


module.exports = AprovarFeriasController;


