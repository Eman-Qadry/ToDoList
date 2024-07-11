const express=require('express');
const app=express();
const bodyparser=require('body-parser');

app.use(bodyparser.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','OPTIONS, GET, POST, DELETE, PUT, PATCH');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
})

module.exports=app;
