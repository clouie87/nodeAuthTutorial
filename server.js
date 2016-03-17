//set up our application

var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
//var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var pg           = require('pg');

var conString = process.env.DATABASE_URL;

var client = new pg.Client(conString);
//client.connect(function(err) {
//    if(err) {
//        return console.error('could not connect to postgres', err);
//    }
//    client.query('SELECT NOW() AS "theTime"', function(err, result) {
//        if(err) {
//            return console.error('error running query', err);
//        }
//        console.log(result.rows[0].theTime);
//        //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//        //client.end();
//
//
//    });
//});


//var configDB = require('./config/database.js');


// configuration ===============================================================
//mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ramkosalramkosal' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static("./app/public"));

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
var   api = require('./app/routes/api');
app.use('/api', api);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
