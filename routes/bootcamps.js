const express = require('express');

const { getBootcamp, getBootcamps, updateBootcamp, deleteBootcamp,
     createBootcamp, bootcampPhotoUpload } = require('../controllers/bootcamps');
const courseRouter = require('./courses');
const router = express.Router();

const Bootcamp = require('../models/Bootcamp');
const advanceResults = require('../middleware/advanceResults');

router.use('/:bootcampId/courses', courseRouter);

router.route('/').get(advanceResults(Bootcamp, 'courses'),getBootcamps).post(createBootcamp);

router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp);
router.route('/:id/photo').put(bootcampPhotoUpload);

module.exports = router;