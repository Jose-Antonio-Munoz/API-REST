const mongoose=require('mongoose')

const commentsSchema=new mongoose.Schema({
    text:{type:String,required:true},
    author_id:{type:mongoose.Schema.Types.ObjectId,ref:'usuarios',required:true,index:true},
    authorUsuario:{type:String,required:true,index:true},  
    postTitle:{type:String,require:true},
    post_id:{type:mongoose.Schema.Types.ObjectId,ref:'posts',required:true,index:true},
    created:{type:Date,required:true,index:true}

})
module.exports=mongoose.model('comments',commentsSchema)