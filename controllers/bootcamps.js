const ErrorResponse = require('../utils/error-response');
const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async');

exports.getBootcamps = asyncHandler(async (req,res,next) =>{ 
    let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

    const bootcamps = await (query);
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