const ErrorResponse = require('../utils/error-response');
const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async');

exports.getBootcamps = asyncHandler(async (req,res,next) =>{ 
    const bootcamps = await Bootcamp.find();
    if(bootcamps){
        return res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
        })
    }
    res.status(404).json({success: false})
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
     const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body);
    if(bootcamp){
        return res.status(200).json({data: bootcamp});
    }
    res.status(404).json({success: false});
    
});

exports.deleteBootcamp = asyncHandler(async(req,res,next) =>{
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if(bootcamp){
        return res.status(200).json({data: bootcamp});
    }
    res.status(404).json({success: false}); 
});