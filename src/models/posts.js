const mongoose=require('mongoose')

const postsSchema= new mongoose.Schema({
    title:{type:String,required:true,index:true},
    content:{type:String,required:true},
    author_id:{type:mongoose.Schema.Types.ObjectId,ref:'usuarios',require:true,index:true},
    authorUsuario:{type:String,require:true},
    created:{type:Date,require:true,index:true}
})

module.exports=mongoose.model('posts',postsSchema);