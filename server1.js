var app = require('express')(),
    swig = require('swig'),
    people;

const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const Models = require('./models');
console.log(Models)

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const sequelize = new Sequelize('result', 'root', '', {
    dialect: 'mysql'
});



const studentRouter = require('./routes/studentRouter');
const markRouter = require('./routes/markRouter');

// This is where all the magic happens!
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);

swig.setDefaults({ cache: false });



sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been  established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database: ', err);
    });


sequelize.sync().then(function () {

}).then(function () {
    console.log('Connection to database established successfully.');
    app.listen(port, () => {
        console.log('Running server on port ' + port);
    });
});



var Student = sequelize.define('student', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING
});


var Mark = sequelize.define('mark', {
    node: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    php: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    }
});

app.get('/', function (req, res) {

    res.render('index', { title: 'Swig Primer!' });
    //res.render('index', { title: 'Superhero API' });
});

app.use('/student', studentRouter);
//app.use('/mark', markRouter);
