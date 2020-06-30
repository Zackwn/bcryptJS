import { Request, Response } from "express"
import Users from "../database/models/UserSchema"
import { CustomReq } from "../types/CustomReq"
import { User } from "../types/User"

// Responses
import { CustomRes } from "../types/CustomRes"

export async  function Test(reqExpress: Request, resExpress: Response) {
    const res = resExpress as CustomRes
    try {
        const req = reqExpress as CustomReq

        const _user = await Users.findById(req.User_id)
        const user = _user as unknown as User
    
        if (!user) 
            return resExpress.status(404).send()
    
        const userRes = {
            name: user.name,
            email: user.email
        }
        
        return res.JsonOk(userRes, "User found")
    } catch (err) {
        return resExpress.status(500).send()
    }
}