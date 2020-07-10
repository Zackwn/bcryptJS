import { Request, Response } from "express"
import bcrypt, { compareSync } from "bcryptjs"
import Users from "../database/models/UserSchema"

class UserController {
    async create(req: Request, res: Response) {

        const { name, email, password } = req.body
        const data = { name, email, password}

        try {

            // Buscando user no banco
            const IsUser = await Users.findOne({ email })

            // Verificando se o user existe
            if (IsUser) {
                return res.status(400).send("User alredy exists")
            }
    
            // const newUser = await new Users(data).save()
            const newUser = await Users.create(data)
    
            return res.status(200).json(newUser)
        } catch (err) {
            return res.status(500).send()
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params

            const user = await Users.findOne({_id: id})
            
            if (!user) {
                return res.status(400).send("User don't exists")
            }

            const { newName = user.name, newEmail = user.email, newPassword = false, password } = req.body

                                                     // User typed   DB password (hash)
            const isPasswordCorrect = await bcrypt.compare(password, user.password)

            if (!isPasswordCorrect) {
                return res.status(401).send("Incorrect password")
            }

            let DbPassword = ""
            if (newPassword) {
                DbPassword = await bcrypt.hash(newPassword, 8)
            } else {
                DbPassword = user.password
            }

            // const userUpdated = await Users.findOne({_id: id})

            const whatBeChanged = {
                "name": newName !== user.name ? newName : "Don't be changed",
                "email": newEmail !== user.email ? newEmail : "Don't be changed"
            }

            await user.updateOne({
                name: newName,
                email: newEmail,
                password: DbPassword
            })

            return res.json(whatBeChanged) // before the update
        } catch (err) {
            return res.status(500).send("Invalid id")
        }
    }

    async index(req: Request, res: Response) {
        try {
            const { page = 1, limit = 5 } = req.query
            
            const users = await Users.find()
                .skip((Number(page) - 1) * Number(limit))
                .limit(Number(limit))

            if (users.length === 0)
                return res.status(200).json("No users")

            const _Users = await Users.find()

            const MaxPages = Math.ceil(_Users.length / Number(limit))

            // const serializedUsers = users.map( user => {
            //     return user.name
            // })

            // res.header("X-Total-Count", String(MaxPages))
            
            const Response = {
                users,
                metadata: {
                    MaxPages
                }
            }

            return res.json(Response)
        } catch (err) {
            return res.status(500).send()
        }
    } 
}

export default new UserController


/*
    
*/