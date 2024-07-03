// ./routes/departments.js

const departmentService = require('../services/departmentService');
const moveProductService = require('../services/moveProductService');
const proposalService = require('../services/proposalService');
const purchaseService = require('../services/purchaseService');
const billToPayService = require('../services/billToPayService');
const movementBillToPayService = require('../services/movementBillToPayService');
const departmentController = require('../controllers/departmentController');


var express = require('express');
var router = express.Router();
const AuthService = require('../auth/AuthService');
const auth = new AuthService();
const db = require('../models');

const MoveProductService = new moveProductService(db.MoveProduct, db.Product, db.Deposit);
const ProposalService = new proposalService(db.Proposal, db.Supplier, db.Product, db.User);
const PurchaseService = new purchaseService(db.Purchase);
const MovementBillToPayService = new movementBillToPayService(db.MovementBillToPay);
const BillToPayService = new billToPayService(db.BillToPay, db.Department, db.CostCenter, MovementBillToPayService);

const DepartmentService = new departmentService(db.Deposit, db.Department, db.CostCenter, MoveProductService, ProposalService, PurchaseService, BillToPayService, db.Proposal, db.Product, db.BillToPay);

const DepartmentController = new departmentController(DepartmentService);

router.post('/newDepartment', function(req, res, next){
    DepartmentController.create(req, res);
});

router.post('/materialRequest', auth.authenticateToken, (req, res) => {
    DepartmentController.materialRequest(req, res);
});

router.get('/buyMaterial', auth.authenticateToken, (req, res) => {
    DepartmentController.buyMaterial(req, res);
});

module.exports = router;