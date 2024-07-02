// ./services/clientService.js

class clientService {
    constructor(clientModel){
        this.Client = clientModel;
    }

    async create(name, cpf) {
        try {
            
            const newClient = await this.Client.create (
                {
                    name: name,
                    cpf: cpf
                }
            );
            return newClient ? newClient : null;
        } catch (error) {
            console.error("Erro ao criar o cliente", error);
            throw error;
        }
    }
}

module.exports = clientService;