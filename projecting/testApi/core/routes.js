const Router = require("express").Router
const routes = Router()

// const AuthRouter = require("./Auth/AuthRouter.js")
const SpecRouter = require("./Spec/spec.router.js")
const TeacherRouter = require("./Teacher/teacher.router.js")
const GroupRouter = require("./Group/group.router.js")
const StudentRouter = require("./Student/student.router.js")
const SubjectRouter = require("./Subject/subject.router.js")

routes.use(SpecRouter)
routes.use(TeacherRouter)
routes.use(GroupRouter)
routes.use(StudentRouter)
routes.use(SubjectRouter)

module.exports = routes