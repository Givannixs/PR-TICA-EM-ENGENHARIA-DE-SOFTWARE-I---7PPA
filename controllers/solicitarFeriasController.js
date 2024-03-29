const SolicitarFeriasModel = require("../models/solicitacaoferiasModel");

class SolicitarFeriasController {

    async listarView(req, res) {
        let solicitacaoferias = new SolicitarFeriasModel();
        solicitacaoferias.funcionario_idFuncionario=req.headers.cookie.split('=')[1];
        let lista = await solicitacaoferias.listarSolicitacaoFerias();
       
        res.render('solicitarferias/listar', {lista: lista});
    }



    async cadastrarSolicitarFerias(req, res) {
        
        let solicitacaoferias = new SolicitarFeriasModel();
       
        solicitacaoferias.datainicio=req.body.datainicio;
        solicitacaoferias.datatermino=req.body.datatermino;
        solicitacaoferias.status=req.body.status;
        solicitacaoferias.motivo=req.body.motivo;
        solicitacaoferias.funcionario_idFuncionario=req.headers.cookie.split('=')[1];
    
        let retorno = await solicitacaoferias.cadastrarSolicitacaoFerias();
        let lista = await solicitacaoferias.listarSolicitacaoFerias();
        res.render('solicitarferias/listar', {lista: lista});
       
        
    }
}





module.exports = SolicitarFeriasController;