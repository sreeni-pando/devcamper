const ErrorResponse = require('../utils/error-response');
const Bootcamp = require('../models/Bootcamp');

exports.getBootcamps = async (req,res,next) =>{
    try{
        const bootcamps = await Bootcamp.find();
        if(bootcamps){
            return res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamps
            })
        }
        res.status(404).json({success: false})
    } catch(err){
        next(err);
    }
}

exports.getBootcamp = async (req,res,next) =>{
    try{
        const bootcamps = await Bootcamp.findById(req.params.id);
        if(bootcamps){
            return res.status(200).json({
            success: true,
            data: bootcamps
            })
        }
        next(new ErrorResponse(`Bootcamp not found with id:${req.params.id}`, 404));
    } catch(err){
        next(err);
    }
}
exports.createBootcamp = async (req,res,next) =>{
    try{
        console.log('create',);
        const bootcamp = await Bootcamp.create(req.body);
        if(bootcamp){
            res.status(201).json({
                success: true,
                data:bootcamp 
            });
        } else {
            res.sendStatus(400);
        }
    } catch(err){
        // res.status(400).json({success: false, error: err});
        next(err);
    }
    
}
exports.updateBootcamp = async (req,res,next) =>{
    try{
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body);
        if(bootcamp){
            return res.status(200).json({data: bootcamp});
        }
        res.status(404).json({success: false});
    } catch(err){
        // res.status(400).json({error: err});
        next(err);
    }
    
}

exports.deleteBootcamp = async(req,res,next) =>{
    try{
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        if(bootcamp){
            return res.status(200).json({data: bootcamp});
        }
        res.status(404).json({success: false});
    } catch(err){
        // res.status(400).json({error: err});
        next(err);
    }
}