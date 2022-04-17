const Router = require("express").Router
const {createStudent,updateStudent,deleteStudent,getStudents} = require("../Student/StudentController.js")
const studentCreationValidate = require("./StudentValidator.js")

const router = Router()

router.post("/student",...studentCreationValidate,createStudent)
router.put("/student/:student_id",...studentCreationValidate,updateStudent)
router.delete("/student/:student_id",deleteStudent)
router.get("/student",getStudents)


module.exports = router