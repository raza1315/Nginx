const express=require("express");
const app=express();
app.listent(3000,()=>{
    console.log("server is up and running!");
})
app.get("/",(req,res)=>{
	res.status(200).json({Message:"You have been proxied to localhost:3000/"});
})

app.get("/test",(req,res)=>{
res.status(200).json(['testing','route']);
})
