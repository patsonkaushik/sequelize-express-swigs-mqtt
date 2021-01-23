const studentContoller = require('./../controllers/studentController')
const express = require('express');
const router = express.Router();


router
    .route('/')
    .get(studentContoller.getAllStudent)
    .post(studentContoller.createStudent)

router.get('/add', studentContoller.addStudent);



router
    .route('/:id')
    .get(studentContoller.getStudent)
    .patch(studentContoller.updateStudent)
    .delete(studentContoller.deleteStudent)


module.exports = router;