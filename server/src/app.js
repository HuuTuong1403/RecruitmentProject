const express = require('express');
const route = require('./routes/index');

const app = express();
app.use(express.json());

route(app);

module.exports = app;
