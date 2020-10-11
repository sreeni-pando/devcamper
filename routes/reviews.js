const express = require('express');

const router = express.Router({ mergeParams: true });
const Review = require('../models/reviews');

const { getReviews, getReview } = require('../controllers/reviews');

const { protect, authorize } = require('../middleware/auth');
const advanceResults = require('../middleware/advanceResults');

router.route('/').get(advanceResults(Review,{
        path:'bootcamp',
        select: 'name description'
    }), getReviews
);
router.route('/:id').get(getReview);
module.exports = router;