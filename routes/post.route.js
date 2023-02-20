const express=require('express')
const {PostModel}=require("../model/post.model")

const bcrypt=require("bcrypt")
const postRouter=express.Router()


postRouter.get("/",async(req,res)=>{

       try {
          const allpost= await PostModel.find({userID:req.body.userID})
          res.send(allpost)
       } catch (error) {
        res.send(error)
       }
})

postRouter.post("/create",async(req,res)=>{

     try {
         const payload=req.body
      //   console.log(payload)
         const createPost=new  PostModel(payload)
        // console.log(createPost)
         await createPost.save()
         res.send(createPost)

     } catch (error) {
        res.send(error)
     }
})



postRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const post= PostModel.findOne({"_id":id})
    const userID_in_post=post.userID
    const userID_in_making_req=req.body.userID
    try {
         if(userID_in_making_req!==userID_in_post){
            res.send("unathoriesed")
         }else{
            await PostModel.findByIdAndUpdate({"_id":id})
            res.send("updated")
         }
        

    } catch (error) {
       res.send(error)
    }
})






postRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    const post= PostModel.find({"_id":id})
    const userID_in_post=post.userID
    const userID_in_making_req=req.body.userID
    try {
         if(userID_in_making_req!==userID_in_post){
            res.send("unathoriesed")
         }else{
            await PostModel.findByIdAndDelete({"_id":id})
            res.send("deleted")
         }
        

    } catch (error) {
       res.send(error)
    }
})




postRouter.get("/top/:id",async(req,res)=>{
    console.log("helo")
    console.log(req.params.id)

    const post = await PostModel.find({"userID":req.params.id},{"no_if_comments":40})
    //{$max: {"imdb": 8}}
    let max=0;
    for(let i=0; i<=post.length-1; i++){

        max=(Math.max(post[0].no_if_comments),max)
    }
   // console.log(max)
    res.send(max)

    // const payload=req.body
    // const id=req.params.id
    // const post= PostModel.findOne({"_id":id})
    // const userID_in_post=post.userID
    // const userID_in_making_req=req.body.userID
    // try {
    //      if(userID_in_making_req!==userID_in_post){
    //         res.send("unathoriesed")
    //      }else{
    //       const maxcomment=  await PostModel.find({"no_if_comments":{max}})
    //         res.send(maxcomment)
    //      }
        

    // } catch (error) {
    //    res.send(error)
    // }

})




postRouter.get("/search",async(req,res)=>{
   
     const q=req.query
      
    try {
      
        

    } catch (error) {
       res.send(error)
    }
})





module.exports={postRouter}