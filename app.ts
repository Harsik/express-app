const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
// const todos = require('./routes/todos');
const userRouter = require('./routes/users');
// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

const app = express();
require("dotenv").config();

const mongoose = require('mongoose');
// DB Connect
const DB_HOST = process.env.DB_HOST;
mongoose.connect(DB_HOST)
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/user', userRouter);
// app.use('/todo', todos);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });
// app.post('/', function (req, res) {
//   res.send('Got a POST request');
// });
// app.put('/user', function (req, res) {
//   res.send('Got a PUT request at /user');
// });
// app.delete('/user', function (req, res) {
//   res.send('Got a DELETE request at /user');
// });
module.exports = app;
