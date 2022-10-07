const passport = require('passport')
const Router = require('express')
const router = new Router()
const messageController = require('../controller/message.controller')
const upload = require('../middleware/upload')


router.post('/', passport.authenticate('jwt', {session:false}), upload.single('image') ,messageController.sendMessage)

module.exports = router