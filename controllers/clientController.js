// ./controllers/clientController.js

class clientController {
    constructor(clientService){
        this.clientService = clientService;
    }

    async create(req, res) {
        const {name, cpf} = req.body;

        try {
            const newClient = await this.clientService.create(name, cpf);
            res.status(200).json(newClient);
        } catch (error) {
            res.status(500).json({error:`Erro ao criar novo cliente`})
        }
    }
}

module.exports = clientController;