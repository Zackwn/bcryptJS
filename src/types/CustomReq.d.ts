import { Request } from "express"

export interface CustomReq extends Request {
    User_id: string | object
}