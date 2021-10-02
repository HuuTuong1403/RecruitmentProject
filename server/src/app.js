const express = require('express');
const morgan = require('morgan');
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
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
route(app);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
