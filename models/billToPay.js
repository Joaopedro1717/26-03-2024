// models/billToPay.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    
    const BillToPay = sequelize.define('BillToPay',{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        totalPurchasePrice: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        installment: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        invoice: {
            type: Sequelize.STRING,
            allowNull: false
        },
        purchaseId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Purchases',
                key: 'id'
            }
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        expirationDate: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });
    return BillToPay;
}