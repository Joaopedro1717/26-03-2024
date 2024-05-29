// .models/deposit.js

const Sequelize = require('sequelize');
// const { sequelize } = require('.');

//Jeito do Escobar
module.exports= (sequelize) => {

    const Deposit = sequelize.define('Deposit',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        nome:{
            type: Sequelize.STRING,
            allowNull:false,
        },
        ativo:{
            type: Sequelize.BOOLEAN,
            allowNull:false,
        }
    });
    return Deposit;
};
