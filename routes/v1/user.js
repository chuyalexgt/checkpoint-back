'use strict';

const router = require('express').Router();
const controller = require('../../controllers/v1/user')
const bodyValidator = require('../../middlewares/bodyValidator')
const {isAuth} = require('../../middlewares/auth')

router.get('/get', isAuth, controller.getUser)

router.post('/login', bodyValidator(['email', 'password']).isNotEmpty, controller.login)

router.post('/create',
  bodyValidator(['email', 'password', 'nickname']).isNotEmpty,
  controller.create
)
router.post('/createNewPost', isAuth, controller.createNewPost)

router.put('/updateUserByBody', isAuth, controller.UpdateUserByBody)
router.put('/changePassword', isAuth, bodyValidator(['oldPassword', 'newPassword']).isNotEmpty, controller.changePassword)

module.exports = router
