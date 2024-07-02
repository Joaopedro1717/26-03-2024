// ./models/billToReceive.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const BillToReceive = sequelize.define('BillToReceive', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        totalSalePrice: {
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
        },
        saleId: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: 'Sales',
                key: 'id'
            }
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        expirationDate:{
            type: Sequelize.DATE,
            allowNull: false
        }
    });
    return BillToReceive;
}