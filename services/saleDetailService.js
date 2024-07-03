// ./services/saleDetail.js

class saleDetailService {
    constructor(saleDetailModel, billToReceiveService) {
        this.SaleDetail = saleDetailModel,
        this.billsToReceiveService = billToReceiveService;
    }

    async create(saleId, productId, soldQuantity, salePrice, installment, invoice, expirationDate) {
        try {
            const newSaleDetail = await this.SaleDetail.create({
                saleId: saleId,
                productId: productId,
                soldQuantity: soldQuantity,
                salePrice: salePrice,
                installment: installment,
                invoice: invoice
            });

            const totalSalePrice = soldQuantity * salePrice;
            const status = "aberto";

            await this.billsToReceiveService.create(totalSalePrice, installment, invoice, saleId, status, expirationDate);

            return newSaleDetail ? newSaleDetail : null
        } catch (error) {
            console.error("Erro ao criar detalhe da compra", error);
        }
    }
}

module.exports = saleDetailService;