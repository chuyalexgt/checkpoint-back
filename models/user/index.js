'use strict';

const mongoose = require('mongoose');
const constants = require('./constants');
const { Schema } = mongoose

const schema = new Schema({
  username: {
    type: String, 
    required: true, 
    lowercase: true, 
    trim: true, 
    unique: true,
    maxLength:15,
    minLength: 5
  },
  password: {
    type: String, 
    required: true, 
    trim: true
  },
  role: {
    type: Number, 
    default: constants.USUARIO,
    enum: [constants.ADMIN, constants.EMPRESA, constants.USUARIO]
  },
  registerDate: {type: Date, default: Date.now}
})

//ocultar paramentros del esquema para que no se le devuelvan al usuario
schema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password
  return obj
}

module.exports = mongoose.model('user', schema)
