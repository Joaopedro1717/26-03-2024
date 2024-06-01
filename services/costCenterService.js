// .services/costCenterService.js

class costCenterService {
    
    constructor(costCenterModel) {
        this.costCenterModel = costCenterModel;
    }

    async create(code, balance){
        try {
            if (balance <= 0) {
                throw new Error('Balance must be greater than 0');
            }

            const newCostCenter = await this.costCenterModel.create(
                {
                    code: code,
                    balance: balance
                }
            );

            return newCostCenter ? newCostCenter : null;

        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

module.exports = costCenterService
