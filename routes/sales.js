// ./routes/sales.js
const moveProductService = require('../services/moveProductService');
const saleDetailServices = require('../services/saleDetailService');
const billToReceiveService = require('../services/billToReceiveService');
const movementBillToReceiveService = require('../services/movementBillToReceiveService');

const saleService = require('../services/saleService');
const saleController = require('../controllers/saleController');


var express = require('express'); 
var router = express.Router();
const AuthService = require('../auth/AuthService');
const auth = new AuthService();

const db = require('../models');

const MovementBillToReceiveService = new movementBillToReceiveService(db.MovementBillToReceive);
const BillToReceiveService = new billToReceiveService(db.BillToReceive, MovementBillToReceiveService);
const SaleDetailService = new saleDetailService(db.SaleDetail, BillToReceiveService);
const MoveProductModel = new moveProductService(db.MoveProduct, db.Product, db.Deposit);
const SaleService = new saleService(db.Sale, SaleDetailService, db.Client, MoveProductModel, db.Deposit, db.Product);

router.post('/newSale', function(req, res) {
    SalesController.create(req, res);
});

module.exports = router;