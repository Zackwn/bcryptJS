import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import Users from "../database/models/UserSchema"
import { User } from "../types/User"

class UserController {
    async create(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body
            const data = { name, email, password}
    
            const IsUser = await Users.findOne({ email })
    
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
                return res.status(400).send()
            }

            const _User = user as unknown as User

            const { newName = _User.name, newEmail = _User.email, newPassword = false, password } = req.body

                                                     // User typed   DB password (hash)
            const isPasswordCorrect = await bcrypt.compare(password, _User.password)

            if (!isPasswordCorrect) {
                return res.status(401).send("Incorrect password")
            }

            let DbPassword = ""
            if (newPassword) {
                DbPassword = await bcrypt.hash(newPassword, 8)
            } else {
                DbPassword = _User.password
            }



            const UpdatedUser = await user.updateOne({
                name: newName,
                email: newEmail,
                password: DbPassword
            })

            return res.json(UpdatedUser) // before the update
        } catch (err) {
            return res.status(500).send(err)
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

            return res.json(users)
        } catch (err) {
            return res.status(500).send()
        }
    } 
}

export default new UserController


/*
    
*/