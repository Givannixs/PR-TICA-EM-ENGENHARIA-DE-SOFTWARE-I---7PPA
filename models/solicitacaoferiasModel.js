const Database = require('../db/database');

const conexao = new Database();
class SolicitarFeriasModel {

    #idsolicitacaoFerias;
    #datainicio
    #datatermino;
    #funcionario_idFuncionario;
    #funcionarioNome;

 

    get idsolicitacaoFerias() { return this.#idsolicitacaoFerias; } set idsolicitacaoFerias(idsolicitacaoFerias) {this.#idsolicitacaoFerias = idsolicitacaoFerias;}
    get datainicio() { return this.#datainicio; } set datainicio(datainicio) {this.#datainicio = datainicio;}
    get datatermino() { return this.#datatermino; } set datatermino(datatermino) {this.#datatermino = datatermino;}
    get funcionario_idFuncionario() { return this.#funcionario_idFuncionario; } set funcionario_idFuncionario(funcionario_idFuncionario) {this.#funcionario_idFuncionario = funcionario_idFuncionario;}
    get funcionarioNome() { return this.#funcionarioNome; } set funcionarioNome(funcionarioNome) {this.#funcionarioNome = funcionarioNome;}
    


    constructor(idsolicitacaoFerias, datainicio, datatermino, entradaRepouso, saidaRepouso, saida, funcionario_idFuncionario, funcionarioNome) {
        this.#idsolicitacaoFerias = idsolicitacaoFerias
        this.#datainicio = datainicio
        this.#datatermino = datatermino

        this.#funcionario_idFuncionario = funcionario_idFuncionario
        this.#funcionarioNome = funcionarioNome
       

   
    }


    async listarSolicitacaoFerias() {
      
        let sql = `SELECT idsolicitacaoFerias, funcionario_idFuncionario, datainicio, funcionarioNome, datatermino
        FROM funcionario_has_solicitacaoferias AS feriasfuncionario
        INNER JOIN funcionario AS fun ON fun.idFuncionario = feriasfuncionario.funcionario_idFuncionario
        INNER JOIN solicitacaoferias AS ferias ON ferias.idsolicitacaoFerias = feriasfuncionario.solicitacaoferias_idsolicitacaoFerias WHERE funcionario_idFuncionario LIKE '%`+this.#funcionario_idFuncionario+`%' ORDER BY datainicio DESC`;
        
    var rows = await conexao.ExecutaComando(sql);
    console.log(rows);
    let listaRetorno = [];

    if(rows.length > 0){
        for(let i=0; i<rows.length; i++){
            var row = rows[i];
            listaRetorno.push(new SolicitarFeriasModel(row['idsolicitacaoFerias'],row['datainicio'], row['datatermino'],row['entradaRepouso'],row['saidaRepouso'], row['saida'], row['funcionario_idFuncionario'], row['funcionarioNome'] ));
        }
    }
        
    return listaRetorno;
}


    async cadastrarSolicitacaoFerias() {
        console.log(this.#datainicio,this.#datatermino);
       let sql = "INSERT INTO `solicitacaoferias`(`datainicio`,`datatermino`) VALUES ('"+this.#datainicio+"','"+this.#datatermino+"')";
        
        var rows = await conexao.ExecutaComando(sql);
        console.log('id inserido' +rows.insertId);

       let sql2 = "INSERT INTO `funcionario_has_solicitacaoferias` (`funcionario_idFuncionario`, `solicitacaoferias_idsolicitacaoFerias`) VALUES ('"+this.funcionario_idFuncionario+"', '"+rows.insertId+"')";
        var rows = await conexao.ExecutaComando(sql2);

        return true;
    }

    async alterarSolicitacaoFerias() {
        let sql = "UPDATE `solicitacaoferias` SET `dataInicio` = ?,`datatermino` = ? WHERE `solicitacaoferias`.`idsolicitacaoFerias` = ?";
      
        var values = [this.datainicio,this.#datatermino, this.idsolicitacaoFerias];
      
        var rows = await conexao.ExecutaComando(sql, values);
      
        return true;
    }
    


}

module.exports = SolicitarFeriasModel;