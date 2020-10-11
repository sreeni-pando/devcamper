const ErrorResponse = require('../utils/error-response');
const Bootcamp = require('../models/Bootcamp');
const Reviews = require('../models/reviews');

const asyncHandler = require('../middleware/async');

exports.getReviews = asyncHandler( async (req, res, next) =>{

    const bootcampId = req.params.bootcampId;
    if(bootcampId){
        const reviews = await Reviews.find({ bootcamp: bootcampId});
        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        })
    } else {
        res.status(200).json(res.advancedResults);
    }

});

exports.getReview = asyncHandler( async (req, res, next) =>{

   console.log('req', req.params.id);
//    const review = await Reviews.findById(req.params.id).populate({
//        path: 'bootcamp',
//        select: 'name description'
//    });
    const review = await Reviews.find({})
   
   if(!review) {
       return next(new ErrorResponse(`No review found`, 404));
   }

   res.status(200).json({
       data: review
   });
});

