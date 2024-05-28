// .routes/moveProducts.js

var express = require('express');
var router = express.Router();
const AuthService = require('../auth/AuthService');
const auth = new AuthService();

const db=require('../models');
const moveProductService = require('../services/moveProductService');
const MoveProductService = new moveProductService(db.MoveProduct);

const moveProductController = require('../controllers/moveProductController');
const MoveProductController = new moveProductController(MoveProductService);

router.post('/newMoveProduct', function(req, res, next){
    MoveProductController.create(req, res);
});


module.exports = router;