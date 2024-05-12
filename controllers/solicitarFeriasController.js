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

            // Calcular dias de férias disponíveis e ano de referência
            await solicitacaoferias.calcularDiasFeriasDisponiveis();

            // Passar o ano de referência calculado para cadastrarSolicitacaoFerias
            let retorno = await solicitacaoferias.cadastrarSolicitacaoFerias(solicitacaoferias.anoReferencia);

            // Listar as solicitações de férias atualizadas
            let lista = await solicitacaoferias.listarSolicitacaoFerias();
            res.render('solicitarferias/listar', { lista: lista });
        } catch (error) {
            console.error('Erro ao cadastrar solicitação de férias:', error);
            res.status(500).send('Erro ao cadastrar solicitação de férias');
        }
    }
}

module.exports = SolicitarFeriasController;
