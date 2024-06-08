// .controllers/supplierController.js

class supplierController{
    constructor(supplierService) {
        this.supplierService = supplierService;
    }

    async create(req, res, next) {
        const {name, cnpj} = req.body;
        try {
            
            const newSupplier = await this.supplierService.create(name, cnpj);
            res.status(200).json(newSupplier);
        } catch (error) {
            res.status(500).json({error: `Erro ao criar novo fornecedor`});
        }
    }
}

module.exports = supplierController;

