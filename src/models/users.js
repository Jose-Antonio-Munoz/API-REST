const mongoose=require('mongoose')

const UsuariosSchema= new mongoose.Schema({
    usuario:{type:String,unique:true,required:true,index:true},
    email:{type:String,unique:true,required:true,index:true},
    password:{type:String,required:true},
    created:{type:Date,required:true,
    validate: {
        validator: function(value) {
          return !isNaN(value);
        },
        message: 'Invalid date'
      }}
})
module.exports=mongoose.model("usuarios",UsuariosSchema);