// ./models/sale.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Sale = sequelize.define('Sale', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        invoice: {
            type: Sequelize.STRING,
            allowNull: false
        },
        saleDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        clientId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    return Sale;
}