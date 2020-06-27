import mongoose, { Query } from "mongoose"

export interface CustomThis extends mongoose.Document {
    password: string
}
