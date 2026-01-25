require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors =require('cors')
const sequelize = require('./model/db');
const userRouter = require('./routes/demo/user');
const userLogin= require('./routes/login/login')
const refreshRouter = require('./routes/token/token')
const takemsmm=require('./routes/demo/takemsm')
const refresh=require('./routes/token/token')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(cookieParser())
app.use(cors())
app.use('/refresh',refresh)


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/refresh-token', refreshRouter)
app.use('/user',userRouter)
app.use('/send-code',userRouter)
app.use('/login',userLogin)
app.use('/takemsm',takemsmm)

sequelize.sync({ alter: true }).then(() => {
  console.log('同步成功');
}).catch(() => {
  console.log('同步失败');
})

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
