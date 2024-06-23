// .services/billToPayService.js

class billToPayService {

    constructor(billToPayModel, departmentModel, costCenterModel, movementBIllToPayService){
        this.BillToPay = billToPayModel;
        this.Department = departmentModel;
        this.CostCenter = costCenterModel;
        this.movementBIllToPayService = movementBIllToPayService;
    }

    async create(totalPurchasePrice, installment, invoice, purchaseId, status, expirationDate) {
        try {
            
            if(installment > 1) {
                totalPurchasePrice = totalPurchasePrice/installment;
                const createdBillToPay = [];

                for(let i=1; i<=installment; i++){

                    const newBillToPay = await this.BillToPay.create(
                        {
                            totalPurchasePrice: totalPurchasePrice,
                            installment: installment,
                            invoice: invoice,
                            purchaseId: purchaseId,
                            status: status,
                            expirationDate: expirationDate
                        }
                    );

                    createdBillToPay.push(newBillToPay);
                }

                const movementType = "abertura";
                await this.movementBIllToPayService.create(createdBillToPay[0].id, movementType, totalPurchasePrice, 0, 0);

                return createdBillToPay;

            } else {

                const newBillToPay = await this.BillToPay.create(
                    {
                        totalPurchasePrice: totalPurchasePrice,
                        installment: installment,
                        invoice: invoice,
                        purchaseId: purchaseId,
                        status: status,
                        expirationDate: expirationDate
                    }
                );

                const movementType = "abertura";
                await this.movementBIllToPayService.create(newBillToPay.id, movementType, totalPurchasePrice, 0, 0);

                return newBillToPay ? newBillToPay : null;
            }

            
        } catch (error) {
            console.error(error);
            
        }
    }
}