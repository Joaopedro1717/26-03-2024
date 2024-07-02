// ./services/saleService.js

const moment = require('moment');

class saleService {
    constructor(saleModel, saleDetailService, clientModel, moveProductService, depositModel, productModel) {
        this.Sale = saleModel;
        this.saleDetailService = saleDetailService;
        this.Client = clientModel;
        this.moveProductService = moveProductService;
        this.Deposit = depositModel;
        this.Product = productModel;

    }

    async create(productName, quantity, clientCpf, installment) {
        try {
            const client = await this.Client.findOne({
                where: { cpf: clientCpf }
            });
            if(!client){
                throw new error("Não foi possivel encontrar o cliente");
            }

            const product = await this.Product.findOne({
                where: { nome: productName} 
            });
            if(!product){
                throw new error("Não foi possível encontrar o producto");
            }

            const deposits = await this.Deposit.findAll(); 

            const soldQuantity = quantity;

            for ( const deposit of deposits) {
                if(quantity <= 0) break;
            

            let currentQuantity = await this.moveProductService.getAmount(product.id, deposit.id);

            if(currentQuantity > 0) {
                const removeQuantity = Math.min(currentQuantity, quantity);

                await this.moveProductService.createExit(deposit.name, product.name, 'venda', removeQuantity, new Date());

                quantity -= removeQuantity;
            }
        }

        if(quantity > 0) {
            throw new error('Não produtos suficiente em estoque');
        }

        function randonNumberGenerator(min = 1000, max = 5000) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        let invoice
        let trueInvoice

        do {
            invoice = randonNumberGenerator();
            trueInvoice = await this.Sale.findOne({
                where: { invoice: invoice}
            });
        } while(trueInvoice);

        const saleDate = moment().format('YYYY-MM-DD');

        const newSale = await this.Sale.create(
            {
                invoice: invoice,
                saleDate: saleDate,
                clientId: client.id
            }
        );

        const unitPriceProduct = await this.moveProductService.findByProduct(productName);

        const expirationDate = moment().add(7, 'days').format('YYYY-MM-DD');

        await this.saleDetailService.create(newSale.id, product.id, soldQuantity, unitPriceProduct.unitPrice, installment, invoice, expirationDate);

        return newSale;
        } catch (error) {
            console.error("Erro ao criar venda", error);
        }
    }
}

module.exports = saleService;