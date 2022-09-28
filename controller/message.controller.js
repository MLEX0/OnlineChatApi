const db = require('../db')

class MessageController{
    async sendMessage(req, res) {
        const {Text, IdSender, IdRecipient} = req.body
        //проверка по пользователю отправителю
        const newUser = await db.query('INSERT INTO "Message" ("Text", "IdSender", "IdRecipient") VALUES ($1, $2, $3) RETURNING *', [Text, IdSender, IdRecipient])
        res.json(newUser.rows[0])
    }
}

module.exports = new MessageController()