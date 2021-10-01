const express = require('express');
const morgan = require('morgan');
const app = express();

const route = require('./routes/index');

//MIDDLEWWARE
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
route(app);

module.exports = app;
