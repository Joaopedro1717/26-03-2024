// services/movementBillToPay.js

const moment = require('moment');


class movementBillToPayService{

    constructor(movementBillToPayModel) {
    this.MovementBillToPay = movementBillToPayModel;
    }

    async create(titleId, movementType, movementPrice, fineValue, interestValue) {
        try {
            const movementDate = moment().format('YYYY-MM-DD');

            const newMovementBillToPay = this.MovementBillToPay.create(
                {
                    titleId: titleId,
                    movementDate: movementDate,
                    movementType: movementType,
                    movementPrice: movementPrice,
                    fineValue: fineValue,
                    interestValue: interestValue
                }
            );

            return newMovementBillToPay ? newMovementBillToPay : null;
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = movementBillToPayService;