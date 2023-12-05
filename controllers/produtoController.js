const ProdutoModel = require("../models/produtoModel");

class ProdutoController {

    async listarView(req, res) {
        let prod = new ProdutoModel();
        let lista = await prod.listarProdutos();
        res.render('produto/listar', {lista: lista});
    }

    async listarJson(req, res) {
        let prod = new ProdutoModel();
        let lista = await prod.listarProdutos();
        res.send(lista);
    }
}

module.exports = ProdutoController;