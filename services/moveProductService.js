//.services/moveProductService.js

//const moveProduct = require("../models/moveProduct");
const { all } = require("../routes");

class moveProductService{
    constructor(moveProductModel) {
        this.MoveProduct = moveProductModel;
    }

    async create(depositId, productId, movementType, amount, unitPrice, movementDate) {
        try {
            const newMoveProduct = await this.MoveProduct.create(
                {
                    depositId: depositId,
                    productId: productId,
                    movementType: movementType,
                    amount: amount,
                    unitPrice: unitPrice,
                    movementDate: movementDate
                }
            );
            return newMoveProduct ? newMoveProduct : null;
            
        } catch (error) {
            throw error;
        }
    }

    async findMovementByProduct(productId){
        try { 
            const IdFindMovementByProduct = await this.MoveProduct.findAll();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = moveProductService;