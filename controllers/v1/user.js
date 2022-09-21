'use strict';

const utils = require('../../core/utils')
const User = require('../../models/user/index')
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
      const { email, password } = req.body
      //encrypta la contraseña
      const cryptedPassword = bcrypt.hashSync(password, saltRounds)
      //crea el usuario
      const user = new User({ email, password: cryptedPassword })
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
  }
}

