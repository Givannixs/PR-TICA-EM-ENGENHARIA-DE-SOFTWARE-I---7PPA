const Database = require('../db/database');

const conexao = new Database();
class CargosModel {

    #idCargo;
    #nomeCargo;
    #departamento_idDepartamento;
    #nomeDepartamento;

    get idCargo() { return this.#idCargo; } set idCargo(idCargo) {this.#idCargo = idCargo;}
    get nomeCargo() { return this.#nomeCargo; } set nomeCargo(nomeCargo) {this.#nomeCargo = nomeCargo;}
    get departamento_idDepartamento() { return this.#departamento_idDepartamento; } set departamento_idDepartamento(departamento_idDepartamento) {this.#departamento_idDepartamento = departamento_idDepartamento;}
    get nomeDepartamento() { return this.#nomeDepartamento; } set nomeDepartamento(nomeDepartamento) {this.#nomeDepartamento = nomeDepartamento;}

    constructor(idCargo, nomeCargo,departamento_idDepartamento,nomeDepartamento) {
        this.#idCargo = idCargo
        this.#nomeCargo = nomeCargo
        this.#departamento_idDepartamento = departamento_idDepartamento
        this.#nomeDepartamento = nomeDepartamento
   
    }


    async listarCargos() {

        let sql = 'SELECT * FROM `cargo` JOIN `departamento` ON cargo.departamento_idDepartamento = departamento.idDepartamento';
        
        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                
                listaRetorno.push(new CargosModel(row['idCargo'], row['nomeCargo'],row['departamento_idDepartamento'],row['nomeDepartamento']));
            }
          
        }

        return listaRetorno;
    }

    async deletarCargos(id) {

        let sql = "DELETE FROM `cargo` WHERE `cargo`.`idCargo` = '"+id+"'";
        
        var rows = await conexao.ExecutaComando(sql);

        return true;
    }

    async cadastrarCargos() {

        let sql = "INSERT INTO `cargo`(`nomeCargo`, `departamento_idDepartamento`) VALUES ('"+this.nomeCargo+"','"+this.departamento_idDepartamento+"');";
        
        var rows = await conexao.ExecutaComando(sql);

        return true;
    }

    async buscarCargos() {

        let sql = "SELECT * FROM `cargo` JOIN `departamento` ON cargo.departamento_idDepartamento = departamento.idDepartamento WHERE `nomeCargo` LIKE '%"+this.nomeCargo+"%' ORDER BY `cargo`.`nomeCargo` ASC";
        
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
        const departamentoExists = await this.checkIfExists('departamento', 'idDepartamento', this.departamento_idDepartamento);
    
        if (!departamentoExists) {
            throw new Error('ID de Departamento não existe na tabela referenciada.');
        }
    
        let sql = "UPDATE `cargo` SET `nomeCargo` = ?, `departamento_idDepartamento` = ? WHERE `cargo`.`idCargo` = ?";
      
        var values = [this.nomeCargo, this.departamento_idDepartamento, this.idCargo];
      
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