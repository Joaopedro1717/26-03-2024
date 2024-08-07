// .models/ supplier.js

const Sequelize = require('sequelize');

module.exports= (sequelize) => {

    const Supplier = sequelize.define('Supplier',{
        id:{
            type: Sequelize.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        cnpj:{
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Supplier;
};