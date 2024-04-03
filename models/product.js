// .models/product.js

const Sequelize = require('sequelize');
const { sequelize } = require('.');

module.exports= (sequelize) => {
    const Product = sequelize.define ('Product', {
        id:{
            type: Sequelize.INTEGER,
            primaryKey:true
        },
        nome:{
            type: Sequelize.STRING,
            allowNull:false,
        },
        preco:{
            type: Sequelize.FLOAT,
            allowNull:false,
        }
    });
    return Product;
};