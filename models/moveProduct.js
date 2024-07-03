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
            allowNull: false
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        movementType:{
            type: Sequelize.ENUM('entrada', 'saída'),
            allowNull: false
        }, 
        movementSubType:{
            type: Sequelize.STRING,
            allowNull: false
        },
        amount:{ 
            type: Sequelize.INTEGER,
            allowNull: false
        },
        amountEntranceExit:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        unitPrice: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        movementDate: {
            type: Sequelize.DATE,
            allowNull: false
        }    
    });
        return MoveProduct;
};
