import express from "express"
const routes = express.Router()

// Controllers
import UserController from "../controllers/userController"
import SessionController from "../controllers/sessionController"

routes.get("/", (_,res) => res.status(200).send())
routes.get("/users", UserController.index)

routes.put("/users/:id/edit", UserController.update)

routes.post("/create/user", UserController.create)

routes.post("/login", SessionController.login)

export default routes