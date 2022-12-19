'use strict';

const utils = require('../../core/utils')
const { User, user } = require('../../models/user/index')
const {Post} = require('../../models/post/index')


module.exports = {
  async getLikesByPostId(req, res) {
    const { id } = req.query
    try {

      const postData = await Post.findById(id).select('likes').populate({
        path: 'post',
        model: 'Post'
      }).exec();
      if (!postData) {
        return res.status(400).json({
          message: 'publicación no encontrado',
        })
      }
      return res.status(200).json(postData)


    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  },

  async addLikeByPostId(req, res) {
    const { email, password } = req.body
    try {

      const userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({
          message: 'usuario no registrado',
        })
      }
      if (!bcrypt.compareSync(password, userData.password)) {
        return res.status(400).json({
          message: 'no se pudo iniciar sesión, compruebe su información y vuelva a intentarlo',
        })
      }
      //encriptar con jwt el id

      const jwtToken = utils.jwtEncode(userData._id)
      return res.status(200).json({ jwtToken })


    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  },
}

