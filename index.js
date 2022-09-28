const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const userRouter = require('./routes/user.routes')
const messageRouter = require('./routes/message.routes')
const chatRouter = require('./routes/chat.routes')
const authRouter = require('./routes/auth.routes')

const PORT = process.env.PORT || 1111

const app = express()

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(require('morgan')('dev'))
app.use('/uploads', passport.authenticate('jwt', {session:false}) ,express.static('uploads'))
//app.use(require('cors'))

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/message', messageRouter)
app.use('/api/chat', chatRouter)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))