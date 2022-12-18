'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
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
}, {
  methods: {
    addNewPost(newPost, userId){
      mongoose.model('user').findByIdAndUpdate(userId, newPost)
    }
  }
})


//Mensaje para emails repetidos
schema.plugin(uniqueValidator, {message: 'El {PATH} ya se encuentra registrado'});


//ocultar paramentros del esquema para que no se le devuelvan al usuario
schema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password
  return obj
}

module.exports = {
  User: mongoose.model('user', schema),
  user : schema
}
 
