const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const authRouter=require('./routes/user');
const taskRouter=require('./routes/task');
app.use(bodyparser.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','OPTIONS, GET, POST, DELETE, PUT, PATCH');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
})
app.use('/task',taskRouter);
app.use('/auth',authRouter);

app.use((error,req,res,next)=>{
    const status=error.statusCode || 500;
    const data=error.data;
    const message=error.message;
    res.status(status).json({
        message:message,
        data:data
    });
});

module.exports=app;
