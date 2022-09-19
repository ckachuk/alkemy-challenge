var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categoryController');
var operationController = require('../controllers/operationController');
var authController = require('../controllers/authController');
var userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//operation routes

router.get('/api/operations', operationController.getBalance);

router.get('/api/operation/:idoperation', operationController.getOperation);

router.post('/api/operation', operationController.createOperation);

router.delete('/api/operation/:idoperation', operationController.deleteOperation);

router.post('/api/operation/:idoperation', operationController.updateOperation);


//category routes

router.get('/api/categories', categoryController.getCategories);

router.post('/api/category', categoryController.createCategory);

router.delete('/api/category/:idcategory', categoryController.deleteCategory);

router.post('/api/category/:idcategory', categoryController.updateCategory);

//auth routes

router.post('/api/login', authController.postLogin);

router.post('/api/signup', authController.postSignup);

module.exports = router;
