'use strict';

const mongoose = require('mongoose');
const {user} = require('../user/index')
const { Schema } = mongoose

const schema = new Schema({
  creationDate: {type: Date, default: Date.now},
  author: user,
  title: {type: String, required: true, trim: true,},
  images: [{url: String}],
  body: {type: String, required: true, trim:true},
  likes: [user]
},{
  methods: {
    findAllPostsByAuthor(userId){
      return mongoose.model('post').find().where('author._id').equals(userId)
    }
  }
})



module.exports = {
  Post: mongoose.model('post', schema),
  post: schema
} 
