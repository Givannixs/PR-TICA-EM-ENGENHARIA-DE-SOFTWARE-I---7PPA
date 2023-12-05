const Database = require('../db/database');

const conexao = new Database();
class ProdutoModel {

    #produtoId;
    #produtoCodigo;
    #produtoNome;
    #produtoQuantidade;
    #categoriaId;
    #categoriaNome;
    #marcaId;
    #marcaNome;

    get produtoId() { return this.#produtoId; } set produtoId(produtoId) {this.#produtoId = produtoId;}
    get produtoCodigo() { return this.#produtoCodigo; } set produtoCodigo(produtoCodigo) {this.#produtoCodigo = produtoCodigo;}
    get produtoNome() { return this.#produtoNome; } set produtoNome(produtoNome) {this.#produtoNome = produtoNome;}
    get produtoQuantidade() { return this.#produtoQuantidade; } set produtoQuantidade(produtoQuantidade) {this.#produtoQuantidade = produtoQuantidade;}
    get categoriaId() { return this.#categoriaId; } set categoriaId(categoriaId) {this.#categoriaId = categoriaId;}
    get categoriaNome() { return this.#categoriaNome; } set categoriaNome(categoriaNome) {this.#categoriaNome = categoriaNome;}
    get marcaId() { return this.#marcaId; } set marcaId(marcaId) {this.#marcaId = marcaId;}
    get marcaNome() { return this.#marcaNome; } set marcaNome(marcaNome) {this.#marcaNome = marcaNome;}

    constructor(produtoId, produtoCodigo, produtoNome, produtoQuantidade, categoriaId, marcaId, categoriaNome, marcaNome) {
        this.#produtoId = produtoId
        this.#produtoCodigo = produtoCodigo
        this.#produtoNome = produtoNome
        this.#produtoQuantidade = produtoQuantidade
        this.#categoriaId = categoriaId;
        this.#categoriaNome = categoriaNome;
        this.#marcaId = marcaId;
        this.#marcaNome = marcaNome;
    }


    async listarProdutos() {

        let sql = 'select * from tb_produto p inner join tb_categoria c on p.cat_id = c.cat_id inner join tb_marca m on p.mar_id = m.mar_id';
        
        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new ProdutoModel(row['prd_id'], row['prd_cod'], row['prd_nome'], row['prd_quantidade'], row['cat_id'], row['mar_id'], row['cat_nome'], row['mar_nome']));
            }
        }

        return listaRetorno;
    }

}

module.exports = ProdutoModel;