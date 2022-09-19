'use strict'; 

const utils = require('../core/utils');
const {dbUsers} = require('../databases/users')

module.exports = {
  isAuth (req, res, next) {
    if(req.headers.authorization){
      const {authorization} = req.headers

      const [bearer, token] = authorization.split(' ')
      try {
        const {sub} = utils.jwtDecode(token)
        const usuario = dbUsers.find(user => user.id === sub)
        req.body.usuario = usuario
        if(usuario) return next()
      } catch (error) {
        return res.status(401).json({
          message: 'La sesion ha expirado'
        })
      }
    } 

    return res.status(401).json({
      message: 'you need to authenticate'
    })
  },
}
