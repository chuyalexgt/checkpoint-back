'use strict';
const dotenv = require('dotenv');
dotenv.config()

const mongoose = require('mongoose');
mongoose.Promise = global.Promise

const { DB_USER, DB_PASSWORD, DB_DATABASE, DB_HOST } = process.env
const connectionUri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`
mongoose.connect(connectionUri).then(() => {
  // process.env.JWT_SECRET_KEY

  const app = require('./app')

  const PORT = 9009

  app.listen(PORT, () => {
    // se ejecuta cuando se monta el servidor
    console.log(`conectado al puerto: ${PORT}`)
  })
}).catch(err => {
  console.error(`Mongoose::`, err.message)
  console.log('finalizo la conexion')
}).finally(() => {
})

