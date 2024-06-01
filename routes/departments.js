// ./routes/departments.js

var express = require('express');
var router = express.Router();
const AuthService = require('../auth/AuthService');
const auth = new AuthService();

const db=require('../models');
const departmentService = require('../services/departmentService');
const DepartmentService = new departmentService(db.Department, db.CostCenter);

const departmentController = require('../controllers/departmentController');
const DepartmentController = new departmentController(DepartmentService);

router.post('/newDepartment', function(req, res, next) {
    DepartmentController.create(req, res);
});

module.exports = router;