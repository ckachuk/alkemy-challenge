const passport = require("passport");
const jwt = require('jsonwebtoken');
var {body, validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
var db = require('../models')
var User = db.users;
require('dotenv').config();

exports.postLogin = (req, res, next)=>{
    passport.authenticate("local",{session:false}, (err, user, msg)=>{
        
        if(err || !user){
            res.status(401).json({
                status: "FAILED",
                message: msg,
                user
            });
        }
        
        jwt.sign({_id: user._id, username: user.username}, process.env.JWT_KEY, {expiresIn: "24hr"}, (err, token)=>{
            if(err){return res.status(401).json(err)}

            res.json({
                status: "OK",
                token: token,
                user: {_id: user._id, username: user.username},
            })
        })
    })(req,res)
}


exports.postSignup = [
    body('username', "Username must not be less than 3 characters.").trim().isLength({min: 3}).escape(),
    body('email').isEmail(),
    body('password', "Paswword must not be less than 8 characters.").trim().isLength({min: 8}).escape(),
    async (req, res, next)=>{
        var errors = validationResult(req.body);

        const user = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        };
        
     
        if(!errors.isEmpty()){
            res.json({status: "FAILED",  message: errors.array()})
        }
        else{
           
            const checkIfUserExist = async (field, value)=>{
                const response = await User.findOne({
                    where: {
                        [field]: value,
                    }
                })
    
                if(response !== null){
                    return true;
                }
                else{
                    return false
                }
            }
    
            const userExist = await checkIfUserExist("username", user.username) 
            const emailExist = await checkIfUserExist("email", user.email) 
    
            if(userExist){
                return res.json({status: "FAILED",  message: 'The username has been used'})   
            }
            else if(emailExist){
                return res.json({status: "FAILED",  message: 'The email has been used'})
            }
            else{ 
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
                
                
                User.create(user).then(()=>{
                    res.json({status: "OK", message:"The user has been created"})
                }).catch((err)=>{
                    res.json({status: "FAILED", message:err})
                })
            }
        }

    }
]