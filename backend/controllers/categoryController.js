var db = require('../models')
var {body, validationResult} = require("express-validator");
const jwt_decode = require('jwt-decode');
const Category = db.categories
const Operation = db.operations

exports.getCategories = async(req, res, next)=>{
    try{
        const categories = await Category.findAll()

        res.json({status:"OK", message: "All the categories", categories: categories })
    }catch(err){
        console.log(err);
        res.status(400).json({status:"FAILED", message:"Something bad happened"})
    }
    
}

exports.createCategory =[ 
    body('name', 'Name does not have to be empty').trim().isLength({min:1}).escape(),
    async (req, res, next)=>{
    var errors = validationResult(req.body);

    const category = {
        name: req.body.name
    }

    if(!errors.isEmpty()){
        res.json({status: "FAILED",  message: errors.array()})
    }
    else{ 
        try{
            const categoryCreated = await Category.create(category);

            return res.json({status:"OK", message: "The category has been created", category: categoryCreated})

        }catch(err){
            console.log(err);
            res.status(400).json({status:"FAILED", message:"Something bad happened"});
        }
    }
}]

exports.updateCategory = (req, res, next)=>{
    res.json({status:"OK", message: "Update a category"})
}

exports.deleteCategory = (req, res, next)=>{
    Category.destroy({
        where: {
            id: req.params.categoryid
        }
    }).then(()=>{
        res.json({status:"OK", message: "The category has been deleted"})
    }).catch((err)=>{
        console.log(err);
        res.status(400).json({status:"FAILED", message:"Something bad happened"})
    })
    
}

exports.getAllOperationsOfCategory = async (req, res, next)=>{
    const token = req.headers.authorization;
    const TokenArray = token.split(" ");
    const tokenDecoded = jwt_decode(TokenArray[1]);
    
    try{
        const category = await Category.findOne({
            where: {
                id: req.params.categoryid
            }
        })
    
        if(category !== null){
            try{
                const operations = await Operation.findAll({
                    where:{
                        userId: tokenDecoded.id,
                        categoryId: req.params.categoryid
                    }
                })
                if(operations !== null){
                    res.json({status:"OK", message: "Operations that have the category", operations, category})
                }
            }catch(err){
                console.log(err);
                res.status(400).json({status:"FAILED", message:"Something bad happened"})
            }
            
        }
    }catch(err){
        console.log(err);
        res.status(400).json({status:"FAILED", message:"Something bad happened"})
    }
}