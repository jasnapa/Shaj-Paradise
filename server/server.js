import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dbConnect from './config/config.js'
import userAuthRouter from './routes/userAuthRouter.js'
import adminRouter from './routes/adminRouter.js' 
import vendorRouter from './routes/vendorRouter.js'
import userRouter from './routes/userRouter.js'
import { createServer } from 'http'
import chatRouter from './routes/chatRouter.js'
import messageRouter from './routes/messageRouter.js'
import 'dotenv/config.js'
import { Server } from 'socket.io'
import mongoSanitize from 'express-mongo-sanitize'





const app = express()

app.use(mongoSanitize())


app.use(
    cors({
      origin: [
        "http://localhost:5000",
      ],
      credentials: true,
    })
  );

  dbConnect()

  /////////////// socket io ////////////////////

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5000","http://shajparadise.surge.sh"
  ]
  },
});

let acitveUsers = []

io.on("connection",(socket)=>{
  
  //add new user
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!acitveUsers.some((user) => user.userId === newUserId)) {
      acitveUsers.push({ userId: newUserId, socketId: socket.id });
    }
    console.log(acitveUsers);
    // send all active users to new user
    io.emit("get-users", acitveUsers);
  });

  socket.on("disconnect", () => {
    // remove user from active users
    acitveUsers = acitveUsers.filter((user) => user.socketId !== socket.id);
    // send all active users to all users
    io.emit("get-users", acitveUsers);
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = acitveUsers.find((user) => user.userId === receiverId);
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  })
})



////////////////////////////////////////////////


app.use(express.json({limit:"50mb"}))
app.use(express.json({limit:"50mb"}))
app.use(cookieParser());
app.use(express.urlencoded({extended:true, limit:"50mb"}))



app.use('/user',userAuthRouter)
app.use('/admin',adminRouter)
app.use('/vendor',vendorRouter)
app.use('/',userRouter)
app.use('/chat',chatRouter)
app.use('/message',messageRouter)



server.listen(3000,()=>{
    console.log('server listening');
})
