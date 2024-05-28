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
}
module.exports = moveProductController;