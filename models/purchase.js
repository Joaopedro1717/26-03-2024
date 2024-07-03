// .models/purchase.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    const Purchase = sequelize.define('Purchase', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        supplierId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        proposalId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        buyerId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        totalAmount: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        unitPrice: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        purchaseStatus: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Purchase;
}