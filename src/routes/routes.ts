import express from "express"
const routes = express.Router()

// Controllers
import UserController from "../controllers/userController"
import userController from "../controllers/userController"

routes.get("/", (_,res) => res.status(200).send())

routes.post("/create/user", UserController.create)

routes.get("/users", UserController.index)

routes.put("/users/:id/edit", UserController.update)

export default routes