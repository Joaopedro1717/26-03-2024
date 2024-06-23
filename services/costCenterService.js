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

    async findCostCenterById(id) {
        const costCenterId = await this.costCenterModel.findOne({where: {id: id}});
        return costCenterId ? costCenterId : null;
    }
}

module.exports = costCenterService
