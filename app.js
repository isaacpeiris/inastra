const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressEnforceSsl = require('express-enforces-ssl');
const axios = require('axios').default;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const apiRouter = require('./routes/api');

const app = express();
require('dotenv').config();

// Enforce SSL in production
if (app.get('env') === 'production') {
    app.enable('trust proxy');
    app.use(expressEnforceSsl());
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev', {
    skip: function(req, res) { return res.statusCode < 400 }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blog', blogRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Log all outbound HTTP requests in development
// if (process.env.NODE_ENV === 'development') {
//     axios.interceptors.request.use(request => {
//         console.log(`${request.method.toUpperCase()} ${request.url}`);
//         return request
//     });
// }

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', { title: err.statusCode + ' ' + err.message });
});

module.exports = app;
