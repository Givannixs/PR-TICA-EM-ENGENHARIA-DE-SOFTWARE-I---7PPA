const CargosModel = require("../models/cargosModel");

class CargosController {

    async listarView(req, res) {
        let cargo = new CargosModel();
        let lista = await cargo.listarCargos();
        res.render('cargos/listar', {lista: lista});
    }

    async listarJson(req, res) {
        let cargo = new CargosModel();
        let lista = await cargo.listarCargos();
       
        var retorno=[];
        for (var index = 0; index < lista.length; index++) 
        {   retorno.push([lista[index].idCargo,lista[index].nomeCargo,lista[index].departamento_idDepartamento,lista[index].nomeDepartamento]) ;
           
        }
        console.log(retorno);
        res.send(retorno);
    }


    async deletarCargos(req, res) {
        console.log(req.params.id);
        //req.params.cpf
        let cargo = new CargosModel();
        let retorno = await cargo.deletarCargos(req.params.id);
        let lista = await cargo.listarCargos();
        res.render('cargos/listar', {lista: lista});
        
    }

    async cadastrarCargos(req, res) {
        console.log(req.body);
        let cargo = new CargosModel();

        cargo.nomeCargo = req.body.nomeCargo;
        cargo.departamento_idDepartamento= req.body.departamento_idDepartamento;
       

        let retorno = await cargo.cadastrarCargos();
        let lista = await cargo.listarCargos();
        res.render('cargos/listar', {lista: lista});
    }


    async buscarCargos(req, res) {
        let cargo = new CargosModel();
        cargo.nomeCargo= req.body.busca;
        let lista = await cargo.buscarCargos();
        res.render('cargos/listar', {lista: lista});
    }

    async alterarCargos(req, res) {
        
        console.log(req.body);
        let cargo = new CargosModel();

        cargo.idCargo = req.body.idCargo;
        cargo.nomeCargo= req.body.nomeCargo;
        cargo.departamento_idDepartamento=req.body.departamentoalt;
       

        let retorno = await cargo.alterarCargos();
        let lista = await cargo.listarCargos();
        res.render('cargos/listar', {lista: lista});
    }

}

module.exports = CargosController;