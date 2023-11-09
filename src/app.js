const express=require('express')
const bodyParser=require('body-parser')

const app=express()

const connectToDB = require('./db')

const userRouter=require('./routes/userRoutes')
const commentsRouter=require('./routes/commentsRoutes')
const notificationRouter=require('./routes/notificationRoutes')
const postsRouter=require('./routes/postsRoutes')


const swaggerDefinition = require('../swaggerDef');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config()

const port=process.env.PORT

const options = {
  swaggerDefinition,
  apis: ['./routes/notificationRoutes.js','./routes/userRoutes.js','./routes/commentsRoutes.js','./routes/postsRoutes.js'], 
};
const swaggerSpec = swaggerJSDoc(options);

connectToDB()

app.listen(port,()=>{
    console.log(`el servidor esta escuchando en el puerto 3000`)
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api',userRouter)
app.use('/api',postsRouter)
app.use('/api',commentsRouter)
app.use('/api',notificationRouter)



