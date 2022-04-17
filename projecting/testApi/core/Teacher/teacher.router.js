const Router = require("express").Router
const router = Router()
const teacherController = require("./teacher.controller.js")
const { checkTeacherCreate, checkTeacherUpdate } = require("./teacher.validator.js")

router.post("/teacher", checkTeacherCreate, teacherController.createTeacher)
router.get("/teacher", teacherController.getTeachers)
router.get("/teacher/:id", teacherController.getOneTeacher)
router.delete("/teacher/:id", teacherController.deleteTeacher)
router.put("/teacher/:id", checkTeacherUpdate, teacherController.updateTeacher)

module.exports = router