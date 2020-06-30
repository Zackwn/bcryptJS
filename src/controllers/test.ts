import { Request, Response } from "express"
import Users from "../database/models/UserSchema"
import { CustomReq } from "../types/CustomReq"


export async  function Test(reqExpress: Request, res: Response) {
    try {
        const req = reqExpress as CustomReq

        const user = await Users.findById(req.User_id)
            
        if (!user) 
            return res.status(404).send()
    
        const userRes = {
            name: user.name,
            email: user.email
        }
        
        return res.json(userRes)
    } catch (err) {
        return res.status(500).send()
    }
}