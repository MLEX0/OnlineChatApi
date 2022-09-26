const Router = require('express')
const router = new Router()
const chatController = require('../controller/chat.controller')


router.get('/chat/:id', chatController.getUserChatList)
router.get('/chat', chatController.getChatMessage)

module.exports = router