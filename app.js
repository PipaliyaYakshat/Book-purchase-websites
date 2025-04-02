var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userRouter = require('./routes/user')
var categoriesRouter = require('./routes/category')
var booksRouter = require('./routes/books')
var orderRouter =require('./routes/order')
var paymentRouter = require('./routes/payment')
var bookinformationRouter = require('./routes/BookInformation')
var feedbackRouter = require('./routes/Feedback')
var cors = require('cors')

var mongoose = require('mongoose')

// mongoose.connect('mongodb://0.0.0.0:27017/Book')
mongoose.connect(process.env.MD_URL)
  .then(() => {
    console.log("connection success");

  })
  .catch((error) => {
    console.log(error);

  })
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/',userRouter);
app.use('/category',categoriesRouter);
app.use('/books',booksRouter);
app.use('/order',orderRouter);
app.use('/payment',paymentRouter);
app.use('/BookInformation',bookinformationRouter);
app.use('/Feedback',feedbackRouter);
app.use(cors())

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
