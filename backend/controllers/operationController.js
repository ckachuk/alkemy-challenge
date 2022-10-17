const db = require("../models");
var {body, validationResult} = require("express-validator");
const jwt_decode = require('jwt-decode');
const Operation = db.operations;
const Category = db.categories;
const  async = require('async')
const { Sequelize } = require('sequelize');

exports.getBalance = async(req, res, next)=>{
    const token = req.headers.authorization;
    const TokenArray = token.split(" ");
    const tokenDecoded = jwt_decode(TokenArray[1])
    async.parallel({
        operations: (callback)=>{
            Operation.findAll({
                    where:{
                        userId: tokenDecoded.id
                    },
                    include: [{
                        model: Category,
                        as: 'category'
                    }],
                    limit: 10,
            }).then((operations)=>{
                callback(null, operations)
            })
        },
        totalIncome: (callback)=>{
             Operation.findAll({
                    where:{
                        userId: tokenDecoded.id,
                        type: 'Income'
                    },
                    attributes: [
                      [Sequelize.fn('sum', Sequelize.col('amount')), 'total_amount'],
                    ],
                    group: ['userId'],
                    raw: true
            }).then((totalIncome)=>{
                callback(null, totalIncome)
            })
        },
        totalExpense: (callback)=>{
            Operation.findAll({
                where:{
                    userId: tokenDecoded.id,
                    type: 'Expense'
                },
                attributes: [
                  [Sequelize.fn('sum', Sequelize.col('amount')), 'total_amount'],
                ],
                group: ['userId'],
                raw: true
            }).then((totalExpense)=>{
                callback(null, totalExpense)
            })
        }
    },
    function(err, results){
        if(err){res.status(400).json({status:"FAILED", message:"Something bad happened"})}
        const balance =  results.totalIncome[0].total_amount - results.totalExpense[0].total_amount;
        res.json({status:"OK", message: "Get the last 10 operations", operations: results.operations, balance: balance})
    })
    
    
}

exports.getAllOperations = async(req, res, next)=>{
    const token = req.headers.authorization;
    const TokenArray = token.split(" ");
    const tokenDecoded = jwt_decode(TokenArray[1])
    try{
        const allOperations = await Operation.findAll({
            where:{
                userId: tokenDecoded.id
            },
            include: [{
                model: Category,
                as: 'category'
            }],
        })

        res.json({status:"OK", message: "All operations", operations: allOperations})
    }catch(err){
        console.log(err);
        res.status(400).json({status:"FAILED", message:"Something bad happened"})
    }
    
}

exports.getIncomeOperations = async(req, res, next)=>{
    const token = req.headers.authorization;
    const TokenArray = token.split(" ");
    const tokenDecoded = jwt_decode(TokenArray[1])
    try{
        const incomeOperations = await Operation.findAll({
            where:{
                userId: tokenDecoded.id,
                type: 'Income'
            },
            include: [{
                model: Category,
                as: 'category'
            }],
        })
        res.json({status:"OK", message: "Income type operations ", operations: incomeOperations})
    }catch(err){
        console.log(err);
        res.status(400).json({status:"FAILED", message:"Something bad happened"})
    }
}

exports.getExpenseOperations = async(req, res, next)=>{
    const token = req.headers.authorization;
    const TokenArray = token.split(" ");
    const tokenDecoded = jwt_decode(TokenArray[1])
    try{
        const expensesOperations = await Operation.findAll({
            where:{
                userId: tokenDecoded.id,
                type: 'Expense'
            },
            include: [{
                model: Category,
                as: 'category'
            }],
        })
        res.json({status:"OK", message: "Expense type operations", operations: expensesOperations})
    }catch(err){
        console.log(err);
        res.status(400).json({status:"FAILED", message:"Something bad happened"})
    }
}

exports.getOperation = async(req, res, next)=>{
    try{
        const operation = await Operation.findOne({
            where: {
                id: req.params.operationid
            },
            include: [{
                model: Category,
                as: 'category'
            }],
        })
        res.json({status:"OK", message: `You get the operation ${operation.id}`, operation})
    }catch(err){
        console.log(err);
        res.status(400).json({status:"FAILED", message:"Something bad happened"})
    }
}

exports.createOperation = [
    body('concept', 'Concept does not have to be empty').trim().isLength({min:1}).escape(),
    body('amount', 'Amount does not have to be zero').trim().isLength({min:1}).escape(),
    async (req, res, next)=>{
    var errors = validationResult(req.body);

    const token = req.headers.authorization;
    const TokenArray = token.split(" ");
    const tokenDecoded = jwt_decode(TokenArray[1])

    const operation = {
        concept: req.body.concept,
        amount: req.body.amount,
        date: req.body.date,
        type: req.body.type,
        userId: tokenDecoded.id,
        categoryId: req.body.categoryId
    }
    
    if(!errors.isEmpty()){
        res.json({status:"FAILED", message: errors.array()})
    }
    else{
        try{
            const operationCreated = await Operation.create(operation);

            res.json({status:"OK", message: "Operation has been created", operationCreated})
        }catch(err){
            console.log(err);
            res.status(400).json({status:"FAILED", message:"Something bad happened"})
        }
    }
}]

exports.updateOperation = [
    body('concept', 'Concept does not have to be empty').trim().isLength({min:1}).escape(),
    body('amount', 'Amount does not have to be zero').trim().isLength({min:1}).escape(),
    body('type', 'Name does not have to be empty').trim().isLength({min:1}).escape(),
    async (req, res, next)=>{
    var errors = validationResult(req.body);

    const token = req.headers.authorization;
    const TokenArray = token.split(" ");
    const tokenDecoded = jwt_decode(TokenArray[1])

    const operation = {
        concept: req.body.concept,
        amount: req.body.amount,
        date: req.body.data,
        userId: tokenDecoded.id,
        categoryId: req.body.categoryId
    }
    
    if(!errors.isEmpty()){
        res.json({status:"FAILED", message: errors.array()})
    }
    else{
        Operation.update(operation, {where: {
                id: req.params.operationid
        }}).then(()=>{
            res.json({status:"OK", message: "Operation has been updated"})
        }).catch((err)=>{
            console.log(err);
            res.status(400).json({status:"FAILED", message:"Something bad happened"})
        })
    }  
}]

exports.deleteOperation = (req, res, next)=>{
    Operation.destroy({
        where: {
            id: req.params.operationid
        }
    }).then(()=>{
        res.json({status:"OK", message: "Operation has been deleted"})
    }).catch((err)=>{
        console.log(err);
        res.status(400).json({status:"FAILED", message: "Something wrong happened"})
    })   
}