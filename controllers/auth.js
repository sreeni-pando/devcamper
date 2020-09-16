const ErrorResponse = require('../utils/error-response');
const User = require('../models/user');
const asyncHandler = require('../middleware/async');

exports.register = asyncHandler( async(req, res,next)=>{
    const { name, email, password, role} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        role
    })
    //create token
    const token = user.getSignedJwtToken();
    res.status(200).json({success: true, token});
});

exports.login = asyncHandler( async(req, res, next)=>{
    const { email, password } = req.body;
    if(!email || !password){
        return next(new ErrorResponse('Please provide email/password', 400));
    }
    const user = await User.findOne({ email }).select('+password');
    if(!user){
        return next(new ErrorResponse('Invalid Credentials', 401));
    }
    const isMatch = await user.matchPassword(password);
    if(!isMatch){
        return next(new ErrorResponse('Invalid Credentials', 401));
    }
    const token = user.getSignedJwtToken();
    res.status(200).json({ success: true, token });
})