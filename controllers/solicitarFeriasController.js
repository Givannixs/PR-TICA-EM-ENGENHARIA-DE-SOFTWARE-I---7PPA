const SolicitarFeriasModel = require("../models/solicitacaoferiasModel");

class SolicitarFeriasController {

    async listarView(req, res) {
        try {
            let solicitacaoferias = new SolicitarFeriasModel();
            solicitacaoferias.funcionario_idFuncionario = req.headers.cookie.split('=')[1];
            let lista = await solicitacaoferias.listarSolicitacaoFerias();
            res.render('solicitarferias/listar', { lista: lista });
        } catch (error) {
            console.error('Erro ao listar solicitações de férias:', error);
            res.status(500).send('Erro ao listar solicitações de férias');
        }
    }

    async cadastrarSolicitarFerias(req, res) {
        try {
            let solicitacaoferias = new SolicitarFeriasModel();
            solicitacaoferias.datasolicitacao = req.body.datasolicitacao;
            solicitacaoferias.datainicio = req.body.datainicio;
            solicitacaoferias.datatermino = req.body.datatermino;
            solicitacaoferias.status = req.body.status;
            solicitacaoferias.motivo = req.body.motivo;
            solicitacaoferias.funcionario_idFuncionario = req.headers.cookie.split('=')[1];
            
            // Passar o ano de referência calculado para cadastrarSolicitacaoFerias
            let retorno = await solicitacaoferias.cadastrarSolicitacaoFerias();
            let lista = await solicitacaoferias.listarSolicitacaoFerias();
            
            res.render('solicitarferias/listar', { lista: lista });
        } catch (error) {
            console.error('Erro ao cadastrar solicitação de férias:', error);
            res.status(500).send('Erro ao cadastrar solicitação de férias');
        }
    }

    async buscarFerias(req, res) {
        let solicitacaoferias = new SolicitarFeriasModel();
        solicitacaoferias.status= req.body.busca;
        solicitacaoferias.datainicio =req.body.dataInicio;
        solicitacaoferias.datatermino = req.body.dataFinal;
        
        let lista = await solicitacaoferias.buscarResgistroFerias();
        res.render('solicitarferias/listar', {lista: lista});
    }
}

module.exports = SolicitarFeriasController;
