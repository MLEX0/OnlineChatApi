const passport = require('passport')
const Router = require('express')
const router = new Router()
const messageController = require('../controller/message.controller')


router.post('/', passport.authenticate('jwt', {session:false}) ,messageController.sendMessage)

module.exports = router