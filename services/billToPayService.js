// .services/billToPayService.js

class billToPayService {

    constructor(billToPayModel, departmentModel, costCenterModel, movementBillToPayService){
        this.BillToPay = billToPayModel;
        this.Department = departmentModel;
        this.CostCenter = costCenterModel;
        this.movementBillToPayService = movementBillToPayService;
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
                await this.movementBillToPayService.create(createdBillToPay[0].id, movementType, totalPurchasePrice, 0, 0);

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
                await this.movementBillToPayService.create(newBillToPay.id, movementType, totalPurchasePrice, 0, 0);

                return newBillToPay ? newBillToPay : null;
            }

            
        } catch (error) {
            console.error(error);
            
        }
    }

    async payTheBill(invoice, departmentName){
        try {
            
            const bill = await this.BillToPay.findOne({
                where: {
                    invoice: invoice, status:"aberto",
                    order: [['installment', ASC]]
                }
            });

            const department = await this.Department.findOne({
                where: { name: departmentName}
            });

            const costCenter = await this.CostCenter.findOne({
                where: {
                    id: department.costCenterId
                }
            });

            if(costCenter.balance < bill.totalPurchasePrice){
                console.log("Saldo insuficiente");
            }

            costCenter.balance -= bill.totalPurchasePrice;

            await costCenter.save();
            
            const status = "pago";

            bill.status = status;
            await bill.save();

            const movementType = status;
            await this.movementBillToPayService.create(bill.id, movementType, bill.totalPurchasePrice, 0, 0);

            return bill;

        } catch (error) {
            console.error(error);
        }
    }

    async cancelTheBill(invoice){
       
        try {
            const billCancel =  await this.BillToPay.findAll({
                where: {
                    invoice: invoice
                }
            });

            if(!billCancel || billCancel.length === 0){
                console.log("Conta não encontrada");
            }

            for(let bill of billCancel){

                if(bill.status === 'pago'){
                    console.log("Fatura já paga!");
                }
            }

            const canceledStatus = "cancelado";
            bill.status = canceledStatus;
            await bill.save();

            const movementType = canceledStatus;
            await this.movementBillToPayService.create(bill.id, movementType, 0, 0, 0);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = billToPayService;