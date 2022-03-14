const Router = require("express").Router
const routes = Router()

// const AuthRouter = require("./Auth/AuthRouter.js")
const SpecRouter = require("./Spec/SpecRouter.js")
const TeacherRouter = require("./Teacher/TeacherRouter.js")
const StudentRouter = require("./Student/StudentRouter.js")
const SubjectRouter = require("./Subject/SubjectRouter.js")
const GroupRouter = require("./Group/GroupRouter.js")
const StudyPlanRouter = require("./StudyPlan/StudyPlanRouter.js")

routes.use(SpecRouter)
routes.use(TeacherRouter)
routes.use(StudentRouter)
routes.use(SubjectRouter)
routes.use(GroupRouter)
routes.use(StudyPlanRouter)

module.exports = routes