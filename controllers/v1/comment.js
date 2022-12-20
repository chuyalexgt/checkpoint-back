'use strict';

const { Comment } = require('../../models/comment/index')
const { Reply } = require('../../models/reply/index')


module.exports = {
  async getLikesByCommentId(req, res) {
    const { id } = req.params
    try {
      console.log('getLikes::', id)
      const commentsData = await Comment.findById(id, 'likes').populate('likes').exec();
      if (!commentsData) {
        return res.status(400).json({
          message: 'Comentario no encontrado',
        })
      }
      return res.status(200).json(commentsData)


    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  },

  async toggleLikeByCommentId(req, res) {
    const { commentId } = req.params
    const { _id: userId } = req.body.user
    try {
      const commentsData = await Comment.findById(commentId);
      if (!commentsData) {
        return res.status(400).json({
          message: 'publicación no encontrada',
        })
      }
      if (commentsData.likes.includes(userId)) {
        const updatedComment = await Comment.findByIdAndUpdate(commentId, { $pull: { likes: userId } }, { new: true })
        return res.status(200).json({ updatedComment })
      } else {
        const updatedComment = await Comment.findByIdAndUpdate(commentId, { $push: { likes: userId } }, { new: true })
        return res.status(200).json({ updatedComment })
      }


    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  },

  async addReplyByCommentId(req, res) {
    const { commentId } = req.params
    const { _id: userId } = req.body.user
    const { reply } = req.body
    try {
      const replyData = new Reply({ author: userId, repliedTo: commentId, body: reply.body });
      replyData.save();
      await Comment.findByIdAndUpdate(commentId, {$push: {replies: replyData}})
      return res.status(200).json({ replyData })


    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  },

  async allRepliesByCommentId(req, res) {
    const { commentId } = req.params
    try {
      const repliesList = Comment.findById(commentId, 'replies').populate('replies').exec()
      return res.status(200).json({ repliesList })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  },
}

