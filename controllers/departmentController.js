// .constrollers/departmentController.js

class departmentController{

    constructor(departmentService) {
        this.departmentService = departmentService;
    }

    async create(req, res){
        const {name, codeCostCenter, balanceCostCenter} = req.body;
        try {

            const newDepartment = await this.departmentService.create(name, codeCostCenter, balanceCostCenter);
            res.status(200).json(newDepartment);
        } catch(error){
            console.log(error);
            res.status(500).json({error: `Erro ao criar novo departamento`});
        }
    }

    async materialRequest(req, res) {
        const {depositName, productName, amountExit, movementDate} = req.body;

        try {
            const newMaterialRequest = await this.departmentService.materialRequest(depositName, productName, amountExit, movementDate);
            res.status(200).json(newMaterialRequest);
        } catch(error){
            res.status(500).json({error: `Erro ao criar requisição de material`});
        }
    }
    
    async buyMaterial(req, res){
        const {productName, depositName, quantity, installment, expirationDate} = req.body;

        try {
            const newBuyMaterial = await this.departmentService.buyMaterial(productName, depositName, quantity, installment, expirationDate);
            res.status(200).json(newBuyMaterial);
        } catch (error) {
            res.status(500).json({error: `Erro ao comprar material`});
        }
    }
}
module.exports = departmentController;