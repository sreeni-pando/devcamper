exports.getBootcamps = (req,res,next) =>{
    res.status(200).json({data:'hi bootcamps get'});
}

exports.getBootcamp = (req,res,next) =>{
    res.status(200).json({data:`Show bootcamp get ${req.params.id}` });
}
exports.createBootcamp = (req,res,next) =>{
    res.status(200).json({data:`create bootcamp get ` });
}
exports.updateBootcamp = (req,res,next) =>{
    res.status(200).json({data:`Update bootcamp put ${req.params.id}`});
}

exports.deleteBootcamp = (req,res,next) =>{
    res.status(200).json({data:`Delete bootcamp delete ${req.params.id}`});
}