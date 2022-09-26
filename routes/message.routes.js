const Router = require('express')
const router = new Router()
const messageController = require('../controller/message.controller')


router.post('/message', messageController.sendMessage)

module.exports = router