
exports.getBalance = (req, res, next)=>{
    res.json({status:"OK", message: "Get balance"})
}

exports.getOperation = (req, res, next)=>{
    res.json({status:"OK", message: "Get an operation"})
}

exports.createOperation = (req, res, next)=>{
    res.json({status:"OK", message: "Create an operation"})
}

exports.updateOperation = (req, res, next)=>{
    res.json({status:"OK", message: "Update an operation"})
}

exports.deleteOperation = (req, res, next)=>{
    res.json({status:"OK", message: "Delete an operation"})
}