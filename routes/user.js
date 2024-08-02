const express= require('express');
const router= express.Router();
const usermodel=require('../models/user');
const authcontroller=require('../controllers/auth');
const {check}=require('express-validator');
const  createuserValidationRules =[
check('email')
.notEmpty().withMessage('Email is required')
.isEmail().withMessage('Email is not valid')
.custom((value,{req})=>{
return usermodel.findOne({email:value}).then(user=>{
    if (user)
        return Promise.reject('Email address is already exists!');
});
})
,
check('password')
.trim()
.notEmpty().withMessage('Password is required')
.isLength({min:8}).withMessage('Password length must be at least 8 char')
,

check('name')
.trim()
.notEmpty().withMessage('Password is required')
.isString().withMessage('User name must be string ')
];
router
.route('/signup')
.put(createuserValidationRules,authcontroller.signup());






module.exports=router;