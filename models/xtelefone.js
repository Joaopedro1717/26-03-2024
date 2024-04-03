// .models/xtelefone.js

const Sequelize = require('sequelize');
// const { sequelize } = require('.');

//Jeito do Escobar
module.exports= (sequelize) => {

    const XTelefone = sequelize.define('XTelefone',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey:true
        },
        number:{
            type: Sequelize.STRING,
            allowNull:false,
        }
    });

    // Associação com o User
    XTelefone.associate = (models) => {
        XTelefone.belongsTo(sequelize.models.User,{
            foreingKey: 'userId',
            as: 'User'
        });
    };
    return XTelefone;
};