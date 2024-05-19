// .services//productService.js
const { all } = require("../routes");

class productService{
    constructor(productModel) {
        this.Product = productModel;
    }

    async create(nome, ativo) {
        try {

            const newProduct = await this.Product.create(
                {
                    nome:nome,
                    ativo:ativo
                }
            );
            return newProduct ? newProduct : null;

        } catch (error) {
            throw error;
        }
    }

    async update(id, nome, ativo) {
        try {

            const product = await this.Product.findByPk(id);

            if(!product) {
                console.log("Erro ao alterar produto");
            }

            product.nome = nome !== undefined ? nome : product.nome;
            product.ativo = ativo !== undefined ? ativo : product.ativo;

            await product.save();
            
        } catch (error) {
            
        }
    }

    async findAll(){
        try {
            const allProducts = await this.Product.findAll();
            return allProducts ? allProducts : null;

        } catch (error) {
            throw error;
        }
    }

    async findById(productId) {
        try {
            const IdProduct = await this.Product.findOne({where: {id : productId}});
            return IdProduct ? IdProduct : null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = productService;