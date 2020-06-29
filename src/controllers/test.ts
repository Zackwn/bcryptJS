import { Request, Response } from "express"
import Users from "../database/models/UserSchema"
import { CustomReq } from "../types/CustomReq"
import { User } from "../types/User"

export async  function Test(reqExpress: Request, res: Response) {
    try {
        const req = reqExpress as CustomReq

        const _user = await Users.findById(req.User_id)
        const user = _user as unknown as User
    
        if (!user) 
            return res.status(404).send()
    
        const userRes = {
            name: user.name,
            email: user.email
        }
        
        return res.json({ user: userRes })
    } catch (err) {
        return res.status(500).send()
    }
}