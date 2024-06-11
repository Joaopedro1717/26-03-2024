// .routes/suppliers.js

var express = require('express');
var router = express.Router();
const AuthService = require('../auth/AuthService');
const auth = new AuthService();

const db=require('../models');
const supplierService = require('../services/supplierService');
const SupplierService = new supplierService(db.Supplier);

const supplierController = require('../controllers/supplierController');
const SupplierController = new supplierController(SupplierService);

router.post('/newSupplier', function(req, res, next){
    SupplierController.create(req, res);
});

router.post('/alterSupplier', function(req, res, next){
    SupplierController.update(req, res);
});

module.exports = router;