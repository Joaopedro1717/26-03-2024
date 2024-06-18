// ../routes/proposals.js

var express = require('express'); 
var router = express.Router();
const AuthService = require('../auth/AuthService');
const auth = new AuthService();

const db = require('../models');
const proposalService = require('../services/proposalService');
const ProposalService = new proposalService(db.Proposal, db.Supplier, db.Product, db.User);

const proposalController = require('../controllers/proposalController');
const ProposalController = new proposalController(ProposalService);

router.post('/newProposal', function(req, res, next) {
    ProposalController.create(req,res);
});

module.exports = router;