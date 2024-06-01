// .models/user.js

const Sequelize = require('sequelize');
// const { sequelize } = require('.');

//Jeito do Escobar
module.exports= (sequelize) => {

    const User = sequelize.define('User',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        nome:{
            type: Sequelize.STRING,
            allowNull:false,
        },
        email:{
            type: Sequelize.STRING,
            allowNull:false,
            unique:true
        },
        senha:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        departmentId:{
            type: Sequelize.INTEGER,
            allowNull:false
        }
    });
    return User;
};
/*
const user = sequelize.define('User', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    nome:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: false,
    }

});
*/
//module.exports = User;