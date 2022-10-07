const db = require('../db')

class MessageController{
    async sendMessage(req, res) {
        const {Text, IdSender, IdRecipient} = req.body
        const uploadImagePath = req.file ? req.file.path : null
        const newUser = await db.query('INSERT INTO "Message" ("Text", "IdSender", "IdRecipient", "FilePath") VALUES ($1, $2, $3, $4) RETURNING *', [Text, IdSender, IdRecipient, uploadImagePath])
        res.json(newUser.rows[0])
    }
}

module.exports = new MessageController()