var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var bodyParser = require('body-parser')

// create a new name


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dashboardRouter=require('./routes/dashboard')
var con = mysql.createConnection({
    host: "remotemysql.com",
    user: "Aey8CXnvCQ",
    password: "F3HJ0Waq42",
    database:"Aey8CXnvCQ"
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
var app = express();

// view engine setup
global.con=con
global.bodyParser=bodyParser
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dashboard',dashboardRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
