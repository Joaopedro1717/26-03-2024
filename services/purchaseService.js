// .services/purchaseService.js

class purchaseService {
    constructor(purchaseModel) {
        this.Purchase = purchaseModel;
    }

    async create(supplierId, proposalId, buyerId, productId, totalAmount, unitPrice, purchaseStatus) {
        try {
            const newPurchase = await this.Purchase.create(
                {
                    supplierId: supplierId,
                    proposalId: proposalId,
                    buyerId: buyerId,
                    productId: productId,
                    totalAmount: totalAmount,
                    unitPrice: unitPrice,
                    purchaseStatus: purchaseStatus
                }
            );

            return newPurchase ? newPurchase : null;
        } catch (error) {
          console.error(error);  
        }   
    }

    async findOnePurchase(purchaseId) {
        try {
            const purchase = await this.Purchase.findOne({ where: {id: purchaseId}
            });

            return purchase ? purchase : null;
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = purchaseService;