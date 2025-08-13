const express = require("express")
const { loginController,callbackContorller,profileController } = require("../controllers/userControllers")
const authWare = require("../middleware/authMiddleware")
const Router = express.Router()

Router.get("/login", loginController)
Router.get("/callback", callbackContorller)
Router.get("/profile", authWare, profileController)

module.exports = Router;