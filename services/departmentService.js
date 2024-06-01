// .services/departmentService.js

class departmentService{
    
    constructor(departmentModel, costCenterModel) {
        this.departmentModel = departmentModel;
        this.costCenterModel = costCenterModel;
    }

    async create(name, codeCostCenter, balanceCostCenter) {

        try {
            const newCostCenter = await this.costCenterModel.create(
                {
                    code: codeCostCenter,
                    balance: balanceCostCenter
                
            });

            const newDepartment = await this.departmentModel.create(
                {
                    name: name,
                    costCenterId: newCostCenter.id
            });

            return newDepartment ? newDepartment : null

        } catch (error) {
            throw error;
        }
    }
}

module.exports = departmentService