// ./routes/departments.js

const departmentService =  require('../services/departmentService');
const moveProductService = require('../services/moveProductService');
const proposalService = require('../services/proposalService');
const purchaseService = require('../services/purchaseService');
const billToPayService = require('../services/billToPayService');
const movementBillToPayService = require('../services/movementBillToPayService');

var express = require('express');
var router = express.Router();
const AuthService = require('../auth/AuthService');
const auth = new AuthService();
const db=require('../models');

const MoveProductService = new moveProductService(db.MoveProduct, db.Product, db.Deposit);
const ProposalService = new proposalService(db.Proposal, db.Supplier);
const PurchaseService = new purchaseService(db.Purchase);
const MovementBillToPayService = new movementBillToPayService(db. movementBillToPay);
const BillToPayService = new billToPayService(db.BillToPay, MovementBillToPayService);


const DepartmentService = new departmentService(db.Department, db.CostCenter, MoveProductService, ProposalService, db.Proposal, db.Product, PurchaseService, BillToPayService, db.BillToPay);

const departmentController = require('../controllers/departmentController');
const DepartmentController = new departmentController(DepartmentService);

router.post('/newDepartment', function(req, res, next) {
    DepartmentController.create(req, res);
});

router.post('/materiaRequest', function(req, res) {
    DepartmentController.materialRequest(req, res);
});

router.get('./buyMaterial', function(req, res){
    DepartmentController.buyMaterial(req, res);
})

module.exports = router;