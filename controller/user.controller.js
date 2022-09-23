const db = require('../db')
class UserController {
    async createUser(req, res) {
        const {login, password} = req.body
        const newUser = await db.query('INSERT INTO \"User\" (\"Login\", \"Password\") VALUES ($1, $2) RETURNING *',[login, password])

        res.json(newUser.rows[0])
    }
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
        const {id, login, password} = req.body
        const user = await db.query('UPDATE "\User"\ SET "Login" = $2, "Password" = $3 WHERE "ID" = $1 AND "IsDelete" = False RETURNING *', [id, login, password])
        res.json(user.rows[0])
    }
    async deleteUser(req, res){
        const id = req.params.id
        const user = await db.query('UPDATE \"User\" SET "IsDelete" = True WHERE "ID" = $1 AND "IsDelete" = False', [id])
        res.json(user.rows[0])
    }
}

module.exports = new UserController()