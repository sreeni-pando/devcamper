const ErrorResponse = require('../utils/error-response');
const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async');
const path = require('path');

exports.getBootcamps = asyncHandler(async (req,res,next) =>{ 
    res.status(200).json(res.advancedResults);
    
});

exports.getBootcamp = asyncHandler(async (req,res,next) =>{ 
    const bootcamps = await Bootcamp.findById(req.params.id);
    if(bootcamps){
        return res.status(200).json({
        success: true,
        data: bootcamps
        })
    }
    next(new ErrorResponse(`Bootcamp not found with id:${req.params.id}`, 404));
    
});
exports.createBootcamp = asyncHandler(async (req,res,next) =>{  
    req.body.user = req.user.id;
    // const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });   
    const bootcamp = await Bootcamp.create(req.body);
    if(bootcamp){
        res.status(201).json({
            success: true,
            data:bootcamp 
        });
    } else {
        res.sendStatus(400);
    }
    
});
exports.updateBootcamp = asyncHandler(async (req,res,next) =>{
     let bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp){
        return res.status(404).json({success: false});
    }
    if(bootcamp.user.toString()!==req.user.id && req.user.role!== 'admin'){
        return next(new ErrorResponse(`User ${req.params.id} not authorized`, 401));
    }
    bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
    })
    return res.status(200).json({data: bootcamp});
});

exports.deleteBootcamp = asyncHandler(async(req,res,next) =>{
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if(bootcamp){
        return res.status(200).json({data: bootcamp});
    }
    res.status(404).json({success: false}); 
});

exports.bootcampPhotoUpload = asyncHandler(async(req,res,next) =>{
    const bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp){
        return next(new ErrorResponse(`bootcamp not found id 
        ${req.params.id}`),404); 
    }
    if(!req.files){
        return next(new ErrorResponse(`please upload file`, 400));
    }
    console.log(req.files);
    const file = req.files.file;
    if(!file.mimetype.startsWith('image')){
        return next(new ErrorResponse(`bad file upload, upload image file`, 400));
    }
    if(file.size > process.env.MAX_FILE_UPLOAD){
        return next(new ErrorResponse(`upload image file less size`, 400));
    }
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err =>{
        if(err){
            return next(new ErrorResponse(`upload image problem`, 500));
        }
    })
    res.status(200).json({
        success: true,
        data: file.name
    });
});

