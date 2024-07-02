// ./models/movementBillToReceive.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const MovementBillToReceive = sequelize.define('MovementBillToReceive', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        titleid: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        movementDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        movementType: {
            type: Sequelize.ENUM('abertura', 'pago', 'cancelado'),
            allowNull: false
        },
        movementPrice: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        fineValue: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        interestValue: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    });
    return MovementBillToReceive;
}