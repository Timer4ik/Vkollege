const Router = require("express").Router
const router = Router()
const groupController = require("./group.controller.js")
const { checkGroupCreate, checkGroupUpdate } = require("./group.validator.js")
const PlanRouter = require("./Plan/plan.router.js")

router.get("/group/info",groupController.getGroupInfo)

router.use("/group",PlanRouter)
router.post("/group", checkGroupCreate, groupController.createGroup)
router.get("/group", groupController.getGroup)
router.get("/group/:id", groupController.getOneGroup)
router.delete("/group/:id", groupController.deleteGroup)
router.put("/group/:id", checkGroupUpdate, groupController.updateGroup)


module.exports = router