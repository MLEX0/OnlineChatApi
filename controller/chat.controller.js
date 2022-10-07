const db = require('../db')

class ChatController {
    async getUserChatList(res, req){
        const id = res.params.id
        const chats = await db.query('SELECT DISTINCT "IdRecipient", "IdSender" FROM "Message" WHERE "IdSender" = $1 OR "IdRecipient" = $1', [id])
        req.json(chats.rows)
    }

    async getChatMessage(res, req){
        const {IdUser, IdCoach} = res.body
        const messages =
            await db.query('SELECT * FROM "Message" WHERE "IdRecipient" = $1 AND "IdSender" = $2 OR "IdRecipient" = $2 AND "IdSender" = $1 ORDER BY "SendTime"', [IdUser, IdCoach])
        req.json(messages.rows)
    }
}

module.exports = new ChatController()