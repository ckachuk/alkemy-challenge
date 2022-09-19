exports.getCategories = (req, res, next)=>{
    res.json({status:"OK", message: "Get a category"})
}

exports.createCategory = (req, res, next)=>{
    res.json({status:"OK", message: "Create a category"})
}

exports.updateCategory = (req, res, next)=>{
    res.json({status:"OK", message: "Update a category"})
}

exports.deleteCategory = (req, res, next)=>{
    res.json({status:"OK", message: "Delete a category"})
}