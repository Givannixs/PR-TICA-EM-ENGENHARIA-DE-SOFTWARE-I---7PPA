const Database = require('../db/database');

const conexao = new Database();

class SolicitarFeriasModel {

    #idsolicitacaoFerias;
    #datasolicitacao;
    #datainicio;
    #datatermino;
    #status;
    #motivo;
    #respostaGestor;
    #anoReferencia;
    #funcionario_idFuncionario;
    #diasFeriasDisponiveis;
    #funcionarioNome;
    #dataAdmissao;

    get idsolicitacaoFerias() { return this.#idsolicitacaoFerias; } set idsolicitacaoFerias(idsolicitacaoFerias) { this.#idsolicitacaoFerias = idsolicitacaoFerias; }
    get datasolicitacao() { return this.#datasolicitacao; } set datasolicitacao(datasolicitacao) { this.#datasolicitacao = datasolicitacao; }
    get datainicio() { return this.#datainicio; } set datainicio(datainicio) { this.#datainicio = datainicio; }
    get datatermino() { return this.#datatermino; } set datatermino(datatermino) { this.#datatermino = datatermino; }
    get status() { return this.#status; } set status(status) { this.#status = status; }
    get motivo() { return this.#motivo; } set motivo(motivo) { this.#motivo = motivo; }
    get respostaGestor() { return this.#respostaGestor; } set respostaGestor(respostaGestor) { this.#respostaGestor = respostaGestor; }
    get anoReferencia() { return this.#anoReferencia; } set anoReferencia(anoReferencia) { this.#anoReferencia = anoReferencia; }
    get funcionario_idFuncionario() { return this.#funcionario_idFuncionario; } set funcionario_idFuncionario(funcionario_idFuncionario) { this.#funcionario_idFuncionario = funcionario_idFuncionario; }
    get diasFeriasDisponiveis() { return this.#diasFeriasDisponiveis; } set diasFeriasDisponiveis(diasFeriasDisponiveis) { this.#diasFeriasDisponiveis = diasFeriasDisponiveis; }
    get funcionarioNome() { return this.#funcionarioNome; } set funcionarioNome(funcionarioNome) { this.#funcionarioNome = funcionarioNome; }
    get dataAdmissao() { return this.#dataAdmissao; } set dataAdmissao(dataAdmissao) { this.#dataAdmissao = dataAdmissao; }

    constructor(idsolicitacaoFerias, datasolicitacao, datainicio, datatermino, status, motivo, respostaGestor, anoReferencia, funcionario_idFuncionario, diasFeriasDisponiveis, funcionarioNome, dataAdmissao) {
        this.#idsolicitacaoFerias = idsolicitacaoFerias
        this.#datasolicitacao = datasolicitacao
        this.#datainicio = datainicio
        this.#datatermino = datatermino
        this.#status = status
        this.#motivo = motivo
        this.#respostaGestor = respostaGestor
        this.#anoReferencia = anoReferencia
        this.#funcionario_idFuncionario = funcionario_idFuncionario
        this.#diasFeriasDisponiveis = diasFeriasDisponiveis
        this.#funcionarioNome = funcionarioNome
        this.#dataAdmissao = dataAdmissao
    }

    async calcularDiasFeriasDisponiveis() {
        // Calcular o ano de referência com base na data de admissão
        console.log('Data de admissão:', this.#dataAdmissao);
        this.#anoReferencia = new Date(this.#dataAdmissao).getFullYear();
        console.log('Ano de referência inicial:', this.#anoReferencia);

        let hoje = new Date();

        // Verificar se o período concessivo do ano anterior se encerrou
        let ultimoDiaConcessivoAnoAnterior = new Date(this.#anoReferencia, new Date(this.#dataAdmissao).getMonth(), new Date(this.#dataAdmissao).getDate() - 1);
        if (hoje > ultimoDiaConcessivoAnoAnterior) {
            // Se o período concessivo do ano anterior já passou, avançamos para o próximo ano de referência
            this.#anoReferencia++;
        }
        console.log('Ano de referência após ajuste:', this.#anoReferencia);

        // Cálculo dos dias de férias disponíveis apenas para o ano de referência atual...
        let sql = `SELECT SUM(DATEDIFF(datatermino, datainicio) + 1) AS dias_solicitados
                   FROM solicitacaoferias
                   WHERE funcionario_idFuncionario = ? AND status = 'Aprovado' AND anoReferencia = ?;`;
        let values = [this.#funcionario_idFuncionario, this.#anoReferencia];
        let result = await conexao.ExecutaComando(sql, values);
        let diasSolicitados = result[0].dias_solicitados || 0;

        const umAnoEmMilissegundos = 365 * 24 * 60 * 60 * 1000;
        const anosDeServico = Math.floor((hoje - new Date(this.#dataAdmissao)) / umAnoEmMilissegundos);

        if (anosDeServico >= 1) {
            this.#diasFeriasDisponiveis = 30 - diasSolicitados; // 30 dias de férias após um ano de serviço
        } else {
            this.#diasFeriasDisponiveis = 0; // Sem direito a férias ainda
        }

        console.log('Dias de férias disponíveis:', this.#diasFeriasDisponiveis);

        // Atualização no banco de dados
        await this.atualizarDiasFeriasDisponiveisNoBancoDeDados();

        return this.#anoReferencia;
    }

    async atualizarDiasFeriasDisponiveisNoBancoDeDados() {
        let sql = "UPDATE funcionario SET diasFeriasDisponiveis = ? WHERE idFuncionario = ?";
        let values = [this.#diasFeriasDisponiveis, this.#funcionario_idFuncionario];

        try {
            await conexao.ExecutaComando(sql, values);
            console.log('Dias de férias disponíveis atualizados no banco de dados.');
            return true;
        } catch (error) {
            console.error('Erro ao atualizar os dias de férias disponíveis no banco de dados:', error);
            return false;
        }
    }

    async listarSolicitacaoFerias() {
        let sql = `SELECT feriasfuncionario.idsolicitacaoFerias, 
        feriasfuncionario.funcionario_idFuncionario,
        feriasfuncionario.datasolicitacao,
        feriasfuncionario.datainicio, 
        feriasfuncionario.datatermino,
        feriasfuncionario.status, 
        feriasfuncionario.motivo,
        feriasfuncionario.respostaGestor,
        feriasfuncionario.anoReferencia,
        fun.funcionarioNome,
        fun.diasFeriasDisponiveis,
        fun.dataAdmissao,
        fun.funcionarioStatus
        FROM solicitacaoferias AS feriasfuncionario
        INNER JOIN funcionario AS fun ON fun.idFuncionario = feriasfuncionario.funcionario_idFuncionario
        WHERE feriasfuncionario.funcionario_idFuncionario = ? AND fun.funcionarioStatus = 1
        ORDER BY feriasfuncionario.datainicio DESC;`;

        let values = [this.#funcionario_idFuncionario];
        var rows = await conexao.ExecutaComando(sql, values);
        console.log(rows);
        let listaRetorno = [];

        if (rows.length > 0) {
            for (let i = 0; i < rows.length; i++) {
                var row = rows[i];
                var solicitarFerias = new SolicitarFeriasModel(row['idsolicitacaoFerias'], row['datasolicitacao'], row['datainicio'], row['datatermino'], row['status'], row['motivo'], row['respostaGestor'], row['anoReferencia'], row['funcionario_idFuncionario'], row['diasFeriasDisponiveis'], row['funcionarioNome'], row['dataAdmissao']);
                await solicitarFerias.calcularDiasFeriasDisponiveis();
                listaRetorno.push(solicitarFerias);
            }
        }

        return listaRetorno;
    }

    async cadastrarSolicitacaoFerias() {
        // Buscar a data de admissão do funcionário no banco de dados
        let sqlDataAdmissao = "SELECT dataAdmissao FROM funcionario WHERE idFuncionario = ?";
        let valuesDataAdmissao = [this.#funcionario_idFuncionario];
        let resultDataAdmissao = await conexao.ExecutaComando(sqlDataAdmissao, valuesDataAdmissao);
        if (resultDataAdmissao.length > 0) {
            this.#dataAdmissao = resultDataAdmissao[0].dataAdmissao;
        } else {
            console.error('Data de admissão do funcionário não encontrada.');
            return false;
        }
    
        // Calcular o ano de referência
        let anoReferencia = await this.calcularDiasFeriasDisponiveis();
    
        // Insira o ano de referência junto com os outros dados da solicitação de férias
        let sql = "INSERT INTO `solicitacaoferias`(`datasolicitacao`, `datainicio`, `datatermino`, `status`, `motivo`, `funcionario_idFuncionario`, `anoReferencia`) VALUES (?, ?, ?, ?, ?, ?, ?)";
        let values = [this.#datasolicitacao, this.#datainicio, this.#datatermino, this.#status, this.#motivo, this.#funcionario_idFuncionario, anoReferencia];
    
        try {
            let result = await conexao.ExecutaComando(sql, values);
            console.log('id inserido: ' + result.insertId);
            return true;
        } catch (error) {
            console.error('Erro ao cadastrar solicitação de férias:', error);
            return false;
        }
    }
    

    async alterarSolicitacaoFerias() {
        let sql = "UPDATE `solicitacaoferias` SET `datasolicitacao` = ?, `datainicio` = ?,`datatermino` = ? WHERE `solicitacaoferias`.`idsolicitacaoFerias` = ?";

        let values = [this.#datasolicitacao, this.#datainicio, this.#datatermino, this.idsolicitacaoFerias];

        let rows = await conexao.ExecutaComando(sql, values);

        return true;
    }
}

module.exports = SolicitarFeriasModel;
