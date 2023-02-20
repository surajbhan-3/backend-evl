
const express=require('express')
const {connection}=require("./config/db")
require("dotenv").config()
const {userRouter}=require("./routes/Users.routes")
const {postRouter}=require("./routes/post.route")
const {authenticate}=require("./middlewares/authenticate.middleware")
const cors=require("cors")



const app=express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
     res.send("Welcome to homepage")
})


app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)




app.listen(process.env.port, async(req,res)=>{

          try {
            await connection
            console.log("mongodb is connected")
          } catch (error) {
            res.send(err)
          }
    console.log("Server is Running")
})









