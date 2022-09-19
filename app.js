/// Realizar configuraciones del servidor e importacion de rutas
'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')

const db = require('./db')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))

//importar rutas
require('./routes')(app)


app.get('/', (req, res) => {
  const {name = 'sin nombre2'} = req.query

  return res.status(200).json({
    data : {
      message: `fuck you ${name}`
    }
  })
})

//? para variables opcionales
app.get('/params/:name?', (req, res) => {

  const {name = 'sin nombre'} = req.params

  return res.status(200).json({
    data : {
      message: `fuck you con parametros ${name}`
    }
  })
})

app.put('/body', (req, res) => {

  const {name = 'sin nombre'} = req.body

  return res.status(200).json({
    data : {
      message: `fuck you con parametros ${name}`
    }
  })
})

module.exports = app;
