// .models/product.js

const Sequelize = require('sequelize');
// const { sequelize } = require('.');

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
            references: {
              model: Deposit,
              key: 'id'
            },
        },
        productId: {
            type: Sequelize.INTEGER,
            references: {
              model: Product,
              key: 'id'
            }
        },

        tipoMovimentacao: Sequelize.STRING,
        quantidade: Sequelize.INTEGER,
        precoUnitario: Sequelize.FLOAT,
        dataMovimentacao: Sequelize.DATE
    });
    Deposit.hasMany(MovimentarProduto, { foreignKey: 'depositId' });
    Product.hasMany(MovimentarProduto, { foreignKey: 'productId' });
    MovimentarProduto.belongsTo(Deposit, { foreignKey: 'depositId' });
    MovimentarProduto.belongsTo(Product, { foreignKey: 'productId' });
        return MovimentarProduto;
};
