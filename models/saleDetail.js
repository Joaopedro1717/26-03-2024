// ./models/saleDatail.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const SaleDetail = sequelize.define('SaleDetail', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        saleId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        soldQuantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        unitPrice: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        installment: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        invoice: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return SaleDetail;
}