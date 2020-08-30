const ErrorResponse = require('../utils/error-response');
const Bootcamp = require('../models/Bootcamp');
const Courses = require('../models/course');

const asyncHandler = require('../middleware/async');


exports.getCourses = asyncHandler( async (req, res, next) =>{
    let query;

    const bootcampId = req.params.bootcampId;
    if(bootcampId){
        const courses = await Courses.find({ bootcamp: bootcampId});
        return res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        })
    } else {
        res.status(200).json(res.advancedResults);
    }

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

exports.updateCourse = asyncHandler( async (req, res, next) =>{
    let id = req.params.id;
    const data = req.body;
    const course = await Courses.updateOne({ _id: id}, { 
        $set: {
            title: data.title,
            description: data.description,
            weeks: data.weeks,
            tuition: data.tuition,
            minimumSkill: data.minimumSkill,
        }
    })
   
    if(!course){
        return next( new ErrorResponse(`Course not found with id ${req.params.id}`, 404));
    }
    
    res.status(200).json({
        success: true,
        count: 1,
        data: course,
    })

});

exports.deleteCourse = asyncHandler( async (req, res, next) =>{
    let id = req.params.id;
    const course = await Courses.findOne({ _id: id})
   
    if(!course){
        return next( new ErrorResponse(`Course not found with id ${req.params.id}`, 404));
    }
    await course.remove();
    
    res.status(200).json({
        success: true,
        count: 1,
        data: {},
    })

});