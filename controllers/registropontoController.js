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


   /* async deletarResgistroponto(req, res) {
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
        
        
    }*/

    async cadastrarResgistroponto(req, res) {
        
        let registraponto = new ResgistrapontoModel();
        //registraponto.idregistroPonto=req.body.idregistroPonto;
        registraponto.entrada=req.body.entrada;
        registraponto.entradaRepouso=req.body.entradaRepouso;
        registraponto.saidaRepouso=req.body.saidaRepouso;
        registraponto.saida=req.body.saida;
        registraponto.data=req.body.data;
        registraponto.funcionario_idFuncionario=req.body.funcionario_idFuncionario;

        let retorno = await registraponto.cadastrarResgistroponto();
        let lista = await registraponto.listarResgistroponto();
       // res.render('registroponto/listar', {lista: lista});
        return true;
        
    }


    /*async buscarResgistroponto(req, res) {
        let registraponto = new ResgistrapontoModel();
        registraponto.funcionarioNome= req.body.busca;
        let lista = await registraponto.buscarResgistroponto();
        res.render('registroponto/listar', {lista: lista});
    }*/

    async alterarResgistroponto(req, res) {
        
        console.log(req.body.idregistroPonto);
        let registraponto = new ResgistrapontoModel();

       
        registraponto.idregistroPonto=req.body.idregistroPonto;
        //registraponto.entrada=req.body.entrada;
        registraponto.entradaRepouso=req.body.entradaRepouso;
        registraponto.saidaRepouso=req.body.saidaRepouso;
        registraponto.saida=req.body.saida;
        //registraponto.data=req.body.data;
        registraponto.funcionario_idFuncionario=req.body.funcionario_idFuncionario;

        let retorno = await registraponto.alterarResgistroponto();
        //let lista = await registraponto.listarResgistroponto();
        //res.render('registroponto/listar', {lista: lista});
        return true;
    }





    //controle registro ponto admin

    async listarViewadmin(req, res) {
        console.log('view admin')
        let registraponto = new ResgistrapontoModel();
        let lista = await registraponto.listarResgistropontoadmin();
       
        res.render('registropontoadmin/listar', {lista: lista});
    }

   async listarJsonadmin(req, res) {
        let registraponto = new ResgistrapontoModel();
        let lista = await registraponto.listarResgistroponto();
       
        var retorno=[];
        for (var index = 0; index < lista.length; index++) 
        {   retorno.push([lista[index].idEscala,lista[index].idregistroPonto]) ;
           
        }
        console.log(retorno);
        res.send(retorno);
    }
    
    async buscarResgistroponto(req, res) {
        let registraponto = new ResgistrapontoModel();
        registraponto.funcionario_idFuncionario=req.headers.cookie.split('=')[1];
        registraponto.funcionarioNome= req.busca;
        registraponto.entrada =req.body.dataInicio;
        registraponto.saida = req.body.dataFinal;
        
        let lista = await registraponto.buscarResgistroponto();
        res.render('registroponto/listar', {lista: lista});
    }


    async deletarResgistropontoadmin(req, res) {
        console.log(req.params.id);
        let registraponto = new ResgistrapontoModel();
        let retorno = await registraponto.deletarResgistropontoadmin(req.params.id);

        if(retorno == true)
        {
            let lista = await registraponto.listarResgistropontoadmin();
            res.render('registropontoadmin/listar', {lista: lista});
        }

        else
        {
            res.send('<script>alert("Não foi possível excluir o registro pois existem um ou mais registros vinculados a ele."); window.location.href = "/registrapontos"; </script>');
        }
        
        
    }

    async cadastrarResgistropontoadmin(req, res) {
        console.log(req.body);
        let registraponto = new ResgistrapontoModel();

        registraponto.idregistroPonto=req.body.idregistroPonto;
        registraponto.dataHoraEntrada=req.body.dataHoraEntrada;
        registraponto.dataHoraSaida=req.body.dataHoraSaida;
        registraponto.funcionario_idFuncionario=req.body.funcionario_idFuncionario;
        

       

        let retorno = await registraponto.cadastrarResgistroponto();
        let lista = await registraponto.listarResgistroponto();
        res.render('registropontoadmin/listar', {lista: lista});
    }


    async buscarResgistropontoadmin(req, res) {
        let registraponto = new ResgistrapontoModel();
        registraponto.funcionarioNome= req.body.busca;
        registraponto.entrada =req.body.dataInicio;
        registraponto.saida = req.body.dataFinal;
        
        let lista = await registraponto.buscarResgistropontoadmin();
        res.render('registropontoadmin/listar', {lista: lista});
    }

    async alterarResgistropontoadmin(req, res) {
        
        console.log(req.body);
        let registraponto = new ResgistrapontoModel();

       
        registraponto.idregistroPonto= req.body.idregistroPonto;
        registraponto.entrada= req.body.entrada;
        registraponto.entradaRepouso= req.body.entradaRepouso;
        registraponto.saidaRepouso= req.body.saidaRepouso;
        registraponto.saida= req.body.saida;
        registraponto.funcionario_idFuncionario= req.body.funcionario_idFuncionario;
        registraponto.observacao= req.body.observacao;
       
       

        let retorno = await registraponto.alterarResgistropontoadmin();
        let lista = await registraponto.listarResgistropontoadmin();
        res.render('registropontoadmin/listar', {lista: lista});
    }

}

module.exports = ResgistrapontoController;