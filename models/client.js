// ./models/clients.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Client = sequelize.define('Client', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey: true
        },

        name: {
            type: Sequelize.STRING,
            allowNull: false
        },

        cpf: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Client;
}