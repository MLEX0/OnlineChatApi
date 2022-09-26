const db = require('../db')

class ChatController {
    async getUserChatList(res, req){
        const id = res.params.id
        const chats = await db.query('SELECT DISTINCT "IdRecipient" FROM "Message" WHERE "IdSender" = $1 AND "IdRecipient" = $1', [id])
        req.json(chats.rows[0])
    }

    async getChatMessage(res, req){
        const {id_user, id_coach} = res.body
        const messages =
            await db.query('SELECT * FROM "Message" WHERE "IdRecipient" = $1 AND "IdSender" = $2 OR "IdRecipient" = $2 AND "IdSender" = $1 ORDER BY "SendTime"', [id_user, id_coach])
        req.json(messages.rows)
    }
}

module.exports = new ChatController()