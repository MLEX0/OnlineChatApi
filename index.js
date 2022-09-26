const express = require('express')
const userRouter = require('./routes/user.routes')
const messageRouter = require('./routes/message.routes')
const chatRouter = require('./routes/chat.routes')

const PORT = process.env.PORT || 1111

const app = express()

app.use(express.json())
app.use('/api', userRouter)
app.use('/api', messageRouter)
app.use('/api', chatRouter)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))