import express from "express"
const routes = express.Router()

// Controllers
import UserController from "../controllers/userController"
import SessionController from "../controllers/sessionController"
import { Test } from "../controllers/test"


import { Responses } from "../middlewares/responses"
// Middleware
import Auth from "../middlewares/auth"

routes.use(Responses)

// Rotas sem autenticação
routes.get("/users", UserController.index)
routes.post("/create/user", UserController.create)
routes.post("/login", SessionController.login)

routes.use(Auth)

// Rotas autenticadas
routes.put("/users/:id/edit", UserController.update)
routes.get("/", Test)

export default routes