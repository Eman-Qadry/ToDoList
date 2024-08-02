const jwt= require('jsonwebtoken');
exports.isAuth=(req,res,next)=>{
    // if (
    //     req.headers.authorization &&
    //     req.headers.authorization.startsWith('Bearer')
    //   ) {
    //     token = req.headers.authorization.split(' ')[1];
    //   }
    const token=req.get('Authorization').split(' ')[1];
    let decodedtoken;
try{

    decodedtoken =jwt.verify(token,'someSecretCode')
}
catch(err){
    err.statusCode=500;
    throw err;
}
 if (!decodedtoken){
    const err=new Error('Not Authorized yet!');
    err.statusCode=401;
    throw err;
 }
    req.userId=decodedtoken.userId;
    next();
};