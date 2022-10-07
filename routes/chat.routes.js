const Router = require('express')
const passport = require('passport')
const router = new Router()
const chatController = require('../controller/chat.controller')
//const upload = require('../middleware/upload')


router.get('/:id', passport.authenticate('jwt', {session:false}), chatController.getUserChatList)
router.post('/', passport.authenticate('jwt', {session:false}), chatController.getChatMessage)

module.exports = router