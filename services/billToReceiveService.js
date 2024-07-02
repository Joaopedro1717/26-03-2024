// ./services/billToReceiveService.js

class billToReceiveService{
    constructor(billToReceiveModel, movementBillToReceiveService, clientModel) {
        this.BillToReceive = billToReceiveModel,
        this.movementBillToReceiveService = movementBillToReceiveService;
        this.Client = clientModel;
    }

    async create(totalSalePrice, installment, invoice, saleId, status, expirationDate) {
        try {
            if(installment > 1) {
                totalSalePrice = totalSalePrice / installment;
                const createdBillToReceive = [];

                for(let i = 1; i <= installment; i++) {
                    const newBillToReceive = await this.BillToReceive.create({
                        totalSalePrice: totalSalePrice,
                        installment: i,
                        invoice: invoice,
                        saleId: saleId,
                        status: status,
                        expirationDate: expirationDate
                    });
                    createdBillToReceive.push(newBillToReceive);
                }
                const movementType = "abertura";
                await this.movementBillToReceiveService.create(createdBillToReceive[0].id, movementType, totalSalePrice,0 ,0);

                return createdBillToReceive;
            } else {
                const newBillToReceive = await this.BillToReceive.create({
                    totalSalePrice: totalSalePrice,
                    installment: installment, 
                    invoice: invoice,
                    saleId: saleId,
                    status: status,
                    expirationDate: expirationDate
                });

                const movementType = "abertura";
                await this.movementBillToReceiveService.create(newBillToReceive.id, movementType, totalSalePrice, 0, 0);

                return newBillToReceive ? newBillToReceive : null;
            }
        } catch (error) {
            console.error("erro ao criar abertura de conta a receber", error);
            throw error;
        }
    }

    async receiveTheBill(invoice, clientCpf) {
        try {
            const bill = await this.BillToReceive.findOne({
                where: { invoice: invoice, status: "aberto" },
                orders: [['installment', 'asc']]
            });

            if(!bill) {
                console.log("Conta não encontrada:", invoice);
                return null;
            }

            const client = await this.Client.findOne({ where: { cpf: clientCpf} });

            if(!client){
                throw new Error('Cliente não foi encontrado');
            }

            const status = "recebido";

            bill.status = status;
            await bill.save();

            const movementType = status;
            await this.movementBillToReceiveService.create(bill.id, movementType, bill.totalSalePrice, 0, 0);

            return bill;
        } catch (error) {
            console.error("Erro ao receber conta", error);
            throw error;
        }
     }

     async cancelTheBill(invoice) {
        try {
            const billCanceled = await this.BillToReceive.findAll({ where: { invoice: invoice}});
            if(!billCanceled || billCanceled.length === 0) {
                throw new Error('Não foi encontrada a fatura');
            }

            for(let bill of billCanceled){
                if(bill.status === 'recebido') {
                    throw new Error('Conta ja recebida');
                }

                const canceledStatus = "cancelado";
                bill.status = canceledStatus;
                await bill.save();

                const movementType = canceledStatus;
                await this.movementBillToReceiveService.create(bill.id, movementType, 0, 0, 0);
            }

            return billCanceled;
        } catch (error) {
            console.error("Erro ao cancelar conta:", error);
            throw error;
        }
     }
}

module.exports = billToReceiveService