'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose

const schema = new Schema({
  creationDate: {type: Date, default: Date.now},
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    get: (v) => {
      console.log('getter::', v)
      return {_id: v._id}
    },    
    set: (v) => {
      console.log('setter::', v)
      return {_id: v._id}
    },
  },
  title: {type: String, required: true, trim: true,},
  images: [{url: String}],
  body: {type: String, required: true, trim:true},
})

module.exports = {
  Post: mongoose.model('Post', schema),
  post: schema
} 
