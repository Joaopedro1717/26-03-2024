// .controllers/billToPayController.js

class billToPayController {

    constructor(billToPayService) {
        this.billToPayService = billToPayService;
    }

    async payTheBill(req, res){
        const {invoice, departmentName} = req.body;

        try {
            const bill = await this.billToPayService.payTheBill(invoice, departmentName);
            res.status(200).json(bill)
        } catch (error) {
            res.status(500).json({error: `Erro ao pagar conta`});
        }
    }

    async cancelTheBill(req, res){
        const {invoice} = req.body;

        try {
            const billCancel = await this.billToPayService.cancelTheBill(invoice);
            res.status(200).json(billCancel);
        } catch (error) {
            res.status(500).json({error: `Erro ao cancelar conta`});
        }
    }
}
module.exports = billToPayController;