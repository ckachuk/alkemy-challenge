const db = require("../models");
const User = db.users;


exports.getUser = async(req, res, next)=>{
    try{
        const user = await User.findOne({
            where:{
                id: req.params.userid
            }
        })
        res.json({status:"OK", message: "Get an user", user})
    }catch(error){
        console.log(err);
        res.status(400).json({status:"FAILED", message:"Something bad happened"});
    }   
}
