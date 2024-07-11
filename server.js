const app =require('./app');
const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/ToDo').then(result=>{
    app.listen(3000,()=>{
        console.log("server is running")
    })
})
.catch(err=>{
    console.log(err);
});

