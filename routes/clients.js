// ./routes/clients.js

const clientService = require('../services/clientService');
const clientController = require('../controllers/clientController');

var express = require('express');
var router = express.Router();
const AuthService = require('../auth/AuthService');
const auth = new AuthService();
const db = require('../models');

const ClientService = new clientService(db.Client);
const ClientController = new clientController(ClientService);

router.post('/newClient', function(req, res) {
    ClientController.create(req, res);
});

module.exports = router;