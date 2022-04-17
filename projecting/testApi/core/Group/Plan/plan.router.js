const Router = require("express").Router
const router = Router()
const planController = require("./plan.controller.js")
const { checkPlanCreate, checkPlanUpdate, checkPlanGenerate } = require("./plan.validator.js")
const WeekRouter = require("./Week/week.router.js")
const DayRouter = require("./Day/day.router.js")
const SubjectRouter = require("./Subject/subject.router.js")
const SubjectWeekRouter = require("./SubjectWeek/subjectWeek.router.js")

router.get("/plan/generate",planController.getPlanInfo)
router.post("/plan/generate",checkPlanGenerate,planController.generatePlan)

router.use("/plan", WeekRouter)
router.use("/plan", DayRouter)
router.use("/plan", SubjectRouter)
router.use("/plan", SubjectWeekRouter)
router.post("/plan", checkPlanCreate, planController.createPlan)
router.get("/plan", planController.getPlan)
router.get("/plan/:id", planController.getOnePlan)
router.delete("/plan/:id", planController.deletePlan)
router.put("/plan/:id", checkPlanUpdate, planController.updatePlan)

module.exports = router