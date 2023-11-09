const { body } = require('express-validator');

emailValidator=(field)=>{
    return body(field).trim().isEmail().escape().notEmpty()
}
usuarioValidator=(field)=>{
    return body(field).trim().isLength({min:3}).escape().notEmpty()
}
exports.atLeatsOneUpdate=(req,res,next)=>{
    if (!req.body.usuario && !req.body.newPassword) {
        return res.status(400).json({ error: 'debe incluir almenos el nuevo usuario o la nueva contraseña' });
    }
    next()
}
exports.newUserValidator=[usuarioValidator('usuario'),emailValidator('email'),body('password').escape().notEmpty()]
exports.userLogin=[emailValidator('email'),body('password').escape().notEmpty()]
exports.oldpasswordExist=[body('oldPassword').notEmpty()]