const { body } = require('express-validator');
const {idValidator}=require('./validator')

titleValidator=(field)=>{
    return body(field).trim().isLength({min:2,max:300}).escape()
}
contentValidator=(field)=>{
    return body(field).trim().isLength({min:5}).escape()
}
exports.atLeatsOneUpdate=(req,res)=>{
    if (!req.body.title && !req.body.content) {
        return errors.errors.push({ param1: 'At least one of param1 or param2 is required.' });
    }
    next()
}
exports.postValidator=[titleValidator('title'),contentValidator('content')]