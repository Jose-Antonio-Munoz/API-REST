const Notification=require('../models/notification');
const {cachingData}=require('../cache/toCache')

exports.getAllNotificationsByUser=async(req,res)=>{
    try{
        const page=req.query.page||1
        const limit=req.query.limit||20
        userToNotify=req.id
        const notifications= await Notification.find({userToNotify}).sort({created:-1}).skip((page-1)*limit).limit(limit)
        cachingData(req.originalUrl,notifications,60000)
        res.status(200).json({notifications})
    }catch(err){
        console.log(err)
        res.status(500).json({message:'error interno en el servidor'})
    }

}
exports.getOneNotificationByUser=async(req,res)=>{
    try {
        const notification_id=req.params.id
        console.log(notification_id)
        const notification= await Notification.findById(notification_id)
        if(!notification){
            return res.status(400).json({message:'error, no se ha encontrado esa notificacion'})
        }
        if(notification.viewed===false){
            await Notification.findByIdAndUpdate(notification_id,{viewed:true})
        }
        res.status(200).json({notification})
    } catch (err) {
        console.log(err)
        res.status(500).json({message:'error interno en el servidor'})
    }
}

exports.createOneNotification=async(userToNotify,commentedPost,postTitle,comment_id)=>{
    let newNotification =new Notification({
        userToNotify,
        viewed:false,
        commentedPost,
        postTitle,
        comment_id,
        created:new Date().toISOString()
    })
    await newNotification.save()
}
exports.deleteOneNotification=async(req,res)=>{
    try{
        const notification_id=req.params.id
        const notification= await Notification.findById(notification_id)
        if(!notification){
            return res.status(400).json({message:'error, notificacion no encontrada'})
        }
        if(notification.userToNotify!=req.id){
            return res.status(400).json({message:'error, solo puedes eliminar tus notificaciones'})
        }
        await Notification.findByIdAndDelete(notification_id);
        res.status(200).json({message:'la notificacion fue eliminada de forma satisfacttoria'})
    }catch(err){
        console.log(err)
        res.status(500).json({message:'error interno en el servidor'})
    }

}