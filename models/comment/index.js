'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose

const schema = new Schema({
  creationDate: { type: Date, default: Date.now },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  repliedTo: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  body: { type: String, required: true, trim: true },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: []
  }],
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Reply',
      default: []
    }
  ]
})

module.exports = {
  Comment: mongoose.model('Comment', schema),
  comment: schema
} 
