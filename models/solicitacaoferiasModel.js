const Database = require('../db/database');

const conexao = new Database();
class SolicitarFeriasModel {

    #idsolicitacaoFerias;
    #datasolicitacao;
    #datainicio;
    #datatermino;
    #anoReferencia;
    #status;
    #motivo;
    #respostaGestor;
    #funcionario_idFuncionario;
    #diasFeriasDisponiveis;
    #funcionarioNome;
    #dataAdmissao

 

    get idsolicitacaoFerias() { return this.#idsolicitacaoFerias; } set idsolicitacaoFerias(idsolicitacaoFerias) {this.#idsolicitacaoFerias = idsolicitacaoFerias;}
    get datasolicitacao() { return this.#datasolicitacao; } set datasolicitacao(datasolicitacao) {this.#datasolicitacao = datasolicitacao;}
    get datainicio() { return this.#datainicio; } set datainicio(datainicio) {this.#datainicio = datainicio;}
    get datatermino() { return this.#datatermino; } set datatermino(datatermino) {this.#datatermino = datatermino;}
    get anoReferencia() { return this.#anoReferencia; } set anoReferencia(anoReferencia) {this.#anoReferencia = anoReferencia;}
    get status() { return this.#status; } set status(status) {this.#status = status;}
    get motivo() { return this.#motivo; } set motivo(motivo) {this.#motivo = motivo;}
    get respostaGestor() { return this.#respostaGestor; } set respostaGestor(respostaGestor) {this.#respostaGestor = respostaGestor;}
    get funcionario_idFuncionario() { return this.#funcionario_idFuncionario; } set funcionario_idFuncionario(funcionario_idFuncionario) {this.#funcionario_idFuncionario = funcionario_idFuncionario;}
    get diasFeriasDisponiveis() { return this.#diasFeriasDisponiveis; } set diasFeriasDisponiveis(diasFeriasDisponiveis) {this.#diasFeriasDisponiveis = diasFeriasDisponiveis;}
    get funcionarioNome() { return this.#funcionarioNome; } set funcionarioNome(funcionarioNome) {this.#funcionarioNome = funcionarioNome;}
    get dataAdmissao () { return this.#dataAdmissao ; } set dataAdmissao (dataAdmissao ) {this.#dataAdmissao  = dataAdmissao ;}
    


    constructor(idsolicitacaoFerias, datasolicitacao, datainicio, datatermino, anoReferencia, status, motivo, respostaGestor, funcionario_idFuncionario, diasFeriasDisponiveis, funcionarioNome, dataAdmissao) {
        this.#idsolicitacaoFerias = idsolicitacaoFerias
        this.#datasolicitacao = datasolicitacao
        this.#datainicio = datainicio
        this.#datatermino = datatermino
        this.#anoReferencia = anoReferencia
        this.#status = status
        this.#motivo = motivo
        this.#respostaGestor = respostaGestor
        this.#funcionario_idFuncionario = funcionario_idFuncionario
        this.#diasFeriasDisponiveis = diasFeriasDisponiveis
        this.#funcionarioNome = funcionarioNome
        this.#dataAdmissao = dataAdmissao
    }


    async listarSolicitacaoFerias() {
      
        let sql = `SELECT feriasfuncionario.idsolicitacaoFerias, 
        feriasfuncionario.funcionario_idFuncionario,
        feriasfuncionario.datasolicitacao,
        feriasfuncionario.datainicio, 
        feriasfuncionario.datatermino,
        feriasfuncionario.anoReferencia, 
        feriasfuncionario.status, 
        feriasfuncionario.motivo,
        feriasfuncionario.respostaGestor,
        fun.funcionarioNome,
        fun.diasFeriasDisponiveis,
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
            listaRetorno.push(new SolicitarFeriasModel(row['idsolicitacaoFerias'],row['datasolicitacao'],row['datainicio'], row['datatermino'], row['anoReferencia'], row['status'], row['motivo'], row['respostaGestor'], row['funcionario_idFuncionario'], row['diasFeriasDisponiveis'], row['funcionarioNome'], row['dataAdmissao']  ));
        }
    }
        
    return listaRetorno;
}


async cadastrarSolicitacaoFerias() {
    console.log(this.#datasolicitacao, this.#datainicio, this.#datatermino);
    let sql = "INSERT INTO `solicitacaoferias`(`datasolicitacao`, `datainicio`, `datatermino`, `status`, `motivo`, `funcionario_idFuncionario`) VALUES (?, ?, ?, ?, ?, ?)";
    var values = [this.#datasolicitacao, this.#datainicio, this.#datatermino, this.#status, this.#motivo, this.#funcionario_idFuncionario];

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
        let sql = "UPDATE `solicitacaoferias` SET `datasolicitacao` = ?, `dataInicio` = ?,`datatermino` = ? WHERE `solicitacaoferias`.`idsolicitacaoFerias` = ?";
      
        var values = [this.#datasolicitacao, this.datainicio,this.#datatermino, this.idsolicitacaoFerias];
      
        var rows = await conexao.ExecutaComando(sql, values);
      
        return true;
    }
    


}

module.exports = SolicitarFeriasModel;
