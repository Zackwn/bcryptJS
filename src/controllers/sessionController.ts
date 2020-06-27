import { Request, Response } from "express"
import Users from "../database/models/UserSchema"
import { User } from "../types/User"
import bcrypt from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import "dotenv/config"

class SessionController {
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body 

            const user = await Users.findOne({email})

            if (typeof user === undefined) {
                console.log("User dont exists")
                return res.status(400).send("Aqui")
            }

            const _User = user as unknown as User

            const isPasswordCorrect = await bcrypt.compare(password, _User.password)

            if (!isPasswordCorrect) {
                console.log("Incorrect password")
                return res.status(401).send()
            }

            const token = jsonwebtoken.sign(
                {
                    user_id: _User.id
                },
                String(process.env.APP_SECRET),
                {
                    expiresIn: "2h"
                }
            )

            return res.json({ token })
        } catch (err) {
            return res.status(500).send()
        }
    }
}   

export default new SessionController