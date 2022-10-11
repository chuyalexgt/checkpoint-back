'use strict';

const jwt = require('jwt-simple');

module.exports = {
  jwtEncode(data) {
    const sessionStart = new Date()
    const sessionExpires = new Date()
    sessionExpires.setMinutes(sessionExpires.getMinutes() + 5)
      const payload = {
        sub: data,
        // iat: sessionStart.getTime() / 1000,
        // exp: sessionExpires.getTime() / 1000
      }
      return jwt.encode(payload, process.env.JWT_SECRET_KEY)
  },

  jwtDecode (jwtToken) {
    return jwt.decode(jwtToken, process.env.JWT_SECRET_KEY)
  }
}
