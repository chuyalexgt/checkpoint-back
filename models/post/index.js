'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose

const schema = new Schema({
  creationDate: {type: Date, default: Date.now},
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {type: String, required: true, trim: true,},
  images: [{url: String}],
  body: {type: String, required: true, trim:true},
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: []
  }]
})

module.exports = {
  Post: mongoose.model('Post', schema),
  post: schema
} 
