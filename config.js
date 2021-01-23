
var Sequelize = require('sequelize'); // library for mapping models

module.exports = new Sequelize('result1', 'root', '', {
    dialect: 'mysql'
});