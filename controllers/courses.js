const ErrorResponse = require('../utils/error-response');
const Bootcamp = require('../models/Bootcamp');
const Courses = require('../models/course');

const asyncHandler = require('../middleware/async');


exports.getCourses = asyncHandler( async (req, res, next) =>{
    let query;

    const bootcampId = req.params.bootcampId;
    if(bootcampId){
        query = Courses.find({ bootcamp: bootcampId});
    } else {
        query = Courses.find({}).populate({
            path:'bootcamp',
            select: 'name ',
        });
    }

    const courses = await query;
    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses,
    })

});

exports.getCourse = asyncHandler( async (req, res, next) =>{
    
    const course = await Courses.findById(req.params.id).populate({
        path:'bootcamp',
        select: 'name description',
    });

    if(!course){
        return next( new ErrorResponse(`Course not found with id ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        count: 1,
        data: course,
    })

});

exports.addCourse = asyncHandler( async (req, res, next) =>{
    req.body.bootcamp = req.params.bootcampId;

   const bootcamp = await Bootcamp.findById(req.params.bootcampId);

    if(!bootcamp){
        return next( new ErrorResponse(`bootcamp not found with id ${req.params.bootcampId}`, 404));
    }
    const course = await Courses.create(req.body);
    res.status(200).json({
        success: true,
        count: 1,
        data: course,
    })

});