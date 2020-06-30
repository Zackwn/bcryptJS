import { Response } from "express"

export interface CustomRes extends Response {
    JsonOk: Function,
    JsonBad: Function
}