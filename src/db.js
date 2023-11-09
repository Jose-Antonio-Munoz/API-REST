const mongoose=require('mongoose')

const connectToDB=async()=>{
    const dbURI=process.env.MONGODBURI
    await mongoose
    .connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{console.log("conexion establecida con mongoDB atlas")})
    .catch((err)=>{console.log("error conectando con mongoDB atlas", err)})
}
module.exports=connectToDB