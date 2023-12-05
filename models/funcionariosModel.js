const Database = require('../db/database');

const conexao = new Database();
class FuncionariosModel {

    #idFuncionario;
    #funcionarioCPF;
    #funcionarioNome;
    #idCargo;
    #funcionarioCargo;
    #funcionarioEscala;
    #funcionarioDepartamento;
    #funcionarioTelefone;
    #dataAdmissao;
    #funcionarioEmail;
    #funcionarioSenha;

    get idFuncionario() { return this.#idFuncionario; } set idFuncionario(idFuncionario) {this.#idFuncionario = idFuncionario;}
    get funcionarioCPF() { return this.#funcionarioCPF; } set funcionarioCPF(funcionarioCPF) {this.#funcionarioCPF = funcionarioCPF;}
    get funcionarioNome() { return this.#funcionarioNome; } set funcionarioNome(funcionarioNome) {this.#funcionarioNome = funcionarioNome;}
    get idCargo() { return this.#idCargo; } set idCargo(idCargo) {this.#idCargo = idCargo;}
    get funcionarioCargo() { return this.#funcionarioCargo; } set funcionarioCargo(funcionarioCargo) {this.#funcionarioCargo = funcionarioCargo;}
    get funcionarioEscala() { return this.#funcionarioEscala; } set funcionarioEscala(funcionarioEscala) {this.#funcionarioEscala = funcionarioEscala;}
    get funcionarioDepartamento() { return this.#funcionarioDepartamento; } set funcionarioDepartamento(funcionarioDepartamento) {this.#funcionarioDepartamento = funcionarioDepartamento;}
    get funcionarioTelefone() { return this.#funcionarioTelefone; } set funcionarioTelefone(funcionarioTelefone) {this.#funcionarioTelefone = funcionarioTelefone;}
    get dataAdmissao() { return this.#dataAdmissao; } set dataAdmissao(dataAdmissao) {this.#dataAdmissao = dataAdmissao;}
    get funcionarioEmail() { return this.#funcionarioEmail; } set funcionarioEmail(funcionarioEmail) {this.#funcionarioEmail = funcionarioEmail;}
    get funcionarioSenha() { return this.#funcionarioSenha; } set funcionarioSenha(funcionarioSenha) {this.#funcionarioSenha = funcionarioSenha;}

    constructor(idFuncionario, funcionarioCPF, funcionarioNome, funcionarioCargo,funcionarioEscala, funcionarioDepartamento, funcionarioTelefone, dataAdmissao, funcionarioEmail, funcionarioSenha, idCargo) {
        this.#idFuncionario = idFuncionario;
        this.#funcionarioCPF = funcionarioCPF;
        this.#funcionarioNome = funcionarioNome;
        this.#idCargo = idCargo;
        this.#funcionarioCargo = funcionarioCargo;
        this.#funcionarioEscala = funcionarioEscala;
        this.#funcionarioDepartamento = funcionarioDepartamento;
        this.#funcionarioTelefone = funcionarioTelefone;
        this.#dataAdmissao = dataAdmissao;
        this.#funcionarioEmail = funcionarioEmail;
        this.#funcionarioSenha = funcionarioSenha;
    }


    async listarFuncionarios() {

        let sql = 'SELECT * FROM `funcionario` INNER JOIN `cargo` ON `funcionario`.`idCargo` = `cargo`.`idCargo` INNER JOIN `departamento` ON `funcionario`.`idDepartamento` = `departamento`.`idDepartamento` INNER JOIN `escaladetrabalho` ON `funcionario`.`idEscala` = `escaladetrabalho`.`idEscala`'

        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new FuncionariosModel(row['idFuncionario'], row['funcionarioCPF'], row['funcionarioNome'], row['nomeCargo'], row['nomeDepartamento'],row['nomeEscala'] , row['funcionarioTelefone'], row['dataAdmissao'], row['funcionarioEmail'], row['funcionarioSenha'], row['idCargo']));
            }
        }

        return listaRetorno;
    }



    async buscarFuncionarios() {
        let sql = "SELECT * FROM `funcionario` INNER JOIN departamento ON funcionario.idDepartamento = departamento.idDepartamento INNER JOIN escaladetrabalho ON funcionario.idEscala = escaladetrabalho.idEscala WHERE `funcionarioNome` LIKE '%"+this.funcionarioNome+"%' ORDER BY `funcionario`.`funcionarioNome` ASC";
        
        var rows = await conexao.ExecutaComando(sql);
    
        let listaRetorno = [];
    
        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new FuncionariosModel(row['idFuncionario'], row['funcionarioCPF'], row['funcionarioNome'], row['nomeCargo'], row['nomeDepartamento'],row['nomeEscala'] , row['funcionarioTelefone'], row['dataAdmissao'], row['funcionarioEmail'], row['funcionarioSenha'], row['idCargo']));
            }
        }
    
        return listaRetorno;
    }


    async deletarFuncionarios(id) {

        let sql = "DELETE FROM `funcionario` WHERE `funcionario`.`idFuncionario` = '"+id+"'";
        
        var rows = await conexao.ExecutaComando(sql);

        return true;
    }


    async autenticarFuncionario (usuario, senha) {
        const sql = "SELECT * FROM `funcionario` WHERE `funcionarioEmail` LIKE '"+usuario+"' AND `funcionarioSenha` LIKE '"+senha+"'";
       
        var row = await conexao.ExecutaComando(sql);
        
        if(row.length > 0)
            return row;
        else 
            return null;
    }
    
    async cadastrarFuncionarios() {
        // Primeiro, verificamos se os IDs de Departamento, Cargo e Escala existem
        const departamentoExists = await this.checkIfExists('departamento', 'idDepartamento', this.funcionarioDepartamento);
        const cargoExists = await this.checkIfExists('cargo', 'idCargo', this.funcionarioCargo);
        const escalaExists = await this.checkIfExists('escaladetrabalho', 'idEscala', this.funcionarioEscala);
    
        if (!departamentoExists || !cargoExists || !escalaExists) {
            throw new Error('IDs de Departamento, Cargo ou Escala não existem nas tabelas referenciadas.');
        }
    
        // Agora, podemos realizar a inserção
        let sql = "INSERT INTO `funcionario`(`funcionarioCPF`, `funcionarioNome`, `funcionarioTelefone`, `dataAdmissao`, `funcionarioEmail`, `funcionarioSenha`, `idDepartamento`, `idCargo`, `idEscala`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        var values = [
            this.funcionarioCPF,
            this.funcionarioNome,
            this.funcionarioTelefone,
            this.dataAdmissao,
            this.funcionarioEmail,
            this.#funcionarioSenha,
            this.funcionarioDepartamento,
            this.funcionarioCargo,
            this.funcionarioEscala
        ];
        
        var rows = await conexao.ExecutaComando(sql, values);
    
        return true;
    }
    
    async checkIfExists(table, column, value) {
        const sql = `SELECT 1 FROM \`${table}\` WHERE \`${column}\` = ? LIMIT 1`;
        const rows = await conexao.ExecutaComando(sql, [value]);
        return rows.length > 0;
    }

    async alterarFuncionarios() {
        // Verifica se a escala é válida antes de tentar a atualização
        const escalaExists = await this.checkIfExists('escaladetrabalho', 'idEscala', this.funcionarioEscala);
    
        if (!escalaExists) {
            throw new Error('ID da Escala não existe na tabela referenciada.');
        }
    
        let sql = "UPDATE `funcionario` SET `funcionarioCPF`=?,`funcionarioNome`=?,`funcionarioTelefone`=?,`funcionarioEmail`=?,`funcionarioSenha`=?,`idEscala`=? WHERE `funcionario`.`idFuncionario` = ?";
      
        var values = [this.funcionarioCPF, this.funcionarioNome, this.funcionarioTelefone, this.funcionarioEmail, this.funcionarioSenha,this.funcionarioEscala, this.idFuncionario];
      
        var rows = await conexao.ExecutaComando(sql, values);
    
        return true;
    }

}

module.exports = FuncionariosModel;