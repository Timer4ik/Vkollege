const Router = require("express").Router
const router = Router()
const weekController = require("./week.controller.js")
const {checkWeekCreate, checkWeekUpdate} = require("./week.validator.js")

router.post("/week",checkWeekCreate,weekController.createWeek)
router.get("/week",weekController.getWeek)
router.get("/week/:id",weekController.getOneWeek)
router.delete("/week/:id",weekController.deleteWeek)
router.put("/week/:id",checkWeekUpdate,weekController.updateWeek)

module.exports = router