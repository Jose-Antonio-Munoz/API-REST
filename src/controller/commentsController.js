const Comments = require('../models/comments')
const {createOneNotification}=require('../controller/notificationController')
const Post=require('../models/posts')
const {cachingData}=require('../cache/toCache')

exports.getAllComments=async(req,res)=>{
    try{
    const page=req.query.page||1
    const limit=req.query.limit||10
    const textQuery=new RegExp(req.query.textQuery,'i')||new RegExp('.*')
    const comments=await Comments.find({text:textQuery}).sort({created:-1}).skip((page-1)*limit).limit(limit);
    cachingData(req.originalUrl,comments,60000)
    res.status(200).json(comments)

    }catch(err){
        console.log(err)
        res.status(500).json({error:'error interno en el servidor'})
    }
} 
exports.getAllCommentsByPost=async(req,res)=>{
    try{
    const page=req.query.page||1
    const limit=req.query.limit||10
    const post_id=req.params.id
    const comments=await Comments.find({post_id:post_id}).sort({created:-1}).skip((page-1)*limit).limit(limit);

    cachingData(req.originalUrl,comments,60000)
    res.status(200).json(comments)

    }catch(err){
        console.log(err)
        res.status(500).json({error:'error interno en el servidor'})
    }
} 
exports.getAllCommentsByAuthor=async(req,res)=>{
    try{
    const page=req.query.page||1
    const limit=req.query.limit||10
    const author_id=req.params.id
    const comments=await Comments.find({author_id}).sort({created:-1}).skip((page-1)*limit).limit(limit);

    cachingData(req.originalUrl,comments,60000)
    res.status(200).json(comments)

    }catch(err){
        console.log(err)
        res.status(500).json({error:'error interno en el servidor'})

    }
} 
exports.getOneComment=async(req,res)=>{
    try{
        const comment=await Comments.findById(req.params.id)
        if(!comment){
            return res.status(404).json({error:'comentario no encontrado'})
        }
        res.status(200).json({comment})
    }catch(err){
        console.log(err)
        res.status(500).json({error:'error interno en el servidor'})
    }
}
exports.createOneComment=async(req,res)=>{
    try{
        const{text,post_id}=req.body
        const post =await Post.findById(post_id)

        const newComment=new Comments({
            text,
            author_id:req.id,
            authorUsuario:req.usuario,
            postTitle:post.title,
            post_id,
            created:new Date().toISOString()
        })
        
        await newComment.save()
        if(req.id!=post.author_id){
            await createOneNotification(post.author_id,post_id,post.title,newComment._id)
        }
        res.status(200).json(newComment)
    }catch(err){
        console.log(err)
        res.status(500).json({message:'error interno en el servidor'})
    }
}
exports.deleteOneComment=async(req,res)=>{
    try{
        const id=req.params.id
        const comment=await Comments.findById(id)
        if(!comment){
            return res.status(404).json({message:'error,no se ha encontrado un comentario con el id proporcionado'})
        }
        if(comment.author_id!=req.id){
            return res.status(403).json({message:'error,no eres el autor del comentario'})
        }
        await Comments.findByIdAndDelete(id)
        res.status(204).json({message:`el comentario ${comment.text} ha sido eliminado`})

    }catch(err){
        console.log(err)
        res.status(500).json({error:'error interno en el servidor'})
    }
}
exports.updateComment=async(req,res)=>{
    try{
        id=req.params.id
        let comment=await Comments.findById(id)
        if(!comment){
            return res.status(404).json('error, comentario no encontrado')
        }
        if(comment.author_id!=req.id){
            return res.status(403).json('error, no eres el autor del comentario')
        }
        const text=req.body.text
        comment=await Comments.findByIdAndUpdate(id,{text:text},{new:true}).select('text created')
        res.status(200).json({message:'se ha modificado exitosamente el comentario',comment:comment})
    }catch(err){
        console.log(err)
        res.status(500).json({error:'error interno en el servidor'})
    }
    
}