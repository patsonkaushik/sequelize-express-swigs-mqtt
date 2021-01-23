var Sequelize = require('sequelize');
var sequelize = require('../config');

var Student = sequelize.define('student', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING
});

module.exports = Student;