// .services/ supplierService.js
const { all } = require("../routes");

class supplierService{
    constructor(supplierModel) {
        this.Supplier = supplierModel;
    }


    async create(name, cnpj) {
        try {

            const newSupplier = await this.Supplier.create(
                {
                    name: name,
                    cnpj: cnpj
                }
            );
            return newSupplier ? newSupplier : null;
            
        } catch (error) {
            throw error;
        }
    }

    async update(id, name, cnpj) {
        try {
            
            const supplier = await this.Supplier.findByPk(id);

            if(!supplier){
                console.log("Erro ao alterar fornecedor");
            }

            supplier.name = name !== undefined ? name : supplier.name;
            supplier.cnpj = cnpj !== undefined ? cnpj : supplier.cnpj;

            await supplier.save();

        } catch (error) {
            
        }
    }
}

module.exports = supplierService;