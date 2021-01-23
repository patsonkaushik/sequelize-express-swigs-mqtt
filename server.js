var app = require('express')(),
    swig = require('swig'),
    people;

const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
var methodOverride = require('method-override')

const sequelize = require('./config');
const studentRouter = require('./routes/studentRouter');
const markRouter = require('./routes/markRouter');



const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'))

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

app.use(methodOverride('X-HTTP-Method')) //          Microsoft
app.use(methodOverride('X-HTTP-Method-Override')) // Google/GData
app.use(methodOverride('X-Method-Override')) //      IBM

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))



app.get('/', function (req, res) {

    res.render('index', { title: 'Swig Primer!' });

});

app.use('/student', studentRouter);
app.use('/mark', markRouter);
