const Database = require('../db/database');

const conexao = new Database();
class SolicitarFeriasModel {

    #idsolicitacaoFerias;
    #datainicio;
    #datatermino;
    #status;
    #motivo;
    #funcionario_idFuncionario;
    #funcionarioNome;
    #dataAdmissao

 

    get idsolicitacaoFerias() { return this.#idsolicitacaoFerias; } set idsolicitacaoFerias(idsolicitacaoFerias) {this.#idsolicitacaoFerias = idsolicitacaoFerias;}
    get datainicio() { return this.#datainicio; } set datainicio(datainicio) {this.#datainicio = datainicio;}
    get datatermino() { return this.#datatermino; } set datatermino(datatermino) {this.#datatermino = datatermino;}
    get status() { return this.#status; } set status(status) {this.#status = status;}
    get motivo() { return this.#motivo; } set motivo(motivo) {this.#motivo = motivo;}
    get funcionario_idFuncionario() { return this.#funcionario_idFuncionario; } set funcionario_idFuncionario(funcionario_idFuncionario) {this.#funcionario_idFuncionario = funcionario_idFuncionario;}
    get funcionarioNome() { return this.#funcionarioNome; } set funcionarioNome(funcionarioNome) {this.#funcionarioNome = funcionarioNome;}
    get dataAdmissao () { return this.#dataAdmissao ; } set dataAdmissao (dataAdmissao ) {this.#dataAdmissao  = dataAdmissao ;}
    


    constructor(idsolicitacaoFerias, datainicio, datatermino, status, motivo,funcionario_idFuncionario, funcionarioNome,dataAdmissao) {
        this.#idsolicitacaoFerias = idsolicitacaoFerias
        this.#datainicio = datainicio
        this.#datatermino = datatermino
        this.#status = status
        this.#motivo = motivo
        this.#funcionario_idFuncionario = funcionario_idFuncionario
        this.#funcionarioNome = funcionarioNome
        this.#dataAdmissao = dataAdmissao
       

   
    }


    async listarSolicitacaoFerias() {
      
        let sql = `SELECT feriasfuncionario.idsolicitacaoFerias, 
        feriasfuncionario.funcionario_idFuncionario, 
        feriasfuncionario.datainicio, 
        feriasfuncionario.datatermino, 
        feriasfuncionario.status, 
        feriasfuncionario.motivo, 
        fun.funcionarioNome,
        fun.dataAdmissao,
        fun.funcionarioStatus
        FROM solicitacaoferias AS feriasfuncionario
        INNER JOIN funcionario AS fun ON fun.idFuncionario = feriasfuncionario.funcionario_idFuncionario
        WHERE feriasfuncionario.funcionario_idFuncionario LIKE '%`+this.#funcionario_idFuncionario+`%' AND fun.funcionarioStatus = 1
        ORDER BY feriasfuncionario.datainicio DESC;`;
        
    var rows = await conexao.ExecutaComando(sql);
    console.log(rows);
    let listaRetorno = [];

    if(rows.length > 0){
        for(let i=0; i<rows.length; i++){
            var row = rows[i];
            listaRetorno.push(new SolicitarFeriasModel(row['idsolicitacaoFerias'],row['datainicio'], row['datatermino'], row['status'], row['motivo'], row['funcionario_idFuncionario'], row['funcionarioNome'], row['dataAdmissao']  ));
        }
    }
        
    return listaRetorno;
}


async cadastrarSolicitacaoFerias() {
    console.log(this.#datainicio, this.#datatermino);
    let sql = "INSERT INTO `solicitacaoferias`(`datainicio`, `datatermino`, `status`, `motivo`, `funcionario_idFuncionario`) VALUES (?, ?, ?, ?, ?)";
    var values = [this.#datainicio, this.#datatermino, this.#status, this.#motivo, this.#funcionario_idFuncionario];

    try {
        var result = await conexao.ExecutaComando(sql, values);
        console.log('id inserido: ' + result.insertId);
        return true;
    } catch (error) {
        console.error('Erro ao cadastrar solicitação de férias:', error);
        return false;
    }
}


    async alterarSolicitacaoFerias() {
        let sql = "UPDATE `solicitacaoferias` SET `dataInicio` = ?,`datatermino` = ? WHERE `solicitacaoferias`.`idsolicitacaoFerias` = ?";
      
        var values = [this.datainicio,this.#datatermino, this.idsolicitacaoFerias];
      
        var rows = await conexao.ExecutaComando(sql, values);
      
        return true;
    }
    


}

module.exports = SolicitarFeriasModel;