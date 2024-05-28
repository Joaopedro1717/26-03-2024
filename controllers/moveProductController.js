// .controllers/moveProductController.js 

class moveProductController{
    constructor(moveProductService){
        this.moveProductService = moveProductService;
    }

    async create(req, res, next) {
        const {depositId, productId, movementType, amount, unitPrice, movementDate} = req.body;
        try {

            const newMoveProduct = await this.moveProductService.create(depositId, productId, movementType, amount, unitPrice, movementDate);
            res.status(200).json(newMoveProduct);            
        } catch (error) {
            console.log(error);
            res.status(500).json({error: `Error ao criar nova movimentação de produto`});
        }
    }

    async findMovementByProduct(req, res) {
        const { productId } = req.body;
        try {
            const findMovementByProduct = await this.moveProductService.findMovementByProduct(productId);
            res.status(200).json(findMovementByProduct);
        } catch (error) {
            res.status(500).json({error: `Error ao exibir movimentos pelo Id do produto`});
        }
    }

    async findMovementByDeposit(req, res) {
        const { depositId } = req.body;
        try {
            const findMovementByDeposit = await this.moveProductService.findMovementByDeposit(depositId);
            res.status(200).json(findMovementByDeposit);
        } catch (error) {
            res.status(500).json({error: `Error ao exibir movementos pelo Id do deposito`});
        }
    }
}
module.exports = moveProductController;