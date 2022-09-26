const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
require('dotenv').config();
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
var db = require('./models')
var User = db.users;

passport.use(new LocalStrategy(async(username, password, cb)=>{

    if(username.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)){
        const user = await User.findOne({
            where:{
                "email": username
            }
        })

        if(!user){return cb(null, false, { error: 'Incorrect username' })}
        else{
            bcrypt.compare(password, user.password, (err, res)=>{
                if(res){
                    return cb(false, user)
                }
                else{
                    return cb(err, false, {error: "Incorrect password"} )
                }
            })
        }
    }
    else{
        const user = await User.findOne({
            where:{
                "username": username
            }
        })

        if(!user){return cb(null, false, { error: 'Incorrect username' })}
        else{
            bcrypt.compare(password, user.password, (err, res)=>{
                if(res){
                    return cb(false, user)
                }
                else{
                    return cb(err, false, {error: "Incorrect password"} )
                }
            })
        }
    }
    
}))


passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY
}, function(jwtPayload, cb){
  cb(null, jwtPayload)
}))