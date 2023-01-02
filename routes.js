'use strict';

const userRoutesV1 = require('./routes/v1/user')
const postRoutesV1 = require('./routes/v1/post')
const commentRoutesV1 = require('./routes/v1/comment')
const toolsRoutesV1 = require('./routes/v1/tools')

module.exports = (app) => {
  app.use('/api/v1/user', userRoutesV1)
  app.use('/api/v1/post', postRoutesV1)
  app.use('/api/v1/comment', commentRoutesV1)
  app.use('/api/v1/tools', toolsRoutesV1)
}
