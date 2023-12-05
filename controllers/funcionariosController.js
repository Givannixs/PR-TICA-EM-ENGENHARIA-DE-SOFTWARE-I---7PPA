const FuncionariosModel = require("../models/funcionariosModel");

class FuncionariosController {

    async listarView(req, res) {
        let prod = new FuncionariosModel();
        let lista = await prod.listarFuncionarios();
        res.render('funcionarios/listar', {lista: lista});
    }

    async listarJson(req, res) {
        let prod = new FuncionariosModel();
        let lista = await prod.listarFuncionarios();
        res.send(lista);
    }

    async buscarFuncionarios(req, res) {
        let funcionario = new FuncionariosModel();
        funcionario.funcionarioNome= req.body.busca;
        let lista = await funcionario.buscarFuncionarios();
        res.render('funcionarios/listar', {lista: lista});
    }


    async deletarFuncionarios(req, res) {
        console.log(req.params.id);
        //req.params.cpf
        let funcionario = new FuncionariosModel();
        let retorno = await funcionario.deletarFuncionarios(req.params.id);
        let lista = await funcionario.listarFuncionarios();
        res.render('funcionarios/listar', {lista: lista});
        
    }


    async cadastrarFuncionarios(req, res) {
        console.log(req.body);
        let funcionario = new FuncionariosModel();


        funcionario.funcionarioCPF = req.body.funcionarioCPF;
        funcionario.funcionarioNome= req.body.funcionarioNome;
        funcionario.funcionarioCargo=req.body.cargo_idCargo;
        funcionario.funcionarioEscala=req.body.funcionarioEscala;
        funcionario.funcionarioDepartamento=req.body.departamento_idDepartamento;
        funcionario.funcionarioTelefone=req.body.funcionarioTelefone;
        funcionario.dataAdmissao=req.body.dataAdmissao;
        funcionario.funcionarioEmail=req.body.funcionarioEmail;
        funcionario.funcionarioSenha=req.body.funcionarioSenha;

        let retorno = await funcionario.cadastrarFuncionarios();
        let lista = await funcionario.listarFuncionarios();
        res.render('funcionarios/listar', {lista: lista});
    }

    async alterarFuncionarios(req, res) {
        
        console.log(req.body);
        let funcionario = new FuncionariosModel();

        funcionario.idFuncionario = req.body.idFuncionario;
        funcionario.funcionarioCPF = req.body.funcionarioCPF;
        funcionario.funcionarioNome= req.body.funcionarioNome;
        //funcionario.funcionarioCargo=req.body.cargo_idCargo;
        funcionario.funcionarioEscala=req.body.funcionarioEscala;
       // funcionario.funcionarioDepartamento=req.body.departamento_idDepartamento;
        funcionario.funcionarioTelefone=req.body.funcionarioTelefone;
       // funcionario.dataAdmissao=req.body.dataAdmissao;
        funcionario.funcionarioEmail=req.body.funcionarioEmail;
        funcionario.funcionarioSenha=req.body.funcionarioSenha;
       

        let retorno = await funcionario.alterarFuncionarios();
        let lista = await funcionario.listarFuncionarios();
        res.render('funcionarios/listar', {lista: lista});
    }
}

module.exports = FuncionariosController;