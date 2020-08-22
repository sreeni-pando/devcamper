const express = require('express');

const { getBootcamp, getBootcamps, updateBootcamp, deleteBootcamp, createBootcamp } = require('../controllers/bootcamps');
const courseRouter = require('./courses');
const router = express.Router();

router.use('/:bootcampId/courses', courseRouter);

router.route('/').get(getBootcamps).post(createBootcamp);

router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp);

module.exports = router;