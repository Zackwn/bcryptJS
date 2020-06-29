import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import "dotenv/config"

// Types
import { CustomReq } from "../types/CustomReq"
import { CustomPayload } from "../types/CustomPayload"

export default async function auth (reqExpress: Request, res: Response, next: NextFunction) {
    try {
        const auth = reqExpress.headers.authorization

        if (!auth) 
            return res.status(401).send("sem headers token")
    
        const parts = auth.split(" ")
    
        if (parts.length !== 2)
            return res.status(401).send("Length diferente de 2")
    
        const [ scheme, token ] = parts
    
        if (!/^Bearer$/i.test(scheme))
            return res.status(401).send("sem Bearer na length 1")
    
        const payload = jwt.verify(token, String(process.env.APP_SECRET))
    
        // Types
        const Payload = payload as CustomPayload
        const req = reqExpress as CustomReq
    
        req.User_id = Payload.user_id
        next()
    } catch (err) {
        return res.status(401).send()
    }
}