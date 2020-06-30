import mongoose, { Document } from "mongoose"
import bcrypt from "bcryptjs"
import { CustomThis } from "../../types/CustomThis"
const Schema = mongoose.Schema

interface User extends Document {
    name: string,
    email: string,
    password: string,
    createdAt?: Date
}

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    }
})

UserSchema.pre("save", async function(next) {
    const This = this as User
    if (This.password) {
        const hashedPassword = await bcrypt.hash(This.password, 8)
        This.password = hashedPassword
    }

    console.log("Save")
    next()
})

mongoose.model("users", UserSchema)
export default mongoose.model<User>("users")