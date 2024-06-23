// .services/departmentService.js

class departmentService{
    
    constructor(departmentModel, costCenterModel, moveProductService, proposalService, purchaseService, billToPayService, proposalModel, productModel, billToPayModel) {
        this.Department = departmentModel;
        this.CostCenter = costCenterModel;
        this.Proposal = proposalModel;
        this.Product = productModel;
        this.BillToPay = billToPayModel;

        this.moveProductService = moveProductService;
        this.proposalService = proposalService;
        this.purchaseService = purchaseService;
        this.billToPayService = billToPayService;
    }

    async create(name, codeCostCenter, balanceCostCenter) {

        try {
            const newCostCenter = await this.CostCenter.create(
                {
                    code: codeCostCenter,
                    balance: balanceCostCenter
                
            });

            const newDepartment = await this.Department.create(
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