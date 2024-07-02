// ./services/movementBillToReceiveService.js
const moment = require('moment');

class movementBillToReceiveService {
    constructor(movementBillToReceiveModel){
        this.MovementBillToReceive = movementBillToReceiveModel;
    }

    async create(titleId, movementType, movementPrice, fineValue, interestValue){
        try {
            const movementDate = moment().format('YYYY-MM-DD');

            const newMovement = await this.MovementBillToReceive.create(
                {
                    titleId: titleId,
                    movementDate: movementDate,
                    movementType: movementType,
                    movementPrice: movementPrice,
                    fineValue: fineValue,
                    interestValue: interestValue
                }
            );

            return newMovement ? newMovement : null;
        } catch (error) {
            console.error("Erro ao criar movimento de compras a receber", error);
            throw error;
        }
    }
}

module.exports = movementBillToReceiveService