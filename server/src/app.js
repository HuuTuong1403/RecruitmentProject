const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

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

module.exports = app;
