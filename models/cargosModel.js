const Database = require('../db/database');

const conexao = new Database();
class CargosModel {

    #idCargo;
    #nomeCargo;
    //#departamento_idDepartamento;
    //#nomeDepartamento;

    get idCargo() { return this.#idCargo; } set idCargo(idCargo) {this.#idCargo = idCargo;}
    get nomeCargo() { return this.#nomeCargo; } set nomeCargo(nomeCargo) {this.#nomeCargo = nomeCargo;}
    //get departamento_idDepartamento() { return this.#departamento_idDepartamento; } set departamento_idDepartamento(departamento_idDepartamento) {this.#departamento_idDepartamento = departamento_idDepartamento;}
    //get nomeDepartamento() { return this.#nomeDepartamento; } set nomeDepartamento(nomeDepartamento) {this.#nomeDepartamento = nomeDepartamento;}

    constructor(idCargo, nomeCargo) {
        this.#idCargo = idCargo
        this.#nomeCargo = nomeCargo
       // this.#departamento_idDepartamento = departamento_idDepartamento
        //this.#nomeDepartamento = nomeDepartamento
   
    }


    async listarCargos() {

        let sql = 'SELECT * FROM `cargo`';
        
        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                
                listaRetorno.push(new CargosModel(row['idCargo'], row['nomeCargo']));
            }
          
        }

        return listaRetorno;
    }

    async deletarCargos(id) {


        try {

        let sql = "DELETE FROM `cargo` WHERE `cargo`.`idCargo` = '"+id+"'";
        
        var rows = await conexao.ExecutaComando(sql);

        return true;
            
        } catch (error) {

            return false;
            
        }

        
    }

    async cadastrarCargos() {

        let sql = "INSERT INTO `cargo`(`nomeCargo`) VALUES ('"+this.nomeCargo+"');";
        
        var rows = await conexao.ExecutaComando(sql);

        return true;
    }

    async buscarCargos() {

        let sql = "SELECT * FROM `cargo`  WHERE `nomeCargo` LIKE '%"+this.nomeCargo+"%' ORDER BY `cargo`.`nomeCargo` ASC";
        
        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new CargosModel(row['idCargo'], row['nomeCargo']));
                
                
            }
        }

        return listaRetorno;
    }



    async alterarCargos() {
        // Verifica se o departamento_idDepartamento existe na tabela departamento
       // const departamentoExists = await this.checkIfExists('departamento', 'idDepartamento', this.departamento_idDepartamento);
    
       // if (!departamentoExists) {
         //   throw new Error('ID de Departamento não existe na tabela referenciada.');
       // }
    
        let sql = "UPDATE `cargo` SET `nomeCargo` = ? WHERE `cargo`.`idCargo` = ?";
      
        var values = [this.nomeCargo, this.idCargo];
      
        var rows = await conexao.ExecutaComando(sql, values);
      
        return true;
    }
    
    async checkIfExists(table, column, value) {
        const sql = `SELECT 1 FROM \`${table}\` WHERE \`${column}\` = ? LIMIT 1`;
        const rows = await conexao.ExecutaComando(sql, [value]);
        return rows.length > 0;
    }


}

module.exports = CargosModel;