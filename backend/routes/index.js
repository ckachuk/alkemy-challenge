var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categoryController');
var operationController = require('../controllers/operationController');
var authController = require('../controllers/authController');
var userController = require('../controllers/userController');
const passport = require('passport')


//operation routes

router.get('/api/operations', passport.authenticate('jwt', {session: false}), operationController.getAllOperations);

router.get('/api/operations/balance', passport.authenticate('jwt', {session: false}), operationController.getBalance);

router.get('/api/operations/incomes', passport.authenticate('jwt', {session: false}), operationController.getIncomeOperations);

router.get('/api/operations/expenses', passport.authenticate('jwt', {session: false}), operationController.getExpenseOperations);

router.get('/api/operation/:operationid', passport.authenticate('jwt', {session: false}), operationController.getOperation);

router.post('/api/operation', passport.authenticate('jwt', {session: false}), operationController.createOperation);

router.delete('/api/operation/:operationid', passport.authenticate('jwt', {session: false}), operationController.deleteOperation);

router.post('/api/operation/:operationid', passport.authenticate('jwt', {session: false}), operationController.updateOperation);


//category routes

router.get('/api/categories', passport.authenticate('jwt', {session: false}), categoryController.getCategories);

router.post('/api/category', passport.authenticate('jwt', {session: false}), categoryController.createCategory);

router.get('/api/category/:categoryid', passport.authenticate('jwt', {session: false}), passport.authenticate('jwt', {session: false}), categoryController.getAllOperationsOfCategory);

router.delete('/api/category/:categoryid', passport.authenticate('jwt', {session: false}), categoryController.deleteCategory);


//auth routes

router.post('/api/login', authController.postLogin);

router.post('/api/signup', authController.postSignup);

module.exports = router;


//user routes

router.get('/api/user/:userid', passport.authenticate('jwt', {session: false}), userController.getUser)