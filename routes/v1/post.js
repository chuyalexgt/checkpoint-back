'use strict';

const router = require('express').Router();
const controller = require('../../controllers/v1/post')
// const bodyValidator = require('../../middlewares/bodyValidator')
const {isAuth} = require('../../middlewares/auth')

router.get('/likes/byPostId/:id', isAuth, controller.getLikesByPostId)
router.post('/toggle/like/byPostId/:postId', isAuth, controller.toggleLikeByPostId)

module.exports = router
