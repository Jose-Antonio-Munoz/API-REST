const { body,param } = require('express-validator');
const {idValidator}=require('./validator')

textValidator=(field)=>{
    return body(field).trim().isLength({min:6,max:254})
}

exports.commentsValidator=[textValidator('text'),idValidator('post_id')]