// routes/users.js

var express = require('express');
var router = express.Router();
const AuthService = require('../services/authService');
const auth = new AuthService();


const db=require('../models');
const userService = require('../services/userService'); //classe
const UserService = new userService(db.User); //construção do objeto

const userController = require('../controllers/userController'); //classe
const UserController = new userController(UserService); //construção do objeto

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Modulo de usuários está rodando');
});

//rota para criar um novo usuário
router.post('/novoUsuario', function(req, res, next){
  UserController.create(req,res);
});

//rota para localizar todos usuários
router.get('/localizaTodosUsuarios', auth.authenticateToken, (req, res, next) => {
  UserController.localizaTodosUsuarios(req, res);
});

//rota para localizar usuário pelo ID
router.get('/localizaUsuarioPeloId', function(req, res, next){
  UserController.localizaUsuarioPeloId(req, res); // Remove the () after UserController.localizaUsuarioPeloId
});

router.post('/login', function (req, res, next) {
  UserController.login(req, res);
});
module.exports = router;
