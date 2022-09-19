'use strict';

const router = require('express').Router();
const controller = require('../../controllers/v1/user')
const bodyValidator = require('../../middlewares/bodyValidator')

router.post('/login', bodyValidator(['username', 'password']).isNotEmpty, controller.login)

router.post('/create',
  bodyValidator(['username', 'password']).isNotEmpty,
  controller.create
)

router.get('/get/all', bodyValidator('objectToMatch').isNotEmpty, controller.getAll)

module.exports = router
