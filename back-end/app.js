require("dotenv").config()
var helmet = require("helmet")
const {createServer} = require("http")
const {Server} = require("socket.io")
const express = require('express')
const app = express()
const fileUpoad = require("express-fileupload")
const cookieParser = require("cookie-parser")


const httpServer = createServer(app)
global.io =new Server(httpServer)
module.exports = io

app.use(helmet())
app.use(express.json())
app.use(fileUpoad())
app.use(cookieParser())


//mongoDB connection 
const connectDB = require("./config/db")
connectDB();

var admins = []
var activeChats = []

const GetRandomAdmin = (admins)=>{
  return Math.floor(Math.random()*admins.length)
}

io.on("connection",(socket)=>{

  socket.on("admin is actve", (adminName) => {
    admins.push({ id: socket.id, admin: adminName });
  });

  socket.on("message from client",(mssg)=>{
   
    if(admins.length === 0){
      socket.emit("no admin", "");
    }else{
      let chat = activeChats.find((chat)=> chat.clientId === socket.id)
      if(chat){
        socket.broadcast.to(chat.adminId).emit("server sends client mssg to admin",{clientId : socket.id ,mssg : mssg})
      }else{
        let index = GetRandomAdmin(admins)
        activeChats.push({clientId : socket.id , adminId : admins[index].id})
        socket.broadcast.to(admins[index].id).emit("server sends client mssg to admin",{clientId : socket.id ,mssg : mssg})
      }
    }
  })

  socket.on("message from admin",(mssg)=>{
    socket.broadcast.emit("server sends admin mssg to client",mssg)
  })

  socket.on("disconnect", (reason) => {
    // admin disconnected
    const removeIndex = admins.findIndex((item) => item.id === socket.id);
    if (removeIndex !== -1) {
      admins.splice(removeIndex, 1);
    }

    activeChats = activeChats.filter((chat)=> chat.adminId !== socket.id)

    // user disconnected

    const removeIndex1 = activeChats.findIndex((item) => item.clientId === socket.id);
    if (removeIndex1 !== -1) {
      activeChats.splice(removeIndex1, 1);
    }
    socket.broadcast.emit("disconnected",socket.id)
  });

})



const ApiRouter = require("./Routes/api")
const { Module } = require("module")

app.use("/api",ApiRouter)

app.get("/",(req,res)=>{
   res.send("We are at home page")
 })

app.use((error,req,res,next)=>{
  if(process.env.NODE_ENV==="development"){
    res.status(500).json({
      message : error.message,
      stack : error.stack
    })
  }else{
    res.status(500).json({
      message : error.message,
    })
  }
})

httpServer.listen(5000,()=>{
    console.log("httpserver listening")
})