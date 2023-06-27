const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

require('./models/calls');

const call = require('./api/router');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/', call);

module.exports = app;
