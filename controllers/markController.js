const Mark = require('./../models/markModel');
const Student = require('./../models/studentModel');


exports.getAllMark = async (req, res) => {
    var mark = await Mark.findAll({
        include: [{
            model: Student, as: 'StudentRef'
        }]
    })

    console.log(mark[0].dataValues.StudentRef.dataValues.firstName)
    //var mark = await Mark.findAll()

    res.render('mark', { mark: mark });
    // res.status(200).json({
    //     status: 'Success',
    //     message: 'Mark',
    //     data: mark
    // });
}

exports.getMark = async (req, res) => {
    var studentData = await studentAll()

    var mark = await Mark.findOne({ where: { id: req.params.id } })
    if (mark) {
        res.render('edit-mark', { mark: mark.dataValues, student: studentData });
    } else {
        res.redirect('mark');
    }
    // res.status(200).json({
    //     status: 'Success',
    //     message: 'Mark',
    //     data: mark
    // });
}

exports.addMark = async (req, res) => {

    var studentData = await studentAll()
    res.render('add-mark', { student: studentData });
}

exports.createMark = async (req, res) => {
    const { node, php, studentId } = req.body;
    try {
        Mark.create({
            node, php, studentId
        })
            .then((mark) => {
                res.redirect('/mark')
                // res.status(201).json({
                //     status: 'Success',
                //     message: 'Mark add successfully',
                //     data: mark
                // });
            }).catch((error) => {
                res.status(404).send(error);
            })

    } catch (error) {
        res.status(404).send(error);
    }
}

exports.updateMark = async (req, res) => {
    try {
        const { node, php, studentId } = req.body;
        var mark = await Mark.findOne({ where: { id: req.params.id } });

        if (mark) {
            try {
                Mark.update({ node, php, studentId }, { where: { id: req.params.id } })
                res.redirect('/mark')
                //res.status(201).send("Mark update successfully");
            } catch (error) {
                res.status(404).send(error);
            }
        } else {
            res.status(404).send("Mark not found");
        }


    } catch (error) {
        res.status(404).send(error);
    }
}

exports.deleteMark = async (req, res) => {
    try {

        var mark = await Mark.findOne({ where: { id: req.params.id } });

        if (mark) {

            try {
                await Mark.destroy({
                    where: {
                        id: req.params.id
                    }
                })

                res.redirect('/mark')

                // res.status(204).json({
                //     status: 'Success',
                //     message: 'mark delete successfully',
                //     data: null
                // });

            } catch (error) {
                res.status(404).send(error);
            }

        } else {
            res.status(404).send("mark not found");
        }
    } catch (error) {
        res.status(404).send(error);
    }
}

async function studentAll() {
    var student = await Student.findAll();
    console.log(student)
    return student
}