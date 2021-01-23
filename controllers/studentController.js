const Student = require('./../models/studentModel');
const Mark = require('./../models/markModel');

exports.getAllStudent = async (req, res) => {
    var student = await Student.findAll({
        include: [{
            model: Mark
        }]
    })
    console.log(student[0].dataValues.marks[0].dataValues)
    res.render('index', { student: student });

    // res.status(200).json({
    //     status: 'Success',
    //     message: 'Student All',
    //     data: student
    // });
}

exports.addStudent = async (req, res) => {
    res.render('add-student', {});
}

exports.getStudent = async (req, res) => {
    var student = await Student.findOne({ where: { id: req.params.id } })

    if (student) {
        res.render('edit-student', { student: student.dataValues });
    } else {
        res.redirect('/student')
    }


    // res.status(200).json({
    //     status: 'Success',
    //     message: 'Student',
    //     data: student
    // });
}

exports.createStudent = async (req, res) => {
    const { firstName, lastName } = req.body;
    try {
        await Student.create({
            firstName, lastName
        }).then((student) => {

            res.redirect('/student')
        }).catch((error) => {
            res.status(404).send(error);
        })


    } catch (error) {
        res.status(404).send(error);
    }
}

exports.updateStudent = async (req, res) => {
    try {
        const { firstName, lastName } = req.body;

        var student = await Student.update({ firstName, lastName }, { where: { id: req.params.id } })

        res.redirect('/student')
        // res.status(200).json({
        //     status: 'Success',
        //     message: 'Student update successfully',
        // });

    } catch (error) {
        res.status(404).send(error);
    }
}

exports.deleteStudent = async (req, res) => {
    console.log('aaaa')
    try {

        var student = await Student.findOne({ where: { id: req.params.id } });

        if (student) {

            try {
                await student.destroy({
                    where: {
                        id: req.params.id
                    }
                })

                res.status(204).json({
                    status: 'Success',
                    message: 'Student delete successfully',
                    data: null
                });

            } catch (error) {
                res.status(404).send(error);
            }

        } else {
            res.status(404).send("Student not found");
        }
    } catch (error) {
        res.status(404).send(error);
    }
}