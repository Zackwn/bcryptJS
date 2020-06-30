import { Request, Response } from "express"
import Users from "../database/models/UserSchema"
import { CustomReq } from "../types/CustomReq"

// Responses
import { CustomRes } from "../types/CustomRes"

export async  function Test(reqExpress: Request, resExpress: Response) {
    const res = resExpress as CustomRes
    try {
        const req = reqExpress as CustomReq

        const user = await Users.findById(req.User_id)
            
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