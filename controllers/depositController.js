// .controllers/ depositController.js

class depositController{
    constructor(depositService){
        this.depositService = depositService;
    }

    async create(req, res, next){
        const {nome, ativo} = req.body;
        try {

            const newDeposit = await this.depositService.create(nome, ativo);

            res.status(200).json(newDeposit);
        } catch (error) {
            console.log(error);
            res.status(500).json({error: `Erro ao criar novo deposito`});
        }
    }

    async update (req, res, next) {
        const {id, nome, ativo} = req.body;
        try {
            const alterDeposit = await this.depositService.update(id, nome, ativo);

            res.status(200).json(alterDeposit);
        } catch (error) {
            console.log(error);
            res.status(500).json({error: `Erro ao alterar deposito`});            
        }
    }

    async findAll(req, res) {
        try {
            const allDeposits = await this.depositService.findAll();
            res.status(200).json(allDeposits);
        } catch (error) {
            res.status(400).json({error:`Não foi possível localizar todos os depositos`});
        }

    }

    async findById(req, res) {
        const {id} = req.body;

        try {
            const IdDeposit = await this.depositService.findById(id);
            res.status(200).json(IdDeposit);

        } catch (error) {
            res.status(400).json({error:`deposito não encontrado`});
        }
    }
}

module.exports = depositController;