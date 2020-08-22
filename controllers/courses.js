const ErrorResponse = require('../utils/error-response');
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

})