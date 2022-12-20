'use strict';

const utils = require('../../core/utils')
const { User, user } = require('../../models/user/index')
const { Post } = require('../../models/post/index')


module.exports = {
  async getLikesByPostId(req, res) {
    const { id } = req.params
    try {
      console.log('getLikes::', id)
      const postData = await Post.findById(id, 'likes').populate('likes').exec();
      if (!postData) {
        return res.status(400).json({
          message: 'publicación no encontrada',
        })
      }
      return res.status(200).json(postData)


    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  },

  async toggleLikeByPostId(req, res) {
    const { postId } = req.params
    const { _id: userId } = req.body.user
    try {
      const postData = await Post.findById(postId);
      if (!postData) {
        return res.status(400).json({
          message: 'publicación no encontrada',
        })
      }
      if (postData.likes.includes(userId)) {
        const updatedPost = await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true })
        return res.status(200).json({ updatedPost })
      } else {
        const updatedPost = await Post.findByIdAndUpdate(postId, { $push: { likes: userId } }, { new: true })
        return res.status(200).json({ updatedPost })
      }


    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  },
}

