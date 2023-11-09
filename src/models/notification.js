const mongoose =require('mongoose')

const notificationSchema= new mongoose.Schema({
    userToNotify:{type:mongoose.Schema.Types.ObjectId,ref:'usuarios',required:true,index:true},
    viewed:{type:Boolean,require:true},
    commentedPost:{type:mongoose.Schema.Types.ObjectId,ref:'posts',index:true},
    postTitle:{type:String},
    comment_id:{type:mongoose.Schema.Types.ObjectId,ref:'comments',index:true},
    created:{type:Date,require:true,index:true}
})

module.exports=mongoose.model('notifications',notificationSchema);