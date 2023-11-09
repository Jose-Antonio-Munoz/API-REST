const jwt=require('jsonwebtoken')
require('dotenv').config()
const jwtSecret=process.env.JWTSECRET

exports.userAuth=async(req,res,next)=>{
    try{
        if(!req.headers.authorization){
            return res.status(401).json({ message: "No autorizado, el token no se encuentra disponible" })
        }
        const token = req.headers.authorization.split(' ')[1]
        await jwt.verify(token,jwtSecret,(err,decodeToken)=>{
            if(err){
                return res.status(401).json({message:"no autorizado",headers:req.headers.authorization})
            }
            req.id=decodeToken.id
            req.usuario=decodeToken.usuario
                next();

        })
    }catch(err){
        return res.status(500).json({ message: 'error interno del servidor', error: err});
    }
}