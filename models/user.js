const mongoose=require("mongoose");
const schema=mongoose.Schema;
const userSchema=new schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        reqired:true
    },
    password:{
        type: String,
        reqired:true
    },
    imgUrl:{
        type: String,

    }
    , tasks:[{
   type:mongoose.SchemaTypes.ObjectId,
    ref:'Task'
    }]
})
module.exports=mongoose.model('User',userSchema);