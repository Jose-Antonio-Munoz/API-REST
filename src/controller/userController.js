const User =require('../models/users');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const {cachingData}=require('../cache/toCache')

exports.getUser= async(req,res)=>{
    try{
        const id=req.params.id
        const user=await User.findById(id).select('usuario email')
        if(!user){
            return res.status(404).json({message:'usuario no encontrado'})
        }

        return res.status(200).json({user})
    }catch(err){
        console.error(err);
        return res.status(500).json({status:err,message:'error interno en el servidor'})
    }
}
exports.getAllUsers=async(req,res)=>{
    try{
        const page=req.query.page||1
        const limit=req.query.limit||40
        const users=await User.find().skip((page-1)*limit).limit(limit).select('usuario email');

        await cachingData(req.originalUrl,users,60000)
        res.status(200).json(users)
    }catch(err){
        console.error(err);
        return res.status(500).json({status:err,message:'error interno en el servidor'})
    }
}
exports.createOneUser=async(req,res)=>{
    try{
        const {usuario,email,password}=req.body
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser= new User({
            usuario:usuario,
            email:email,
            password:hashedPassword,
            created:new Date().toISOString()
        })
        await newUser.save()
        res.status(201).json({message:`el usuario ${newUser.usuario} con el correo ${newUser.email} ha sido registrado satisfactoriamente`})
    }catch(err){
        console.error(err);
        res.status(500).json({message:'error interno en el servidor'})
    }
}

exports.loginUser= async(req,res)=>{
    try{
        jwtSecret=process.env.JWTSECRET
        const {email,password}=req.body

        const user=await User.findOne({email:email})
        if(!user){
            return res.status(404).json({error:'Usuario no encontrado'}) 
        }
        if(!await bcrypt.compare(password,user.password)){
            return res.status(401).json({ error: 'Los datos no coinciden con ningun usuario registrado' })
        }
        
        const maxAge= 3600 
        const token =jwt.sign({id:user._id,usuario:user.usuario},jwtSecret,{expiresIn:maxAge})

        res.status(200).json({message: 'Inicio de sesión exitoso',user_id:user._id,token})
        
    }catch(err){
        console.error(err);
        res.status(500).json({error:'error interno en el servidor'})
    }
}

exports.updateUser=async(req,res)=>{
    try{
        const id=req.id
        const oldPassword=req.body.oldPassword

        let user=await User.findById(id)
        if(!user){
            return res.status(404).json({message:'usuario no encontrado'})
        }
        if(!await bcrypt.compare(oldPassword,user.password)){
            return res.status(401).json({ error: 'No autorizado, la contraseña proveida no coincide con su contraseña actual' })
        }
        
        const newUsuario=req.body.NewUsuario || user.username
        const password=req.body.newPassword ||oldPassword
        const newPassword=await bcrypt.hash(password,10)

        user =await User.findByIdAndUpdate(id,{usuario:newUsuario,password:newPassword},{ new: true }).select('usuario')
        res.status(200).json({message:`se han aplicado los cambios al usuario:${user.usuario}`})
    }catch(err){
        console.error(err);
        res.status(500).json({error:'error interno en el servidor'})
    }
}