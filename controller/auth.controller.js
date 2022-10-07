const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')
const fs = require('fs');

class AuthController {

    async login(req, res){
        const {Login, Password} = req.body
        const candidate = await db.query('SELECT * FROM "User" WHERE "Login" = $1', [Login])
        if(candidate.rows[0]){

            const passwordResult = bcrypt.compareSync(Password, candidate.rows[0].Password)

            if(passwordResult){
                const token = jwt.sign({
                    ID: candidate.rows[0].ID,
                    Login: candidate.rows[0].Login
                }, keys.jwt, { expiresIn: 60 * 60 })

                res.status(200).json({
                    token: `${token}`,
                    IdUser: `${candidate.rows[0].ID}`,
                    UserImage: `${candidate.rows[0].UserImage}`
                })

            } else {
                res.status(200).json({
                    message: 'Wrong password'
                })
            }

        } else {
            res.status(200).json({
                message:'User with this login does not exist'
            })
        }
    }

    async register(req, res){
        const {Login, Password} = req.body
        const uploadImagePath = req.file ? req.file.path : null
        const candidate = await db.query('SELECT "Login" FROM "User" WHERE "Login" = $1', [Login])
        if(candidate.rows[0]){
            res.status(200).json({
                message:'User with this login is already exists'
            })
            if(uploadImagePath){
                fs.unlinkSync(uploadImagePath);
            }
        } else {
            const salt = bcrypt.genSaltSync(10)
            const genPassword = bcrypt.hashSync(Password, salt)

            try {
                const user = await db.query('INSERT INTO "User" ("Login", "Password", "UserImage") VALUES ($1, $2, $3) RETURNING *', [Login, genPassword, uploadImagePath])
                res.status(201).json(user.rows[0])
            }
            catch (ex){
                errorHandler(res, ex)
                if(uploadImagePath){
                    fs.unlinkSync(uploadImagePath);
                }
            }

        }
    }
}

module.exports = new AuthController()