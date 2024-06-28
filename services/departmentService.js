// .services/departmentService.js

class departmentService {

    constructor(depositModel, departmentModel, costCenterModel, moveProductService, proposalService, purchaseService, billToPayService, proposalModel, productModel, billToPayModel) {
        this.Deposit = depositModel;
        this.Department = departmentModel;
        this.CostCenter = costCenterModel;
        this.moveProductService = moveProductService;
        this.proposalService = proposalService;
        this.purchaseService = purchaseService;
        this.billToPayService = billToPayService;
        this.Proposal = proposalModel;
        this.Product = productModel;
        this.BillToPay = billToPayModel;
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

    async materialRequest(depositName, productName, amountExit, movementDate) {
        try {
            const movementSubType = "transferência";
            const newMaterialRequest = await this.moveProductService.createExit(depositName, productName, movementSubType, amountExit, movementDate);

            return newMaterialRequest ? newMaterialRequest : null

        } catch (error) {
            console.error(error);
        }
    }

    async buyMaterial(productName, depositName, quantity, installment, expirationDate) {
        try {

            const product = await this.Product.findOne({
                where: { nome: productName }
            });

            const proposals = await this.Proposal.findAll({
                where: { productId: product.id }
            });

            if (proposals.length < 3) {
                console.log("É necessário enviar ao menos 3 propostas");
            }

            let bestProposal = proposals[0];

            for (const proposal of proposals) {
                if (proposal.proposalValue < bestProposal.proposalValue) {
                    bestProposal = proposal;
                }
            }

            let totalPurchasePrice = quantity * bestProposal.proposalValue;
            const purchaseStatus = "pendente";

            function randonNumberGenerator(min = 1000, max = 5000) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            let invoice;
            let trueInvoice;

            do {
                invoice = randonNumberGenerator();
                trueInvoice = await this.BillToPay.findOne({ where: { invoice: invoice } });
            } while (trueInvoice);

            const newPurchase = await this.purchaseService.create(bestProposal.supplierId, bestProposal.id, bestProposal.buyer, bestProposal.productId, quantity, bestProposal.proposalValue, purchaseStatus);

            const movementSubType = "compra";

            await this.moveProductService.createEntrance(depositName, productName, movementSubType, quantity, bestProposal.proposalValue, bestProposal.proposalDate);

            const status = "aberto";

            await this.billToPayService.create(totalPurchasePrice, installment, invoice, newPurchase.id, status, expirationDate);
        } catch (error) {
            console.error("Erro ao comprar material", error);
            throw error;
        }
    }

    async findDepartmentByName(departmentName) {
        try {
            const department = await this.Department.findOne({
                where: {
                    name: departmentName
                }
            });

            return department ? department : null;

        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = departmentService