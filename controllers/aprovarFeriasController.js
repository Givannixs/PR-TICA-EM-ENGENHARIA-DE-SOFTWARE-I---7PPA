const AprovarFeriasModel = require("../models/aprovarFeriasModel");

class AprovarFeriasController {
    async listarView(req, res) {
        try {
            let aprovarferias = new AprovarFeriasModel();
            let lista = await aprovarferias.listarSolicitacaoFerias();
            res.render('aprovarferias/listar', { lista: lista });
        } catch (error) {
            console.error("Erro ao listar solicitações de férias:", error);
            res.status(500).send("Erro ao listar solicitações de férias");
        }
    }



    async alterarSolicitacaoFerias(req, res) {
        try {
            console.log(req.body);
            let aprovarferias = new AprovarFeriasModel();

            aprovarferias.idsolicitacaoFerias = req.body.idsolicitacaoFerias;
            aprovarferias.respostaGestor = req.body.respostaGestor;
            aprovarferias.status = req.body.status;

            let retorno = await aprovarferias.alterarSolicitacaoFerias();

            res.status(200).send("Solicitação de férias alterada com sucesso");
        } catch (error) {
            console.error("Erro ao alterar solicitação de férias:", error);
            res.status(500).send("Erro ao alterar solicitação de férias");
        }
    }

    async buscarFerias(req, res) {
        let aprovarferias = new AprovarFeriasModel();
        aprovarferias.funcionarioNome= req.body.busca;
        aprovarferias.datainicio =req.body.dataInicio;
        aprovarferias.datatermino = req.body.dataFinal;
        
        let lista = await aprovarferias.buscarResgistroFerias();
        res.render('aprovarferias/listar', {lista: lista});
    }
    
}



module.exports = AprovarFeriasController;