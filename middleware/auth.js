const jwt = require('jsonwebtoken');

const asyncHandler = require('./async');
const ErrorResponse = require('../utils/error-response');
const User = require('../models/user');

exports.protect = asyncHandler(async(req, res, next)=>{
    let token;
    if(req.headers.authorization && 
        req.headers.authorization.startsWith('Bear')){
            token = req.headers.authorization.split(' ')[1];
            
    }
    //  else if(req.cookies.token) {
    //     token = req.cookies.token
    // }
    if(!token){
        return next(new ErrorResponse('Not Authorize ', 401));
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findOne({ _id: decoded.id});
        next();
    } catch(err){
        return next(new ErrorResponse('error ', 400));
    }
})