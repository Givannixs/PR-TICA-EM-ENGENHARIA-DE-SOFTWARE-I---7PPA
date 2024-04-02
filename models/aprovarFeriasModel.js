const Database = require('../db/database');

const conexao = new Database();

class AprovarFeriasModel {
    constructor(idsolicitacaoFerias, datainicio, datatermino, status, motivo, funcionario_idFuncionario, funcionarioNome, dataAdmissao) {
        this.idsolicitacaoFerias = idsolicitacaoFerias;
        this.datainicio = datainicio;
        this.datatermino = datatermino;
        this.status = status;
        this.motivo = motivo;
        this.funcionario_idFuncionario = funcionario_idFuncionario;
        this.funcionarioNome = funcionarioNome;
        this.dataAdmissao = dataAdmissao;
    }

    async listarSolicitacaoFerias() {
        try {
            let sql = `SELECT feriasfuncionario.idsolicitacaoFerias, 
                        feriasfuncionario.funcionario_idFuncionario, 
                        feriasfuncionario.datainicio, 
                        feriasfuncionario.datatermino, 
                        feriasfuncionario.status, 
                        feriasfuncionario.motivo, 
                        fun.funcionarioNome,
                        fun.dataAdmissao
                        FROM solicitacaoferias AS feriasfuncionario
                        INNER JOIN funcionario AS fun ON fun.idFuncionario = feriasfuncionario.funcionario_idFuncionario
                        ORDER BY feriasfuncionario.datainicio DESC;`;
            var rows = await conexao.ExecutaComando(sql);
            console.log("Linhas retornadas do banco de dados:", rows);
            let listaRetorno = [];

            if (rows.length > 0) {
                for (let i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    listaRetorno.push(new AprovarFeriasModel(row.idsolicitacaoFerias, row.datainicio, row.datatermino, row.status, row.motivo, row.funcionario_idFuncionario, row.funcionarioNome, row.dataAdmissao));
                }
            }
            return listaRetorno;
        } catch (error) {
            throw new Error("Erro ao listar solicitações de férias no banco de dados: " + error.message);
        }
    }

    async alterarSolicitacaoFerias() {
     
            let sql = "UPDATE `solicitacaoferias` SET `status` = ? WHERE `idsolicitacaoFerias` = ? ";
            var values = [this.status, this.idsolicitacaoFerias];

            var rows = await conexao.ExecutaComando(sql, values);
      
            return true;      
    }
}

module.exports = AprovarFeriasModel;
