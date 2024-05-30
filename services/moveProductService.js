//.services/moveProductService.js

//const moveProduct = require("../models/moveProduct");
const { all } = require("../routes");
const { Op } = require('sequelize');
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
            const IdFindMovementByProduct = await this.MoveProduct.findAll({
                where: {
                    productId: productId
                }               
            });
            return IdFindMovementByProduct ? IdFindMovementByProduct : null;
        } catch (error) {
            throw error;
        }
    }

    async findMovementByDeposit(depositId){
        try { 
            const IdFindMovementByDeposit = await this.MoveProduct.findAll({
                where: {
                    depositId: depositId
                }               
            });
            return IdFindMovementByDeposit ? IdFindMovementByDeposit : null;
        } catch (error) {
            throw error;
        }
    }

    async findMovementByDate(startDate, endDate){
        try {
            const MovementsByDate = await this.MoveProduct.findAll({
                where: {
                    movementDate: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            });
            return MovementsByDate;           
        } catch (error) {
            throw error;
        }
    }
}

module.exports = moveProductService;