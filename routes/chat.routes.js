const Router = require('express')
const router = new Router()
const chatController = require('../controller/chat.controller')
const passport = require('passport')


router.get('/:id', passport.authenticate('jwt', {session:false}), chatController.getUserChatList)
router.get('/', passport.authenticate('jwt', {session:false}), chatController.getChatMessage)

module.exports = router