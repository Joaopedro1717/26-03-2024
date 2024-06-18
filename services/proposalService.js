// services/proposalService.js

const { all } = require("../routes");

class proposalService {

    constructor(proposalModel, supplierModel, productModel, userModel){

        this.Proposal = proposalModel;
        this.Supplier = supplierModel;
        this.Product = productModel;
        this.User = userModel;
    }

    async create(productName, supplierName, proposalValue, proposalDate, buyer, expirationDate) {
        try {
            const product = await this.Product.findOne({
                 where: { nome: productName}
            });
                if(product == null) {
                    console.log("Produto não encontrado!");
                }

            const supplier = await this.Supplier.findOne({
                 where: { name: supplierName}
            });
                if(supplier == null) {
                    console.log("Fornecedor não encontrado!");
                }
            
            const userBuyer = await this.User.findOne({
                where: { nome: buyer}
            });
                if(userBuyer == null) {
                    console.log("Usuário não encontrado")
                }
        
            const newProposal = await this.Proposal.create(
                {
                    productId : product.id,
                    supplierId : supplier.id,
                    proposalValue : proposalValue,
                    proposalDate : proposalDate,
                    buyer : userBuyer.id,
                    expirationDate : expirationDate
                }
            )

            return newProposal ? newProposal : null;

        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = proposalService;