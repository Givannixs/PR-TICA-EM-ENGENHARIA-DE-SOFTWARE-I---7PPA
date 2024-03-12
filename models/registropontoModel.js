const Database = require('../db/database');

const conexao = new Database();
class RegistapontoModel {

    #idregistroPonto;
    #dataHoraEntrada;
    #dataHoraSaida;
    #funcionario_idFuncionario;
    #funcionarioNome;

 

    get idregistroPonto() { return this.#idregistroPonto; } set idregistroPonto(idregistroPonto) {this.#idregistroPonto = idregistroPonto;}
    get dataHoraEntrada() { return this.#dataHoraEntrada; } set dataHoraEntrada(dataHoraEntrada) {this.#dataHoraEntrada = dataHoraEntrada;}
    get dataHoraSaida() { return this.#dataHoraSaida; } set dataHoraSaida(dataHoraSaida) {this.#dataHoraSaida = dataHoraSaida;}
    get funcionario_idFuncionario() { return this.#funcionario_idFuncionario; } set funcionario_idFuncionario(funcionario_idFuncionario) {this.#funcionario_idFuncionario = funcionario_idFuncionario;}
    get funcionarioNome() { return this.#funcionarioNome; } set funcionarioNome(funcionarioNome) {this.#funcionarioNome = funcionarioNome;}
    


    constructor(idregistroPonto, dataHoraEntrada, dataHoraSaida, funcionario_idFuncionario, funcionarioNome) {
        this.#idregistroPonto = idregistroPonto
        this.#dataHoraEntrada = dataHoraEntrada
        this.#dataHoraSaida = dataHoraSaida
        this.#funcionario_idFuncionario = funcionario_idFuncionario
        this.#funcionarioNome = funcionarioNome
       

   
    }


    async listarResgistroponto() {
      
        let sql = 'SELECT * FROM `registroponto` INNER JOIN `funcionario` ON `registroponto`.`funcionario_idFuncionario` = `funcionario`.`idFuncionario`';
        
        var rows = await conexao.ExecutaComando(sql);
        console.log(rows);
        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new RegistapontoModel(row['idregistroPonto'], row['dataHoraEntrada'],  row['dataHoraSaida'], row['funcionario_idFuncionario'], row['funcionarioNome'] ));
            }
        }
        
        return listaRetorno;
    }

    async deletarResgistroponto(id) {


        try {

            let sql = "DELETE FROM `registroponto` WHERE `registroponto`.`idregistroPonto` = '"+id+"'";
        
        var rows = await conexao.ExecutaComando(sql);

        return true;
            
        } catch (error) {

            return false;
            
        }

        
    }

    async cadastrarResgistroponto() {

        let sql = "INSERT INTO `registroponto`(`dataHoraEntrada`, `dataHoraSaida`, `funcionario_idFuncionario`) VALUES ('"+this.#dataHoraEntrada+"','"+this.#dataHoraSaida+"', '"+this.#funcionario_idFuncionario+"')";
        
        var rows = await conexao.ExecutaComando(sql);

        return true;
    }

    async buscarResgistroponto() {

        let sql = "SELECT * FROM `registroponto` INNER JOIN `funcionario` ON `registroponto`.`funcionario_idFuncionario` = `funcionario`.`idFuncionario` WHERE `dataHoraEntrada` LIKE '%" + this.dataHoraEntrada + "%' ORDER BY `registroponto`.`dataHoraEntrada` ASC";

        
        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new RegistapontoModel(row['idregistroPonto'], row['dataHoraEntrada'], row['dataHoraSaida'], row['funcionarioNome']));
                
                
            }
        }

        return listaRetorno;
    }



    async alterarResgistroponto() {
        let sql = "UPDATE `registroponto` SET `dataHoraEntrada` = ?, `dataHoraSaida` = ?, `funcionario_idFuncionario` = ?  WHERE `registroponto`.`idregistroPonto` = ?";
      
        var values = [this.dataHoraEntrada, this.dataHoraSaida, this.funcionario_idFuncionario, this.idregistroPonto];
      
        var rows = await conexao.ExecutaComando(sql, values);
      
        return true;
    }
    


}

module.exports = RegistapontoModel;