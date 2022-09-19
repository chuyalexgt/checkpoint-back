'use strict';

const userRoutesV1 = require('./routes/v1/user')

module.exports = (app) => {
  app.use('/api/v1/user', userRoutesV1)
}
