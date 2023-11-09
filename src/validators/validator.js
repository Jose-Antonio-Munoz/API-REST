const { body,check,query,validationResult } = require('express-validator');

exports.removeNonAlphanumeric = (field) => {
    return body(field).customSanitizer((value) => {
      return value.replace(/[^a-zA-Z0-9]/g, '');
    });
}
exports.idValidator=(field)=>{
    return check(field).isMongoId().notEmpty()
}
exports.paginationMin=(field1,field2)=>{
    return [query(field1).optional().isInt({min:1}),query(field2).optional().isInt({min:1})]
}
exports.errorHandler=async(req,res,next)=>{
    const result=validationResult(req)
    if(result.isEmpty()){
        return next()
    }
    return res.status(400).json({err:result.array()})
}
