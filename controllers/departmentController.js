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
}
module.exports = departmentController;