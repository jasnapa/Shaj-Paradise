import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dbConnect from './config/config.js'
import userAuthRouter from './routes/userAuthRouter.js'
import adminRouter from './routes/adminRouter.js' 
import vendorRouter from './routes/vendorRouter.js'
import userRouter from './routes/userRouter.js'
// import { createServer } from 'http'
// import { Server } from 'socket.io'
import chatRouter from './routes/chatRouter.js'
import messageRouter from './routes/messageRouter.js'
import 'dotenv/config.js'
// import { Server } from 'socket.io'





const app = express()



app.use(
    cors({
      origin: [
        "http://localhost:5000",
      ],
      credentials: true,
    })
  );

  dbConnect()
  


app.use(express.json({limit:"50mb"}))
app.use(cookieParser());
app.use(express.urlencoded({extended:true, limit:"50mb"}))



app.use('/user',userAuthRouter)
app.use('/admin',adminRouter)
app.use('/vendor',vendorRouter)
app.use('/',userRouter)
app.use('/chat',chatRouter)
app.use('/message',messageRouter)



app.listen(3000,()=>{
    console.log('server listening');
})







