import express from "express"
const routes = express.Router()

// Controllers
import UserController from "../controllers/userController"
import SessionController from "../controllers/sessionController"
import { Test } from "../controllers/test"

// Middleware
import Auth from "../middlewares/auth"

// Rotas sem autenticação
routes.get("/users", UserController.index)
routes.post("/create/user", UserController.create)
routes.post("/login", SessionController.login)
routes.put("/users/:id/edit", UserController.update)

routes.use(Auth)

// Rotas autenticadas
routes.get("/", Test)

export default routes