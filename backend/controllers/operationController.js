const db = require("../models");
var {body, validationResult} = require("express-validator");
const jwt_decode = require('jwt-decode');
const Operation = db.operations;
const Category = db.categories;

exports.getBalance = async(req, res, next)=>{
    const token = req.headers.authorization;
    const TokenArray = token.split(" ");
    const tokenDecoded = jwt_decode(TokenArray[1])
    try{
        const balance = await Operation.findAll({
            where:{
                userId: tokenDecoded.id
            },
            include: [{
                model: Category,
                as: 'category'
            }],
            limit: 10,
        })

        res.json({status:"OK", message: "Get the last 10 operations", balance})
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
        res.json({status:"OK", message: "Income type operations ", incomeOperations})
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
        res.json({status:"OK", message: "Expense type operations", expensesOperations})
    }catch(err){
        console.log(err);
        res.status(400).json({status:"FAILED", message:"Something bad happened"})
    }
}

exports.getOperation = async(req, res, next)=>{
    try{
        const operation = await Operation.findAll({
            where: {
                id: req.params.operationid
            }
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
        date: req.body.data,
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
        type: req.body.type,
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