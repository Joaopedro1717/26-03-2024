//.services/moveProductService.js

const { all } = require("../routes");

class moveProductService{
    constructor(moveProductModel) {
        this.MoveProduct = moveProductModel;
    }
}

module.exports = moveProductService;