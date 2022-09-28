const db = require('../db')

class UserController {

    async getUsers(req, res){
        const users = await db.query('SELECT * FROM \"User\" WHERE "IsDelete" = False')
        res.json(users.rows)
    }
    async getOneUser(req, res){
        const id = req.params.id
        const user = await db.query('SELECT * FROM \"User\" WHERE "ID" = $1 AND "IsDelete" = False', [id])
        res.json(user.rows[0])
    }
    async updateUser(req, res){
        const {Id, Login, Password} = req.body
        const user = await db.query('UPDATE "\User"\ SET "Login" = $2, "Password" = $3 WHERE "ID" = $1 AND "IsDelete" = False RETURNING *', [Id, Login, Password])
        res.json(user.rows[0])
    }
    async deleteUser(req, res){
        const id = req.params.id

        const user = await db.query('UPDATE \"User\" SET "IsDelete" = True WHERE "ID" = $1 AND "IsDelete" = False', [id])
        res.json(user.rows[0])
    }
}

module.exports = new UserController()