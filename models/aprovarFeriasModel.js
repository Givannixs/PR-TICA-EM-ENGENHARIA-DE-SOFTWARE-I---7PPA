const Database = require('../db/database');

const conexao = new Database();

class AprovarFeriasModel {
    constructor(idsolicitacaoFerias, funcionario_idFuncionario, datasolicitacao, datainicio, datatermino, status, motivo, respostaGestor, funcionarioNome, dataAdmissao) {
        this.idsolicitacaoFerias = idsolicitacaoFerias;
        this.funcionario_idFuncionario = funcionario_idFuncionario;
        this.datasolicitacao = datasolicitacao;
        this.datainicio = datainicio;
        this.datatermino = datatermino;
        this.status = status;
        this.motivo = motivo;
        this.respostaGestor = respostaGestor;
        this.funcionarioNome = funcionarioNome;
        this.dataAdmissao = dataAdmissao;
    }

    async listarSolicitacaoFerias() {
        try {
            let sql = `SELECT feriasfuncionario.idsolicitacaoFerias, 
                        feriasfuncionario.funcionario_idFuncionario, 
                        feriasfuncionario.dataSolicitacao,
                        feriasfuncionario.datainicio, 
                        feriasfuncionario.datatermino, 
                        feriasfuncionario.status, 
                        feriasfuncionario.motivo, 
                        feriasfuncionario.respostaGestor,
                        fun.funcionarioNome,
                        fun.dataAdmissao,
                        fun.funcionarioStatus
                        FROM solicitacaoferias AS feriasfuncionario
                        INNER JOIN funcionario AS fun ON fun.idFuncionario = feriasfuncionario.funcionario_idFuncionario AND fun.funcionarioStatus = 1
                        ORDER BY feriasfuncionario.datainicio DESC;`;
            var rows = await conexao.ExecutaComando(sql);
            console.log("Linhas retornadas do banco de dados:", rows);
            let listaRetorno = [];

            if (rows.length > 0) {
                for (let i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    listaRetorno.push(new AprovarFeriasModel(row.idsolicitacaoFerias, row.funcionario_idFuncionario, row.dataSolicitacao, row.datainicio, row.datatermino, row.status, row.motivo, row.respostaGestor, row.funcionarioNome, row.dataAdmissao, row.funcionarioStatus));
                }
            }
            return listaRetorno;
        } catch (error) {
            throw new Error("Erro ao listar solicitações de férias no banco de dados: " + error.message);
        }
    }

    async alterarSolicitacaoFerias() {
     
            let sql = "UPDATE `solicitacaoferias` SET `status` = ?, `respostaGestor` = ? WHERE `idsolicitacaoFerias` = ?";
            var values = [this.status, this.respostaGestor, this.idsolicitacaoFerias];

            var rows = await conexao.ExecutaComando(sql, values);
      
            return true;      
    }
}

module.exports = AprovarFeriasModel;
