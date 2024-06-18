// controllers/proposalController.js

class proposalController {

    constructor(proposalService) {
        this.proposalService = proposalService;
    }

    async create(req, res, next) {

        const {productName, supplierName, proposalValue, proposalDate, buyer, expirationDate} = req.body;

        try {
            const newProposal = await this.proposalService.create(productName, supplierName, proposalValue, proposalDate, buyer, expirationDate);
            res.status(200).json(newProposal);
        } catch (error) {
            res.status(500).json({error: `Erro ao criar proposta`});
        }
    }
}
module.exports = proposalController;