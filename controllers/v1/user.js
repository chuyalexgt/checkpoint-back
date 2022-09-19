'use strict';

const utils = require('../../core/utils')
const User = require('../../models/user/index')
const bcrypt = require('bcrypt');
const saltRounds = 10


module.exports = {
  async login(req, res) {
    const { username, password } = req.body
    try {
        const userData = await User.findOne({username});
        if(!userData){
            return res.status(400).json({
                message : 'usuario no registrado',
            })
        }
        if( !bcrypt.compareSync(password, userData.password) ){
            return res.status(400).json({
                message : 'no se pudo iniciar sesion, compruebe su informacion y vuelva a intentarlo',
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
      const { username, password } = req.body
      //encrypta la contraseña
      const cryptedPassword = bcrypt.hashSync(password, saltRounds)
      //crea el usuario
      const user = new User({ username, password: cryptedPassword })
      // guarda el usuario en db y ejecuta las validaciones del esquema
      await user.save()

      return res.status(200).json({ user })
    } catch (error) {
      console.error('create::', error)
      return res.status(500).send({ message: error.message })
    }
  },

  async getAll(req, res) {
    try {
      const { objectToMatch, exactMatch } = req.body
      // si se envia exactMatch se retornaran solamente los registros cuyo nombre coincida exactamente con objectToMatch
      if (exactMatch) {
        const filteredRegisters = await User.find(objectToMatch).exec()
        return res.status(200).json(filteredRegisters);
      } else {
        // buscamos todos los registros donde exista una coincidencia con el nombre
        objectToMatch.username = new RegExp(objectToMatch.username, 'i')
        const filteredRegisters = await User.find(objectToMatch).exec()
        return res.status(200).json(filteredRegisters);
      }
    } catch (error) {
      console.error('getAll::', error)
      return res.status(500).send({ message: error.message })
    }
  }
}

