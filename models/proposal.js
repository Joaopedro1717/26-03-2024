// .models/proposal.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    
    const Proposal = sequelize.define('Proposal', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        supplierId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        proposalValue: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        proposalDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        buyer: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        expirationDate: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });
    return Proposal;
}

