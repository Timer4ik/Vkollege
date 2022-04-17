const Router = require("express").Router
const router = Router()
const subjectController = require("./subject.controller.js")
const { checkSubjectCreate, checkSubjectUpdate } = require("./subject.validator.js")


router.post("/subject", checkSubjectCreate, subjectController.createSubject)
router.get("/subject", subjectController.getSubject)
router.get("/subject/:id", subjectController.getOneSubject)
router.delete("/subject/:id", subjectController.deleteSubject)
router.put("/subject/:id", checkSubjectUpdate, subjectController.updateSubject)


module.exports = router