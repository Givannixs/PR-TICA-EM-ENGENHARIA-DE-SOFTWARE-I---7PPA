const Database = require('../db/database');

const conexao = new Database();
class DepartamentosModel {

    #idDepartamento;
    #nomeDepartamento;
 

    get idDepartamento() { return this.#idDepartamento; } set idDepartamento(idDepartamento) {this.#idDepartamento = idDepartamento;}
    get nomeDepartamento() { return this.#nomeDepartamento; } set nomeDepartamento(nomeDepartamento) {this.#nomeDepartamento = nomeDepartamento;}


    constructor(idDepartamento, nomeDepartamento) {
        this.#idDepartamento = idDepartamento
        this.#nomeDepartamento = nomeDepartamento
   
    }


    async listarDepartamentos() {

        let sql = 'SELECT * FROM `departamento`';
        
        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new DepartamentosModel(row['idDepartamento'], row['nomeDepartamento']));
            }
        }

        return listaRetorno;
    }

    async deletarDepartamentos(id) {

        let sql = "DELETE FROM `departamento` WHERE `departamento`.`idDepartamento` = '"+id+"'";
        
        var rows = await conexao.ExecutaComando(sql);

        return true;
    }
    
    async cadastrarDepartamentos() {

        let sql = "INSERT INTO `departamento`(`nomeDepartamento`) VALUES ('"+this.nomeDepartamento+"');";
        
        var rows = await conexao.ExecutaComando(sql);

        return true;
    }

    async buscarDepartamentos() {

        let sql = "SELECT * FROM `departamento` WHERE `nomeDepartamento` LIKE '%"+this.nomeDepartamento+"%' ORDER BY `departamento`.`nomeDepartamento` ASC";
        
        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new DepartamentosModel(row['idDepartamento'], row['nomeDepartamento']));
                
                
            }
        }

        return listaRetorno;
    }



    async alterarDepartamentos() {
        let sql = "UPDATE `departamento` SET `nomeDepartamento` = ? WHERE `departamento`.`idDepartamento` = ?";
      
        var values = [this.nomeDepartamento,this.idDepartamento];
      
        var rows = await conexao.ExecutaComando(sql, values);
      
        return true;
      }


}

module.exports = DepartamentosModel;