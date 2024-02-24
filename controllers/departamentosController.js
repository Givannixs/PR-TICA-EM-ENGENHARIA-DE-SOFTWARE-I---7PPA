const DepartamentosModel = require("../models/departamentosModel");

class DepartamentosController {

    async listarView(req, res) {
        let departamento = new DepartamentosModel();
        let lista = await departamento.listarDepartamentos();
        res.render('departamentos/listar', {lista: lista});
    }

    async listarJson(req, res) {
        let departamento = new DepartamentosModel();
        let lista = await departamento.listarDepartamentos();
        var retorno=[];
        for (var index = 0; index < lista.length; index++) 
        {  retorno.push([lista[index].idDepartamento,lista[index].nomeDepartamento]) ;
       
        }
        res.send(retorno);
    }


    async deletarDepartamentos(req, res) {
        console.log(req.params.id);
        let departamento = new DepartamentosModel();
        let retorno = await departamento.deletarDepartamentos(req.params.id);

        if(retorno == true)
        {let lista = await departamento.listarDepartamentos();
        res.render('departamentos/listar', {lista: lista});}

        else
        {                   
            res.send('<script>alert("Não foi possível excluir o registro pois existem um ou mais registros vinculados a ele."); window.location.href = "/departamentos"; </script>');
        }
        
    }

    async cadastrarDepartamentos(req, res) {
        console.log(req.body);
        let departamento = new DepartamentosModel();

        departamento.nomeDepartamento = req.body.nomeDepartamento;

        let retorno = await departamento.cadastrarDepartamentos();
        let lista = await departamento.listarDepartamentos();
        res.render('departamentos/listar', {lista: lista});
    }


    async buscarDepartamentos(req, res) {
        let departamento = new DepartamentosModel();
        departamento.nomeDepartamento= req.body.busca;
        let lista = await departamento.buscarDepartamentos();
        res.render('departamentos/listar', {lista: lista});
    }

    async alterarDepartamentos(req, res) {
        
        console.log(req.body);
        let departamento = new DepartamentosModel();

        departamento.idDepartamento = req.body.idDepartamento;
        departamento.nomeDepartamento= req.body.nomeDepartamento;
       

        let retorno = await departamento.alterarDepartamentos();
        let lista = await departamento.listarDepartamentos();
        res.render('departamentos/listar', {lista: lista});
    }

}

module.exports = DepartamentosController;