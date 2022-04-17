const Router = require("express").Router
const router = Router()
const studentController = require("./student.controller.js")
const {checkStudentCreate, checkStudentUpdate} = require("./student.validator.js")

router.post("/student",checkStudentCreate,studentController.createStudent)
router.get("/student",studentController.getStudent)
router.get("/student/:id",studentController.getOneStudent)
router.delete("/student/:id",studentController.deleteStudent)
router.put("/student/:id",checkStudentUpdate,studentController.updateStudent)

module.exports = router