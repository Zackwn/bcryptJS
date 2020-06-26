import mongoose from "mongoose"
import "dotenv/config"

const dbStr = String(process.env.DB_STRING)

const connection = async() => {
    try {
        await mongoose.connect(dbStr, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        console.log("Mongo Ok")
    } catch (err) {
        return console.log("Mongo Error"+ err)
    }
}

export default connection