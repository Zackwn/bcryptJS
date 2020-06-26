import mongoose, { Query } from "mongoose"

export interface CustomThis extends mongoose.Document {
    password: string
}

export interface CustomQueryThis extends Query<any> {
    password: string
}