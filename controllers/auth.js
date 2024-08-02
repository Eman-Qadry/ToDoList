const express= require('express');
const usermodel=require('../models/user');
const bcrypt=require('bcryptjs');
const{validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');
exports.signup=(req,res,next)=>{
const errors=validationResult(req);
if (!errors.isEmpty()){
    const error =new Error('validation failed!');
    error.statusCode=422;
    error.data=errors.array();
    throw error;

}
const name= req.body.name;
const email=req.body.email;
const password=req.body.password;
bcrypt.hash(password,12).then(hashedpass=>{
const user=new usermodel({
    email:email,
    password:hashedpass,
    name:name
});
return user.save();

})
.then(newone=>{

    res.status(201).json({
        message:'New user is created successfully.',
        userId:newone._id
    })
})
.catch(err=>{
    if (!err.statusCode)
        err.statusCode=500;
    next(err);
});
};


exports.login=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    let loadedUser;
    usermodel.findOne({email:email}).then(user=>{
    if (!user){
        const error= new Error('User with rhis email not found');
        error.statusCode=401;
        throw error;
    }
    loadedUser=user;
    return bcrypt.compare(password,user.password)
})
    .then(isEqual=>{
        if (!isEqual){
            const error= new Error('User password is not correct');
            error.statusCode=401;
            throw error;
        }
        const token= jwt.sign({
            email:email,
            userId:loadedUser._id
        },'someSecretCode',{expiresIn:'1h'});
        res.status(200).json({
            message:'user is logged In successfully',
            Token:token,
            userId:loadedUser._id
        });
    })
 
    .catch(err=>{
        if (!err.statusCode)
            err.statusCode=500;
        next(err);
    });
};

exports.forgotpassword=(req,res,next)=>{
    
}