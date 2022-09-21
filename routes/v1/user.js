'use strict';

const router = require('express').Router();
const controller = require('../../controllers/v1/user')
const bodyValidator = require('../../middlewares/bodyValidator')
const {isAuth} = require('../../middlewares/auth')

router.post('/login', bodyValidator(['email', 'password']).isNotEmpty, controller.login)

router.post('/create',
  bodyValidator(['email', 'password']).isNotEmpty,
  controller.create
)

router.get('/get', isAuth, controller.getUser)

module.exports = router
