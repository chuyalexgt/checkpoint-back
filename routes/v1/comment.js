'use strict';

const router = require('express').Router();
const controller = require('../../controllers/v1/comment')
const {isAuth} = require('../../middlewares/auth')

router.get('/likes/byCommentId/:id', isAuth, controller.getLikesByCommentId)
router.post('/toggle/like/byCommentId/:commentId', isAuth, controller.toggleLikeByCommentId)
router.post('/add/reply/byCommentId/:commentId', isAuth, controller.addReplyByCommentId)
router.get('/allReplies/byCommentId/:commentId', isAuth, controller.allRepliesByCommentId)



module.exports = router
