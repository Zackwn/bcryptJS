import { Request, Response, NextFunction } from "express"
// import { CustomRes } from "../types/CustomRes"
// import { CustomThisRes } from "../types/CustomThisRes"

// Consts
const TYPE_JSON = "application/json"
const JSON_OK = 200

export const Responses = (req: Request, resExpress: Response, next: NextFunction) => {
    const res = resExpress as any

    res.JsonOk = function (data: object | Array<any>, message: string, metadata: object) {

        message ? message : "Successful request."
        metadata ? metadata : {}

        res.type = TYPE_JSON
        res.status = JSON_OK

        return res.json({message, data, metadata, status: JSON_OK})
    }

    res.JsonBad = function () {
        console.log("JsonBad")
    }

    next()
}