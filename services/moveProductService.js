//.services/moveProductService.js

//const moveProduct = require("../models/moveProduct");
const { all } = require("../routes");
const { Op } = require('sequelize');
class moveProductService{
    constructor(moveProductModel, productModel, depositModel) {
        this.MoveProduct = moveProductModel;
        this.Product = productModel;
        this.Deposit = depositModel;
    }

    async create(depositId, productId, movementType, amount, unitPrice, movementDate) {
        try {
            // Verificação da existência do depósito
            const depositExists = await this.Deposit.findByPk(depositId);
            if (!depositExists) {
                throw new Error(`Deposit with ID ${depositId} does not exist.`);
            }
            // Verificação da existência do produto
            const productExists = await this.Product.findByPk(productId);
            if (!productExists) {
                throw new Error(`Product with ID ${productId} does not exist.`);
            }
            // Validação do tipo de movimentação
            const validMovementTypes = ['entrada', 'saída'];
            if (!validMovementTypes.includes(movementType)) {
                throw new Error(`Invalid movement type. Allowed types are ${validMovementTypes.join(', ')}.`);
            }
            // Validação da quantidade
            if (amount <= 0) {
                throw new Error('Amount must be a positive number greater than zero.');
            }

            // Validação do preço unitário
            if (unitPrice <= 0) {
                throw new Error('Unit price must be a positive number greater than zero.');
            }

            // Validação da data de movimentação
            const movementDateObject = new Date(movementDate);
            if (isNaN(movementDateObject.getTime())) {
                throw new Error('Invalid movement date.');
            }
            if (movementDateObject > new Date()) {
                throw new Error('Movement date cannot be in the future.');
            }

            const newMoveProduct = await this.MoveProduct.create(
                {
                    depositId: depositId,
                    productId: productId,
                    movementType: movementType,
                    amount: amount,
                    unitPrice: unitPrice,
                    movementDate: movementDate
                });
            
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