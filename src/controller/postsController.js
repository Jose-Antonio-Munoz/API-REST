const Posts=require('../models/posts');
const Comments = require('../models/comments')
const {cachingData}=require('../cache/toCache')

exports.createPost =async(req,res)=>{
    try{
        const {title,content}=req.body
        const newPost=new Posts({
            title,
            content,
            author_id:req.id,
            authorUsuario:req.usuario,
            created:new Date().toISOString()
        })
        await newPost.save()
        res.status(200).json(newPost)
    }catch(err){
        console.error(err);
        res.status(500).json({error:'error interno en el servidor'})
    }
}
exports.getOnePostById=async(req,res)=>{
    try{
        const id=req.params.id
        const post=await Posts.findById(id)
        if(!post){
            return res.status(404).json({message:'error, post no encontrado'})
        }
        res.status(200).json({post})
    }catch(err){
        console.error(err);
        res.status(500).json({error:'error interno en el servidor'})
    }
}
exports.getAllPosts=async(req,res)=>{
    try{
        const page=req.query.page||1
        const limit=req.query.limit||20
        const titleQuery = new RegExp(req.query.titleQuery,'i')||new RegExp('.*') 
        const contentQuery=new RegExp(req.query.contentQuery,'i')||new RegExp('.*') 

        const posts=await Posts.find({
            $and:[{title:titleQuery},{content:contentQuery}]
        }).sort({created:-1}).skip((page-1)*limit).limit(limit)

        await cachingData(req.originalUrl,posts,60000)
        res.status(200).json({posts})
    }catch(err){
        console.error(err);
        res.status(500).json({error:'error interno en el servidor'})
    }
}
exports.getAllPostsByAuthor=async(req,res)=>{
    try{
        const page=req.query.page||1
        const limit=req.query.limit||20
        const author_id=req.params.id
        const posts=await Posts.find({author_id:author_id}).sort({created:-1}).skip((page-1)*limit).limit(limit)
        if(!posts){
            return res.status(404).json({message:'no se han encontrado posts'})
        }
        cachingData(req.originalUrl,posts,60000)
        res.status(200).json(posts)
    }catch(err){
        console.error(err);
        res.status(500).json({error:'error interno en el servidor'})
    }
}
exports.deletePost=async(req,res)=>{
    try{
        const post_id=req.params.id        
        const post=await Posts.findById(post_id);
        if(!post){
            return res.status(404).json({message:'error, post no encontrado'})
        }
        if(post.author_id!=req.id){
            return res.status(403).json({message:'error, no eres el autor del post'})
        }
        await Comments.deleteMany({post_id:post._id}) //eliminar los comentarios asociados al post
        await Posts.findByIdAndDelete(post_id);
        return res.status(204).json()
    }catch(err){
        console.error(err);
        res.status(500).json({error:'error interno en el servidor'})
    }
}
exports.updatePost=async(req,res)=>{
    try{
        const post_id=req.params.id
        let post=await Posts.findById(post_id)

        if(!post){
            return res.status(404).json({message:'post no encontrado'})
        }
        if(post.author_id!=req.id){ 
            return res.status(403).json({message:'no eres el autor del post'})
        }   
        
        const tittle=req.body.tittle || post.tittle
        const content=req.body.content|| post.content

        post =await Posts.findByIdAndUpdate(post_id,{tittle,content},{ new: true })
        res.status(200).json({post})
    }catch(err){
        console.error(err)
        res.status(500).json({error:'error interno en el servidor'})
    }
}