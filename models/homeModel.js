const Database = require('../db/database');

const conexao = new Database();
class HomeModel {
    #id_home
    #Comunicado;

    get idhome() { return this.#id_home; } set id_home(id_home) {this.#id_home = id_home;}
    get Comunicado() { return this.#Comunicado; } set Comunicado(Comunicado) {this.#Comunicado = Comunicado;}


    constructor(id_home,Comunicado) {
        this.#id_home = id_home
        this.#Comunicado = Comunicado
   
    }


    async listarComunicado() {

        let sql = 'SELECT * FROM `home`';
        
        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new HomeModel(row['id_home'],row['comunicado']));
            }
        }

        return listaRetorno;
    }

   


    async alterarComunicado() {
        let sql = "UPDATE `home` SET `comunicado` = ? WHERE `home`.`id_home` = ?";
      
        var values = [this.Comunicado,1];
      
        var rows = await conexao.ExecutaComando(sql, values);
      
        return true;
      }


}

module.exports = HomeModel;