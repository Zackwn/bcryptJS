import express from "express"
import cors from "cors"

// Routes
import routes from "./routes/routes"

// DB connect
import ConnectDB from "./database/connection"

const app = express()
app.use(express.json())
app.use(cors())
ConnectDB()

app.use(routes)

export default app