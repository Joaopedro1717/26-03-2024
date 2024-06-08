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
}

module.exports = supplierService;