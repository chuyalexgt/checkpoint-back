'use strict';

const utils = require('../core/utils');
const {User} = require('../models/user/index')

module.exports = {
  async isAuth(req, res, next) {
    if (req.headers.authorization) {
      const { authorization } = req.headers

      const token = authorization
      try {
        const { sub } = utils.jwtDecode(token)
        const user = await User.findById(sub).exec()
        console.log(sub)
        req.body.user = user
        if (user) return next()
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
