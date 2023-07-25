import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dbConnect from './config/config.js'
import userAuthRouter from './routes/userAuthRouter.js'
import adminRouter from './routes/adminRouter.js' 
import vendorRouter from './routes/vendorRouter.js'





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
  


app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))



app.use('/',userAuthRouter)
app.use('/admin',adminRouter)
app.use('/vendor',vendorRouter)



app.listen(3000,()=>{
    console.log('server listening');
})







