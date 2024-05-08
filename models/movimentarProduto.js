// .models/product.js

const Sequelize = require('sequelize');

//Jeito do Escobar
module.exports= (sequelize) => {

    const MovimentarProduto = sequelize.define('MovimentarProduto',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        depositId: {
            type: Sequelize.INTEGER,
        },
        productId: {
            type: Sequelize.INTEGER,
        },

        tipoMovimentacao: Sequelize.STRING,
        quantidade: Sequelize.INTEGER,
        precoUnitario: Sequelize.FLOAT,
        dataMovimentacao: Sequelize.DATE
    });

        return MovimentarProduto;
};
