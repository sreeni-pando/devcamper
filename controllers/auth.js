const ErrorResponse = require('../utils/error-response');
const User = require('../models/user');
const crypto = require('crypto');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/send-email');

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
    sendTokenResponse(user, 200, res);
})


exports.getMe = asyncHandler(async(req, res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user});
});

exports.forgotPassword = asyncHandler(async(req, res,next)=>{
    const user = await User.findOne({ email: req.body.email});
    if(!user){
        return next( new ErrorResponse('User not exists', 404));
    }
    const resetToken = user.getResetPasswordToken();
    console.log('resettoken=',resetToken);
    await user.save({ validateBeforeSave : false})
    const resetUrl = `${req.protocol}://${req.get('host')}/api/resetpassword/${resetToken}`;
    const message = `Mail to reset password ${resetUrl}`;
    try {
       await sendEmail({
           email: user.email,
           subject: 'Reset password',
           message
       });
       return res.status(200).json({ success: true, data:'Email sent'})
    } catch(err){
        console.log(err);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false});
        return next(new ErrorResponse('Email not sent', 500));
    }
});
exports.resetPassword = asyncHandler(async(req, res,next)=>{
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken)
        .digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        // resetPasswordExpire :{ $gt: Date.now() }
    });
    if(!user){
        return next(new ErrorResponse('Invalid Token', 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
});
const sendTokenResponse = (user, statusCode, res) =>{
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now()+ 30*24*60*60*1000),
        httpOnly: true,
    };
    if(process.env.NODE_ENV==='production'){
        options.secure = true;
    }
    res.status(statusCode).cookie('token', token, options).json({ success: true, token });
}
