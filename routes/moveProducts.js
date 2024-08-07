// .routes/moveProducts.js

var express = require('express');
var router = express.Router();
const AuthService = require('../auth/AuthService');
const auth = new AuthService();

const db=require('../models');
const moveProductService = require('../services/moveProductService');
const MoveProductService = new moveProductService(db.MoveProduct, db.Product, db.Deposit);

const moveProductController = require('../controllers/moveProductController');
const MoveProductController = new moveProductController(MoveProductService);

router.post('/newEntranceMovement', auth.authenticateToken, (req, res, next) => {
    MoveProductController.createEntrance(req, res);
});

router.post('/newExitMovement', auth.authenticateToken, (req, res) => {
    MoveProductController.createExit(req, res);
});

router.get('/findMovementsByProduct', function(req, res, next){
    MoveProductController.findMovementByProduct(req, res);
});

router.get('/findMovementsByDeposit', function(req, res, next){
    MoveProductController.findMovementByDeposit(req, res);
});

router.get('/findMovementsByDate', function(req, res, next){
    MoveProductController.findMovementByDate(req, res);
});

module.exports = router;