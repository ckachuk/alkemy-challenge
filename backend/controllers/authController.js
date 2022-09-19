
exports.postLogin = (req, res, next)=>{
    res.json({status:"OK", message: "login"})
}

exports.postSignup = (req, res, next)=>{
    res.json({status:"OK", message: "signup"})
}