const ResgistrapontoModel = require("../models/registropontoModel");

class ResgistrapontoController {

    async listarView(req, res) {
        let registraponto = new ResgistrapontoModel();
        registraponto.funcionario_idFuncionario=req.headers.cookie.split('=')[1];
        let lista = await registraponto.listarResgistroponto();
       
        res.render('registroponto/listar', {lista: lista});
    }

    async listarJson(req, res) {
        let registraponto = new ResgistrapontoModel();
        let lista = await registraponto.listarResgistroponto();
       
        var retorno=[];
        for (var index = 0; index < lista.length; index++) 
        {   retorno.push([lista[index].idEscala,lista[index].idregistroPonto]) ;
           
        }
        console.log(retorno);
        res.send(retorno);
    }


    async deletarResgistroponto(req, res) {
        console.log(req.params.id);
        let registraponto = new ResgistrapontoModel();
        let retorno = await registraponto.deletarResgistroponto(req.params.id);

        if(retorno == true)
        {
            let lista = await registraponto.listarResgistroponto();
            res.render('registroponto/listar', {lista: lista});
        }

        else
        {
            res.send('<script>alert("Não foi possível excluir o registro pois existem um ou mais registros vinculados a ele."); window.location.href = "/registrapontos"; </script>');
        }
        
        
    }

    async cadastrarResgistroponto(req, res) {
        console.log(req.body);
        let registraponto = new ResgistrapontoModel();

        registraponto.idregistroPonto=req.body.idregistroPonto;
        registraponto.entrada=req.body.entrada;
        registraponto.entradaRepouso=req.body.entradaRepouso;
        registraponto.saidaRepouso=req.body.saidaRepouso;
        registraponto.saida=req.body.saida;
        registraponto.data=req.body.data;
        registraponto.funcionario_idFuncionario=req.body.funcionario_idFuncionario;

        let retorno = await registraponto.cadastrarResgistroponto();
        let lista = await registraponto.listarResgistroponto();
        res.render('registroponto/listar', {lista: lista});
    }


    async buscarResgistroponto(req, res) {
        let registraponto = new ResgistrapontoModel();
        registraponto.funcionarioNome= req.body.busca;
        let lista = await registraponto.buscarResgistroponto();
        res.render('registroponto/listar', {lista: lista});
    }

    async alterarResgistroponto(req, res) {
        
        console.log(req.body);
        let registraponto = new ResgistrapontoModel();

       
        registraponto.idregistroPonto=req.body.idregistroPonto;
        registraponto.entrada=req.body.entrada;
        registraponto.entradaRepouso=req.body.entradaRepouso;
        registraponto.saidaRepouso=req.body.saidaRepouso;
        registraponto.saida=req.body.saida;
        registraponto.data=req.body.data;
        registraponto.funcionario_idFuncionario=req.body.funcionario_idFuncionario;

        let retorno = await registraponto.alterarResgistroponto();
        let lista = await registraponto.listarResgistroponto();
        res.render('registroponto/listar', {lista: lista});
    }

}

module.exports = ResgistrapontoController;