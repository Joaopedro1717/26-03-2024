// ./controllers/billToReceiveController.js

class billToReceiveController {
    constructor(billToReceiveService) {
        this.billToReceiveService = billToReceiveService;
    }

    async receiveTheBill(req, res) {
        const { invoice, clientCpf } = req.body;

        try {
            const  billReceived = await this.billToReceiveService.receiveTheBill(invoice, clientCpf);
            res.status(200).json(billReceived);
        } catch (error) {
            res.status(500).json({ error: `Erro ao receber conta a receber`});
        }
    }

    async cancelTheBill(req, res) {
        const { invoice } = req.body;
        try {
            const billCanceled = await this.billToReceiveService.cancelTheBill(invoice);
            res.status(200).json(billCanceled);
        } catch (error) {
            res.status(500).json({ error: `Erro ao cancelar conta a receber`});
        }
    }
}

module.exports = billToReceiveController;