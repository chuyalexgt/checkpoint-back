'use strict';

const utils = require('../../core/utils')
const { User, user } = require('../../models/user/index')
const { Post } = require('../../models/post/index')
const bcrypt = require('bcrypt');
const saltRounds = 10


module.exports = {
  async login(req, res) {
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
  async create(req, res) {
    try {
      const { email, password, nickname } = req.body
      console.log('asdsadasd')
      //encrypta la contraseña
      const cryptedPassword = bcrypt.hashSync(password, saltRounds)
      //crea el usuario
      const user = new User({ email, password: cryptedPassword, nickname })
      // guarda el usuario en db y ejecuta las validaciones del esquema
      await user.save()

      return res.status(200).json({ user })
    } catch (error) {
      console.error('create::', error)
      return res.status(500).send({ message: error.message })
    }
  },

  async getUser(req, res) {
    try {
      const { user } = req.body
      return res.status(200).json(user);
    } catch (error) {
      console.error('getUser::', error)
      return res.status(500).send({ message: error.message })
    }
  },

  async createNewPost(req, res) {
    try {
      const { user, postData } = req.body
      if (!postData?.title) {
        return res.status(500).send({ message: 'falta [title]' })
      }
      if (!postData?.body) {
        return res.status(500).send({ message: 'falta [body]' })
      }
      if (!postData?.images) {
        postData.images = []
      }
      const { title, body, images } = postData
      const post = new Post({ author: user, title, body, images })
      post.save()
      console.log('getUser::', post)
      user.addNewPost(post._id, user._id)
      return res.status(200).json(post);
    } catch (error) {
      console.error('getUser::', error)
      return res.status(500).send({ message: error.message })
    }
  },

  async UpdateUserByBody(req, res) {
    try {
      const { _id: userId } = req.body.user
      // el nickname y el usuario no se pueden cambiar asi que los quitamos del body 
      delete req.body.nickname
      delete req.body.email
      delete req.body.user
      const userBody = req.body
      console.log(userBody)
      if (!userId) {
        return res.status(500).send({ message: 'Se necesita el ID del usuario' })
      }
      const updatedUser = await User.findByIdAndUpdate(userId,
        {
          $set: userBody,
        },
        {
          new: true,
        }
      )
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error('getUser::', error)
      return res.status(500).send({ message: error.message })
    }
  },

  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body
      const { _id: userId } = req.body.user

      const userData = await User.findById(userId);
      if (!userData) {
        return res.status(400).json({
          message: 'usuario no registrado',
        })
      }
      if (oldPassword === newPassword) {
        return res.status(400).json({
          message: 'La nueva contraseña no puede ser igual a la anterior',
        })
      }
      if (!bcrypt.compareSync(oldPassword, userData.password)) {
        return res.status(400).json({
          message: 'la contraseña es incorrecta',
        })
      }
      const encryptedNewPass = bcrypt.hashSync(newPassword, saltRounds)
      userData.set('password', encryptedNewPass)
      await userData.save()
      return res.status(200).json(userData);

    } catch (error) {
      console.error('getUser::', error)
      return res.status(500).send({ message: error.message })
    }
  },
}

