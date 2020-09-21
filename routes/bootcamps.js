const express = require('express');

const { getBootcamp, getBootcamps, updateBootcamp, deleteBootcamp,
     createBootcamp, bootcampPhotoUpload } = require('../controllers/bootcamps');
const courseRouter = require('./courses');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Bootcamp = require('../models/Bootcamp');
const advanceResults = require('../middleware/advanceResults');

router.use('/:bootcampId/courses', courseRouter);

router.route('/').get(advanceResults(Bootcamp, 'courses'),getBootcamps).post(protect,
     authorize('admin'),createBootcamp);

router.route('/:id').get(getBootcamp).put(protect, authorize('admin'), updateBootcamp).delete(protect, authorize('admin'), deleteBootcamp);
router.route('/:id/photo').put(bootcampPhotoUpload);

module.exports = router;