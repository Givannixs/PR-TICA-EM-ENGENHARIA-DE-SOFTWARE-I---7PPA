const EscalasModel = require("../models/escalasModel");

class EscalasController {

    async listarView(req, res) {
        let escala = new EscalasModel();
        let lista = await escala.listarEscalas();
        res.render('escalas/listar', {lista: lista});
    }

    async listarJson(req, res) {
        let escala = new EscalasModel();
        let lista = await escala.listarEscalas();
       
        var retorno=[];
        for (var index = 0; index < lista.length; index++) 
        {   retorno.push([lista[index].idEscala,lista[index].nomeEscala]) ;
           
        }
        console.log(retorno);
        res.send(retorno);
    }


    async deletarEscalas(req, res) {
        console.log(req.params.id);
        let escala = new EscalasModel();
        let retorno = await escala.deletarEscalas(req.params.id);

        if(retorno == true)
        {
            let lista = await escala.listarEscalas();
            res.render('escalas/listar', {lista: lista});
        }

        else
        {
            res.send('<script>alert("Não foi possível excluir o registro pois existem um ou mais registros vinculados a ele."); window.location.href = "/escalas"; </script>');
        }
        
        
    }

    async cadastrarEscalas(req, res) {
        console.log(req.body);
        let escala = new EscalasModel();

        escala.nomeEscala=req.body.nomeEscala;
        escala.horarioEntrada=req.body.horarioEntrada;
        escala.entradaRepouso=req.body.entradaRepouso;
        escala.saidaRepouso=req.body.saidaRepouso;
        escala.horarioSaida=req.body.horarioSaida;

       

        let retorno = await escala.cadastrarEscalas();
        let lista = await escala.listarEscalas();
        res.render('escalas/listar', {lista: lista});
    }


    async buscarEscalas(req, res) {
        let escala = new EscalasModel();
        escala.nomeEscala= req.body.busca;
        let lista = await escala.buscarEscalas();
        res.render('escalas/listar', {lista: lista});
    }

    async alterarEscalas(req, res) {
        
        console.log(req.body);
        let escala = new EscalasModel();

        escala.idEscala = req.body.idEscala;
        escala.nomeEscala= req.body.nomeEscala;
        escala.horarioEntrada= req.body.horarioEntrada;
        escala.entradaRepouso= req.body.entradaRepouso;
        escala.saidaRepouso= req.body.saidaRepouso;
        escala.horarioSaida= req.body.horarioSaida;
       

        let retorno = await escala.alterarEscalas();
        let lista = await escala.listarEscalas();
        res.render('escalas/listar', {lista: lista});
    }

}

module.exports = EscalasController;