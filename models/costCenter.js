// .models/department.js

const Sequelize = require('sequelize');
// const { sequelize } = require('.');

//Jeito do Escobar
module.exports= (sequelize) => {

    const CostCenter = sequelize.define('CostCenter',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        code:{
            type: Sequelize.STRING,
            allowNull:false,
            unique:true
        },
        balance:{
            type: Sequelize.FLOAT,
            allowNull: false
        }
        
    });
    return CostCenter;
};
