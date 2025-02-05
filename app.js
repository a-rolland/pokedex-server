require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors = require("cors");

// Added
const errorHandler = require('./configs/error-handler');
require('rootpath')();

require("./configs/db");

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")));

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));



// default value for title local
app.locals.title = 'Pokédex';

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

const index = require('./routes/index');
app.use('/', index);

// global error handler
app.use(errorHandler);

app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/index.html");
  // res.sendFile(__dirname + "/build/index.html");
});

module.exports = app;
