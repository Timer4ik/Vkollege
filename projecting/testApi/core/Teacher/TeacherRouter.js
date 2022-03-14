const Router = require("express").Router
const {createTeacher,updateTeacher,deleteTeacher,getTeachers} = require("../Teacher/TeacherController.js")
const teacherCreationValidate = require("./TeacherValidator.js")

const router = Router()

router.post("/teacher",...teacherCreationValidate,createTeacher)
router.put("/teacher/:teacher_id",...teacherCreationValidate,updateTeacher)
router.delete("/teacher/:teacher_id",deleteTeacher)
router.get("/teacher",getTeachers)


module.exports = router