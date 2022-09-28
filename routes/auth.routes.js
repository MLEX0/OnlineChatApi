const Router = require('express')
const router = new Router()
const authController = require('../controller/auth.controller')
const upload = require('../middleware/upload')

router.get('/login', authController.login)
router.post('/register', upload.single('image') ,authController.register)

module.exports = router