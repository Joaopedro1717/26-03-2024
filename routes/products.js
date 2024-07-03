// .routes/products.js

var express = require('express');
var router = express.Router();
const AuthService = require('../auth/AuthService');
const auth = new AuthService();

const db=require('../models');
const productService = require('../services/productService'); //classe
const ProductService = new productService(db.Product); //construção do objeto

const productController = require('../controllers/productController'); //classe
const ProductController = new productController(ProductService); //construção do objeto

//rota para criar um novo produto
router.post('/newProduct', auth.authenticateToken, (req, res, next) => {
    ProductController.create(req,res);
  });

router.post('/alterProduct', function(req, res, next){
  ProductController.update(req, res);
});

router.get('/findAllProducts', function(req, res, next){
  ProductController.findAll(req, res);
});

router.get('/findById', function(req, res, next){
  ProductController.findById(req, res);
});

module.exports = router;