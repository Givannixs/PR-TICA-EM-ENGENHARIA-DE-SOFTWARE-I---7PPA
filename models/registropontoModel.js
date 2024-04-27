const Database = require('../db/database');

const conexao = new Database();
class RegistrapontoModel {

    #idregistroPonto;
    #data
    #entrada;
    #entradaRepouso;
    #saidaRepouso;
    #saida;
    #funcionario_idFuncionario;
    #funcionarioNome;

 

    get idregistroPonto() { return this.#idregistroPonto; } set idregistroPonto(idregistroPonto) {this.#idregistroPonto = idregistroPonto;}
    get data() { return this.#data; } set data(data) {this.#data = data;}
    get entrada() { return this.#entrada; } set entrada(entrada) {this.#entrada = entrada;}
    get entradaRepouso() { return this.#entradaRepouso; } set entradaRepouso(entradaRepouso) {this.#entradaRepouso = entradaRepouso;}
    get saidaRepouso() { return this.#saidaRepouso; } set saidaRepouso(saidaRepouso) {this.#saidaRepouso = saidaRepouso;}
    get saida() { return this.#saida; } set saida(saida) {this.#saida = saida;}
    get funcionario_idFuncionario() { return this.#funcionario_idFuncionario; } set funcionario_idFuncionario(funcionario_idFuncionario) {this.#funcionario_idFuncionario = funcionario_idFuncionario;}
    get funcionarioNome() { return this.#funcionarioNome; } set funcionarioNome(funcionarioNome) {this.#funcionarioNome = funcionarioNome;}
    


    constructor(idregistroPonto, data, entrada, entradaRepouso, saidaRepouso, saida, funcionario_idFuncionario, funcionarioNome) {
        this.#idregistroPonto = idregistroPonto
        this.#data = data
        this.#entrada = entrada
        this.#entradaRepouso = entradaRepouso
        this.#saidaRepouso = saidaRepouso
        this.#saida = saida
        this.#funcionario_idFuncionario = funcionario_idFuncionario
        this.#funcionarioNome = funcionarioNome
       

   
    }


    async listarResgistroponto() {
      try{
        let sql = `SELECT idregistroPonto, funcionario_idFuncionario, data, funcionarioNome, entrada,entradaRepouso, saidaRepouso, saida
        FROM funcionario_has_registroponto AS pontofuncionario
        INNER JOIN funcionario AS fun ON fun.idFuncionario = pontofuncionario.funcionario_idFuncionario
        INNER JOIN registroponto AS ponto ON ponto.idregistroPonto = pontofuncionario.registroponto_idregistroPonto WHERE funcionario_idFuncionario LIKE '%`+this.#funcionario_idFuncionario+`%' ORDER BY data DESC`;
        
    var rows = await conexao.ExecutaComando(sql);
    console.log(rows);
    let listaRetorno = [];

    if(rows.length > 0){
        for(let i=0; i<rows.length; i++){
            var row = rows[i];
            listaRetorno.push(new RegistrapontoModel(row['idregistroPonto'],row['data'], row['entrada'],row['entradaRepouso'],row['saidaRepouso'], row['saida'], row['funcionario_idFuncionario'], row['funcionarioNome'] ));
        }
    }
        
    return listaRetorno;
      }catch(error)
      {   let listaRetorno = [];
          listaRetorno.push('','','','','','','','');
          return listaRetorno;
      }
       
}

async cadastrarResgistroponto() {
        console.log(this.#data,this.#entrada);
       let sql = "INSERT INTO `registroponto`(`data`,`entrada`, `entradaRepouso`,`saidaRepouso`,`saida`) VALUES ('"+this.#data+"','"+this.#entrada+"','"+this.#entradaRepouso+"','"+this.#saidaRepouso+"','"+this.#saida+"')";
        
        var rows = await conexao.ExecutaComando(sql);
        console.log('id inserido' +rows.insertId);

       let sql2 = "INSERT INTO `funcionario_has_registroponto` (`funcionario_idFuncionario`, `registroponto_idregistroPonto`) VALUES ('"+this.funcionario_idFuncionario+"', '"+rows.insertId+"')";
        var rows = await conexao.ExecutaComando(sql2);

        return true;
    }

    async buscarResgistroponto() {
       
        let sql = "SELECT * FROM `registroponto` INNER JOIN `funcionario` ON `registroponto`.`funcionario_idFuncionario` = `funcionario`.`idFuncionario` WHERE `funcionarioNome` LIKE '%" + this.funcionarioNome + "%' ORDER BY `registroponto`.`entrada` DESC";

        
        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new RegistrapontoModel(row['idregistroPonto'], row['entrada'],row['entradaRepouso'],row['saidaRepouso'],  row['saida'], row['funcionario_idFuncionario'], row['funcionarioNome'] ));
                
                
            }
        }

        return listaRetorno;
    }



    async alterarResgistroponto() {
        let sql = "UPDATE `registroponto` SET `entradaRepouso` = ?,`saidaRepouso` = ?, `saida` = ? WHERE `registroponto`.`idregistroPonto` = ?";
      
        var values = [this.entradaRepouso,this.saidaRepouso, this.saida, this.idregistroPonto];
      
        var rows = await conexao.ExecutaComando(sql, values);
      
        return true;
    }




    // model registro ponto admin

    async listarResgistropontoadmin() {
      
        let sql = `SELECT idregistroPonto, funcionario_idFuncionario, data, funcionarioNome, entrada,entradaRepouso, saidaRepouso, saida, funcionarioStatus
        FROM funcionario_has_registroponto AS pontofuncionario
        INNER JOIN funcionario AS fun ON fun.idFuncionario = pontofuncionario.funcionario_idFuncionario
        INNER JOIN registroponto AS ponto ON ponto.idregistroPonto = pontofuncionario.registroponto_idregistroPonto WHERE funcionarioStatus = 1 ORDER BY data DESC`;
        
    var rows = await conexao.ExecutaComando(sql);
    console.log(rows);
    let listaRetorno = [];

    if(rows.length > 0){
        for(let i=0; i<rows.length; i++){
            var row = rows[i];
            listaRetorno.push(new RegistrapontoModel(row['idregistroPonto'],row['data'], row['entrada'],row['entradaRepouso'],row['saidaRepouso'], row['saida'], row['funcionario_idFuncionario'], row['funcionarioNome'] ));
        }
    }
        
    return listaRetorno;
}

async deletarResgistropontoadmin(id) {


    try {

        let sql = "DELETE FROM `funcionario_has_registroponto` WHERE `registroponto_idregistroPonto` = '"+id+"'";
    
        var rows = await conexao.ExecutaComando(sql);

         sql = "DELETE FROM `registroponto` WHERE `registroponto`.`idregistroPonto` = '"+id+"'";
    
        rows = await conexao.ExecutaComando(sql);

    return true;
        
    } catch (error) {

        return false;
        
    }

    
}

async buscarResgistropontoadmin() {
    let sql = `SELECT idregistroPonto, funcionario_idFuncionario, data, funcionarioNome, entrada,entradaRepouso, saidaRepouso, saida, funcionarioStatus FROM funcionario_has_registroponto AS pontofuncionario INNER JOIN funcionario AS fun ON fun.idFuncionario = pontofuncionario.funcionario_idFuncionario INNER JOIN registroponto AS ponto ON ponto.idregistroPonto = pontofuncionario.registroponto_idregistroPonto WHERE funcionarioNome LIKE '%`+this.#funcionarioNome+`%' AND data BETWEEN '`+this.#entrada+`' AND '`+this.#saida+`' AND funcionarioStatus = 1 ORDER BY data DESC`;   
    

    
    var rows = await conexao.ExecutaComando(sql);

    let listaRetorno = [];

    if(rows.length > 0){
        for(let i=0; i<rows.length; i++){
            var row = rows[i];
            listaRetorno.push(new RegistrapontoModel(row['idregistroPonto'],row['data'], row['entrada'],row['entradaRepouso'],row['saidaRepouso'], row['saida'], row['funcionario_idFuncionario'], row['funcionarioNome'] ));
            
            
        }
    }

    return listaRetorno;
}


async alterarResgistropontoadmin() {
    let sql = "UPDATE `registroponto` SET `entrada` = ?, `entradaRepouso` = ?,`saidaRepouso` = ?, `saida` = ? WHERE `registroponto`.`idregistroPonto` = ?";
  
    var values = [this.entrada,this.entradaRepouso,this.saidaRepouso, this.saida, this.idregistroPonto];
  
    var rows = await conexao.ExecutaComando(sql, values);
  
    return true;
}
    


}

module.exports = RegistrapontoModel;