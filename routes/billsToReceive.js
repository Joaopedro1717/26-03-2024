// ./routes/billsToReceive.js
const billToReceiveService = require('../services/billToReceiveService');
const billToReceiveController = require('../controllers/billToReceiveController');
const movementBillToReceiveService = require('../services/movementBillToPayService');

var express = require('express');
var router = express.Router();
const AuthService = require('../auth/AuthService');
const auth = new AuthService();
const db = require('../models');


const MovementBillToReceiveService = new movementBillToReceiveService(db.movementBillToReceiveService);
const BillToReceiveService = new billToReceiveService(db.BillToReceive, MovementBillToReceiveService, db.Client);
const BillToReceiveController = new billToReceiveController(BillToReceiveService);

router.post('/receiveTheBill', auth.authenticateToken,(req, res) => {
    BillToReceiveController.receiveTheBill(req, res);
});

router.post('/cancelTheBill', function(req, res){
    BillToReceiveController.cancelTheBill(req, res);
});

module.exports = router;