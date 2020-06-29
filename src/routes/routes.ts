import express from "express"
const routes = express.Router()

// Controllers
import UserController from "../controllers/userController"
import SessionController from "../controllers/sessionController"
import { Test } from "../controllers/test"

// Middleware
import Auth from "../middlewares/auth"

routes.get("/users", UserController.index)

routes.put("/users/:id/edit", UserController.update)

routes.post("/create/user", UserController.create)

routes.post("/login", SessionController.login)

routes.use(Auth)

routes.get("/", Test)

export default routes