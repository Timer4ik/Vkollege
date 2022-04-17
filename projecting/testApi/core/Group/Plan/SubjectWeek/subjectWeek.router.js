const Router = require("express")
const router = Router()
const subjectWeekController = require("./subjectWeek.controller.js")
const { checkSubjectWeekCreate, checkSubjectWeekUpdate } = require("./subjectWeek.validator.js")

router.post("/hour", checkSubjectWeekCreate, subjectWeekController.createSubjectWeek)
router.get("/hour", subjectWeekController.getSubjectWeek)
router.get("/hour/:id", subjectWeekController.getOneSubjectWeek)
router.delete("/hour/:id", subjectWeekController.deleteSubjectWeek)
router.put("/hour/:id", checkSubjectWeekUpdate, subjectWeekController.updateSubjectWeek)

module.exports = router