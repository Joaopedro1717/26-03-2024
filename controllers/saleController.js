// ./controllers/saleController.js

class saleController {
    constructor(saleService) {
        this.saleService = saleService;
    }

    async create(req, res) {
        const {productName, quantity, clientCpf, installment, salePrice} = req.body;

        try {
            const newSale = await this.saleService.create(productName, quantity, clientCpf, installment, salePrice);
            res.status(200).json(newSale);
        } catch(error){
            res.status(500).json({error:`Não foi possível criar uma nova venda`})
        }

    }
}
module.exports = saleController;