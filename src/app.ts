import express from "express"

// Routes
import routes from "./routes/routes"

// DB connect
import ConnectDB from "./database/connection"

const app = express()
app.use(express.json())
ConnectDB()

app.use(routes)

export default app