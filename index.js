var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var passport = require('passport');
var session = require('express-session');
var expressValidator = require('express-validator');
var mongoose = require('mongoose');
var routes = require('./router/api');

var bodyParser = require('body-parser');

// mongoose db connections
var dburl = 'mongodb://localhost:27017/loginapp';
mongoose.connect(dburl, function (err, db) {
    if (err) throw err;
    else
        console.log("connected..");
});
mongoose.connection.on('error', function () {
    console.log("error in db connections.");
});
mongoose.connection.on('success', function () {
    console.log("Connected");
});
// set the view engine to ejs
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// Express Session
app.use(session({
    secret: 'mySecretKey',
    saveUninitialized: true,
    resave: true
}));

// Connect Flash
app.use(flash());
// Global Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    next();
});

// Configuring Passport
app.use(passport.initialize());
app.use(passport.session());


app.use(expressValidator());
app.use(routes);

app.listen(3000, function () {
    console.log("start listening at port 3000");
});

