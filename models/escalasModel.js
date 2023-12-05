const Database = require('../db/database');

const conexao = new Database();
class EscalasModel {

    #idEscala;
    #nomeEscala;
    #horarioEntrada;
    #entradaRepouso;
    #saidaRepouso;
    #horarioSaida;
 

    get idEscala() { return this.#idEscala; } set idEscala(idEscala) {this.#idEscala = idEscala;}
    get nomeEscala() { return this.#nomeEscala; } set nomeEscala(nomeEscala) {this.#nomeEscala = nomeEscala;}
    get horarioEntrada() { return this.#horarioEntrada; } set horarioEntrada(horarioEntrada) {this.#horarioEntrada = horarioEntrada;}
    get entradaRepouso() { return this.#entradaRepouso; } set entradaRepouso(entradaRepouso) {this.#entradaRepouso = entradaRepouso;}
    get saidaRepouso() { return this.#saidaRepouso; } set saidaRepouso(saidaRepouso) {this.#saidaRepouso = saidaRepouso;}
    get horarioSaida() { return this.#horarioSaida; } set horarioSaida(horarioSaida) {this.#horarioSaida = horarioSaida;}


    constructor(idEscala, nomeEscala, horarioEntrada, entradaRepouso, saidaRepouso, horarioSaida) {
        this.#idEscala = idEscala
        this.#nomeEscala = nomeEscala
        this.#horarioEntrada = horarioEntrada
        this.#entradaRepouso = entradaRepouso
        this.#saidaRepouso = saidaRepouso
        this.#horarioSaida = horarioSaida

   
    }


    async listarEscalas() {

        let sql = 'SELECT * FROM `escaladetrabalho`';
        
        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new EscalasModel(row['idEscala'], row['nomeEscala'], row['horarioEntrada'], row['entradaRepouso'], row['saidaRepouso'], row['horarioSaida']));
            }
        }

        return listaRetorno;
    }

    async deletarEscalas(id) {

        let sql = "DELETE FROM `escaladetrabalho` WHERE `escaladetrabalho`.`idEscala` = '"+id+"'";
        
        var rows = await conexao.ExecutaComando(sql);

        return true;
    }

    async cadastrarEscalas() {

        let sql = "INSERT INTO `escaladetrabalho`(`nomeEscala`, `horarioEntrada`, `entradaRepouso`, `saidaRepouso`, `horarioSaida`) VALUES ('"+this.#nomeEscala+"', '"+this.#horarioEntrada+"', '"+this.#entradaRepouso+"', '"+this.#saidaRepouso+"', '"+this.#horarioSaida+"')";
        
        var rows = await conexao.ExecutaComando(sql);

        return true;
    }

    async buscarEscalas() {

        let sql = "SELECT * FROM `escaladetrabalho` WHERE `nomeEscala` LIKE '%" + this.nomeEscala + "%' ORDER BY `escaladetrabalho`.`nomeEscala` ASC";

        
        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new EscalasModel(row['idEscala'], row['nomeEscala'], row['horarioEntrada'], row['entradaRepouso'], row['saidaRepouso'], row['horarioSaida']));
                
                
            }
        }

        return listaRetorno;
    }



    async alterarEscalas() {
        let sql = "UPDATE `escaladetrabalho` SET `nomeEscala` = ?, `horarioEntrada` = ?, `entradaRepouso` = ?, `saidaRepouso` = ?, `horarioSaida` = ?  WHERE `escaladetrabalho`.`idEscala` = ?";
      
        var values = [this.nomeEscala, this.horarioEntrada, this.entradaRepouso, this.saidaRepouso, this.horarioSaida, this.idEscala];
      
        var rows = await conexao.ExecutaComando(sql, values);
      
        return true;
    }
    


}

module.exports = EscalasModel;