const Bootcamp = require('../models/Bootcamp');

exports.getBootcamps = (req,res,next) =>{
    res.status(200).json({data:'hi bootcamps get'});
}

exports.getBootcamp = (req,res,next) =>{
    res.status(200).json({data:`Show bootcamp get ${req.params.id}` });
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
        res.status(400).json({success: false, error: err});
    }
    
}
exports.updateBootcamp = (req,res,next) =>{
    res.status(200).json({data:`Update bootcamp put ${req.params.id}`});
}

exports.deleteBootcamp = (req,res,next) =>{
    res.status(200).json({data:`Delete bootcamp delete ${req.params.id}`});
}