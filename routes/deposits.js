// .routes// deposits.js

var express = require('express');
var router = express.Router();
const AuthService = require('../auth/AuthService');
const auth = new AuthService();

const db=require('../models');
const depositService = require('../services/depositService'); //classe
const DepositService = new depositService(db.Deposit); //construção do objeto

const depositController = require('../controllers/depositController'); //classe
const DepositController = new depositController(DepositService); //construção do objeto

router.post('/newDeposit', auth.authenticateToken, (req, res, next) => {
    DepositController.create(req,res);
  });

router.post('/alterDeposit', function(req, res, next){
    DepositController.update(req, res);
  });

router.get('/findAllDeposits', function(req, res, next){
    DepositController.findAll(req, res);
  });

router.get('/findById', function(req, res, next){
    DepositController.findById(req, res);
  });
    

module.exports = router;