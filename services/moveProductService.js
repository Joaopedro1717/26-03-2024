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

    async getAmount(productId, depositId){
        const lastMovement = await this.MoveProduct.findOne({
            where: {
                productId: productId,
                depositId: depositId
            },
            order: [['movementDate', 'DESC']]
        });

        return lastMovement ? lastMovement.amount : 0;
    }

    async createEntrance(depositName, productName, movementSubType, amountEntrance, unitPrice, movementDate){
        try {
            
            const product = await this.Product.findOne({where: { nome: productName }});
            
            if(product == null) {
                console.error("Produto não encontrado");
            }

            const deposit = await this.Deposit.findOne({where: { nome: depositName}});

            if(deposit == null) {
                console.error("Deposito não encontrado");
            }

            const movementType = "entrada";

            let amount = await this.getAmount(product.id, deposit.id);

            if(amountEntrance <= 0) {
                console.log("Não é possível gravar valores abaixos ou iguais a 0");
            }

            amount += amountEntrance;

            const newEntranceMovement = await this.MoveProduct.create(
                {
                    productId: product.id,
                    depositId: deposit.id,
                    movementType: movementType,
                    movementSubType: movementSubType,
                    amount: amount,
                    amountEntranceExit: amountEntrance,
                    unitPrice: unitPrice,
                    movementDate: movementDate
                }
            );

            return newEntranceMovement ? newEntranceMovement : null;
        } catch (error) {
            console.error(error);
        }
    }

    async createExit(depositName, productName, movementSubType, amountExit, movementDate) {
        try {
            const product = await this.Product.findOne({ where: { nome: productName}});
            if (product == null){
                console.error("Produto não encontrado");
            }

            const deposit = await this.Deposit.findOne({ where: { nome: depositName}});
            if(deposit == null){
                console.error("Depósito não encontrado")
            }

            const movementType = "saída";

            let amount = await this.getAmount(product.id, deposit.id);

            if(amountExit <= 0) {
                console.log("Não é possível retirar valores maiores que a quantidade atual");
            }

            amount += amountExit;

            const lastMovement = await this.MoveProduct.findOne({
                where: {
                    productId: product.id,
                    depositId: deposit.id
                },
                order: [['movementDate', 'DESC']]
            });

            const newExitMovement = await this.MoveProduct.create({
                productId: product.id,
                depositId: deposit.id,
                movementType: movementType,
                movementSubType: movementSubType,
                amount: amount,
                amountEntranceExit: amountExit,
                unitPrice: lastMovement.unitPrice,
                movementDate: movementDate
            });

            return newExitMovement ? newExitMovement : null;
        } catch (error) {
            console.error(error);
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