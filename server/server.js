import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dbConnect from './config/config.js'
import userAuthRouter from './routes/userAuthRouter.js'
import adminRouter from './routes/adminRouter.js' 
import vendorRouter from './routes/vendorRouter.js'
import userRouter from './routes/userRouter.js'
import 'dotenv/config.js'





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



app.listen(3000,()=>{
    console.log('server listening');
})







