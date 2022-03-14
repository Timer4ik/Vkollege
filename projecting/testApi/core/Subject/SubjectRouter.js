const Router = require("express").Router
const {createSubject,updateSubject,deleteSubject,getSubjects} = require("../Subject/SubjectController.js")
const subjectCreationValidate = require("./SubjectValidator.js")

const router = Router()

router.post("/subject",...subjectCreationValidate,createSubject)
router.put("/subject/:subject_id",...subjectCreationValidate,updateSubject)
router.delete("/subject/:subject_id",deleteSubject)
router.get("/subject",getSubjects)


module.exports = router