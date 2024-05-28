// .models/product.js

const Sequelize = require('sequelize');

//Jeito do Escobar
module.exports= (sequelize) => {

    const MoveProduct = sequelize.define('MoveProduct',{
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
        movementType:{
            type: Sequelize.ENUM('entrada', 'saída'),
        }, 
        amount:{ 
            type: Sequelize.INTEGER,
        },
        unitPrice: {
            type: Sequelize.FLOAT,
        },
        movementDate: {
            type: Sequelize.DATE
        }    
    });
        return MoveProduct;
};
