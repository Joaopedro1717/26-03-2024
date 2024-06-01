// .models/department.js

const Sequelize = require('sequelize');
// const { sequelize } = require('.');

//Jeito do Escobar
module.exports= (sequelize) => {

    const Department = sequelize.define('Department',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        name:{
            type: Sequelize.STRING,
            allowNull:false,
        },
        costCenterId:{
            type: Sequelize.INTEGER,
            allowNull:false,
        }
    });
    return Department;
};
