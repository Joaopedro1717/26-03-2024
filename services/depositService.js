// services// depositService.js

const { all } = require("../routes");

class depositService{
    constructor(depositModel) {
        this.Deposit = depositModel;
    }

    async create(nome, ativo) {
        try {

            const newDeposit = await this.Deposit.create(
                {
                    nome:nome,
                    ativo:ativo
                }
            );
            return newDeposit ? newDeposit : null;

        } catch (error) {
            throw error;
        }
    }

    async update(id, nome, ativo) {
        try {

            const deposit = await this.Deposit.findByPk(id);

            if(!deposit) {
                console.log("Erro ao alterar produto");
            }

            deposit.nome = nome !== undefined ? nome : deposit.nome;
            deposit.ativo = ativo !== undefined ? ativo : deposit.ativo;

            await deposit.save();
            
        } catch (error) {
            
        }
    }

    async findAll(){
        try {
            const allDeposits = await this.Deposit.findAll();
            return allDeposits ? allDeposits : null;

        } catch (error) {
            throw error;
        }
    }

    async findById(depositId) {
        try {
            const IdDeposit = await this.Deposit.findOne({where: {id : depositId}});
            return IdDeposit ? IdDeposit : null;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = depositService