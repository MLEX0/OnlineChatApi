const db = require('../db')

class MessageController{
    async sendMessage(req, res) {
        const {text, sender_id, recipient_id} = req.body
        const newUser = await db.query('INSERT INTO "Message" ("Text", "IdSender", "IdRecipient") VALUES ($1, $2, $3) RETURNING *', [text, sender_id, recipient_id])
        res.json(newUser.rows[0])
    }
}

module.exports = new MessageController()