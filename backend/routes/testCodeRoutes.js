const { getDirecController, reposController, getCodeController, summaryController } = require("../controllers/testCodeControllers");

const express = require("express");
const authWare = require("../middleware/authMiddleware");
const Router = express.Router()

Router.get("/directries/:fullrepopath/", authWare, getDirecController)
Router.get("/repos", authWare, reposController)
Router.get("/getCode",authWare, getCodeController)
Router.post("/summary", summaryController)

module.exports = Router;