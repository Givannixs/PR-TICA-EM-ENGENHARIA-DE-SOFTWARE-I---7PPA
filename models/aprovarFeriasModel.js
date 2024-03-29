const Database = require('../db/database');

const conexao = new Database();
class AprovarFeriasModel {

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


    async obterListaDeSolicitacoesDeFerias() {
      
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
        WHERE feriasfuncionario.funcionario_idFuncionario LIKE '%`+this.#funcionario_idFuncionario+`%'
        ORDER BY feriasfuncionario.datainicio DESC;`;
        
    var rows = await conexao.ExecutaComando(sql);
    console.log(rows);
    let listaRetorno = [];

    if(rows.length > 0){
        for(let i=0; i<rows.length; i++){
            var row = rows[i];
            listaRetorno.push(new AprovarFeriasModel(row['idsolicitacaoFerias'],row['datainicio'], row['datatermino'], row['status'], row['motivo'], row['funcionario_idFuncionario'], row['funcionarioNome'], row['dataAdmissao']  ));
        }
    }
        
    return listaRetorno;
}


}

module.exports = AprovarFeriasModel;