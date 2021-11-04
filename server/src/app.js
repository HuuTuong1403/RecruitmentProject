const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const app = express();
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./middlewares/error');
const route = require('./routes/index');
//Implement cors
app.use(cors());
//Access-Controll-Allow-Origin
app.options('*', cors());
//MIDDLEWWARE
//Set security HTTP headers
app.use(helmet());

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//limit request from same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour',
// });
// app.use('/api', limiter);

//Body-parse, reading data from body into req.body
app.use(express.json());
//Data sanitization against noSQL query injection
app.use(mongoSanitize());
//Data sanitization against XXS
app.use(xss());
//Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['jobTitle', 'position', 'companyName', 'skills', 'createdAt'],
  })
);
route(app);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
