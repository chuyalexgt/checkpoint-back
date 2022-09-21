'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose

const schema = new Schema({
  email: {
    type: String, 
    required: true, 
    trim: true, 
    unique: true,
    validate: {
      validator: function(v) {
          const re = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
          return (!v || !v.trim().length) || re.test(v)
      },
      message: 'Formato de correo no válido'
  }
  },
  password: {
    type: String, 
    required: true, 
    trim: true
  },
  registerDate: {type: Date, default: Date.now}
})

//Mensaje para emails repetidos
schema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('El correo ya se encuentra registrado'));
  } else {
    next();
  }
});

//ocultar paramentros del esquema para que no se le devuelvan al usuario
schema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password
  return obj
}

module.exports = mongoose.model('user', schema)
