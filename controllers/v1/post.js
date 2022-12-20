'use strict';

const { Post } = require('../../models/post/index')
const { Comment } = require('../../models/comment/index')


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

  async addCommentByPostId(req, res) {
    const { postId } = req.params
    const { _id: userId } = req.body.user
    const { comment } = req.body
    try {
      const commentData = new Comment({ author: userId, repliedTo: postId, body: comment.body });
      commentData.save();
      await Post.findByIdAndUpdate(postId, {$push: {comments: commentData}})
      return res.status(200).json({ commentData })


    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  },

  async allCommentsByPostId(req, res) {
    const { postId } = req.params
    try {
      const commentsList = Post.findById(postId, 'comments').populate('comments').exec()
      return res.status(200).json({ commentsList })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  },

  // dev controllers
  async updateFields(req, res) {
    const { field } = req.params
    const { fieldDefaultVal } = req.body
    try {
      const response = await Post.updateMany({[field]: {$exists: false}}, {$set: {[field]: fieldDefaultVal}})
      return res.status(200).json({ response })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  }
}

