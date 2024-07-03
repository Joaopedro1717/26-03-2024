// .controllers/moveProductController.js 

class moveProductController{
    constructor(moveProductService){
        this.moveProductService = moveProductService;
    }

    async createEntrance(req, res) {
        const {depositName, productName, movementSubType, amountEntrance, unitPrice, movementDate} = req.body;
        try {
            
            const newEntranceMovement = await this.moveProductService.createEntrance(depositName, productName, movementSubType, amountEntrance, unitPrice, movementDate);
            res.status(200).json(newEntranceMovement);
        } catch (error) {
            res.status(500).json({error: `Erro ao criar novo movimento de entrada.`});
        }
    }

    async createExit(req, res) {
        const {depositName, productName, movementSubType, amountExit, movementDate} = req.body;
        try {
            
            const newExitMovement = await this.moveProductService.createExit(depositName, productName, movementSubType, amountExit, movementDate);
            res.status(200).json(newExitMovement);
        } catch (error) {
            res.status(500).json({error: `Erro ao criar novo movimento de saída.`});
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
            res.status(500).json({error: `Error ao exibir movimentos pelo Id do deposito`});
        }
    }

    async findMovementByDate(req, res) {
        const { startDate, endDate } = req.body;
        try {
            const MovementsByDate = await this.moveProductService.findMovementByDate(startDate, endDate);
            res.status(200).json(MovementsByDate);
        } catch (error) {
            res.status(500).json({error: `Erro ao exibir movimentos pela data`});
        }
    }
}
module.exports = moveProductController;