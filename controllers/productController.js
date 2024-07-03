// .controllers/productController.js

class productController{
    constructor(productService){
        this.productService = productService;
    }

    async create(req, res, next){
        const {nome, ativo} = req.body;
        try {

            const newProduct = await this.productService.create(nome, ativo);

            res.status(200).json(newProduct);            
        } catch (error) {
            console.log(error);
            res.status(500).json({error: `Erro ao inserir novo produto`});
        }
    }

    async update (req, res, next) {
        const {id, nome, ativo} = req.body;
        try {
            const alterProduct = await this.productService.update(id, nome, ativo);

            res.status(200).json(alterProduct);
        } catch (error) {
            console.log(error);
            res.status(500).json({error: `Erro ao alterar o produto`});            
        }
    }

    async findAll(req, res) {
        try {
            const allProducts = await this.productService.findAll();
            res.status(200).json(allProducts);
        } catch (error) {
            res.status(400).json({error:`Não foi possível localizar todos os produtos`});
        }

    }

    async findById(req, res) {
        const {id} = req.body;

        try {
            const IdProduct = await this.productService.findById(id);
            res.status(200).json(IdProduct);

        } catch (error) {
            res.status(400).json({error:`Produto não encontrado`});
        }
    }
}
module.exports = productController;