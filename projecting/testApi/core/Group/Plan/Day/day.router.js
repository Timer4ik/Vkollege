const Router = require("express").Router
const router = Router()
const dayController = require("./day.controller.js")
const { checkDayCreate, checkDayUpdate } = require("./day.validator.js")

router.post("/day", checkDayCreate, dayController.createDay)
router.get("/day", dayController.getDay)
router.get("/day/:id", dayController.getOneDay)
router.delete("/day/:id", dayController.deleteDay)
router.put("/day/:id", checkDayUpdate, dayController.updateDay)

module.exports = router