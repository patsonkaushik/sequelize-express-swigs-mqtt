var Sequelize = require('sequelize');
var sequelize = require('../config');
var Student = require('../models/studentModel');

var Mark = sequelize.define('marks', {
    node: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    php: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    }
});

Mark.belongsTo(Student, { as: 'StudentRef', foreignKey: 'studentId' });
Student.hasMany(Mark);

module.exports = Mark;