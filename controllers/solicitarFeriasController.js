
class SolicitarFeriasController {

    constructor() {

    }

    solicitarFeriasView(req, res) {
        res.render('solicitarferias/listar', {});
    }
}


module.exports = SolicitarFeriasController;