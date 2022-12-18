/// Realizar configuraciones del servidor e importacion de rutas
'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))

//importar rutas
require('./routes')(app)


module.exports = app;
