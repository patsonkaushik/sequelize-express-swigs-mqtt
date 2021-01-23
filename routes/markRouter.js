const markContoller = require('./../controllers/markController')
const express = require('express');
const router = express.Router();


router
    .route('/')
    .get(markContoller.getAllMark)
    .post(markContoller.createMark)

router.get('/add', markContoller.addMark);

router
    .route('/:id')
    .get(markContoller.getMark)
    .patch(markContoller.updateMark)
    .delete(markContoller.deleteMark)


module.exports = router;