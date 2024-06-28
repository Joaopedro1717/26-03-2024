// .routes/billsToPay.js

const billToPayService = require('../services/billToPayService');
const movementBillToPayService = require('../services/movementBillToPayService');

const billToPayController = require('../controllers/billToPayController');

var express = require('express');
var router = express.Router();
const AuthService = require('../auth/AuthService');
const auth = new AuthService();
const db = require('../models');

const MovementBillToPayService = new movementBillToPayService(db.MovementBillToPay);
const BillToPayService = new billToPayService(db.BillToPay, db.Department, db.CostCenter, MovementBillToPayService);
const BillToPayController = new billToPayController(BillToPayService);

router.post('/payTheBill', function (req, res) {
    BillToPayController.payTheBill(req, res);
});

router.post('/cancelTheBill', function (req, res) {
    BillToPayController.cancelTheBill(req, res);
});

module.exports = router;