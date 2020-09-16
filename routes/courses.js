const express = require('express');

const router = express.Router({ mergeParams: true });

const { getCourses, getCourse, addCourse, 
    updateCourse, deleteCourse } = require('../controllers/courses');
    const { protect } = require('../middleware/auth');
const Course = require('../models/course');
const advanceResults = require('../middleware/advanceResults');
router.get('/', advanceResults(Course,{ path: 'bootcamp', select: 'name description'} )
 ,getCourses);
router.get('/:id', getCourse);
router.post('/:bootcampId/create',protect, addCourse);
router.put('/:id', updateCourse);
router.delete('/:id',protect, deleteCourse)
module.exports = router;