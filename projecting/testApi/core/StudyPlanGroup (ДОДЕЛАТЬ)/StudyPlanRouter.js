const Router = require("express").Router
const {createStudyPlan,updateStudyPlan,deleteStudyPlan,getStudyPlans} = require("../StudyPlan/StudyPlanController.js")
const study_plan_groupCreationValidate = require("./StudyPlanValidator.js")

const router = Router()

router.post("/study_plan_group",...study_plan_groupCreationValidate,createStudyPlan)
router.put("/study_plan_group/:study_plan_id",...study_plan_groupCreationValidate,updateStudyPlan)
router.delete("/study_plan_group/:study_plan_id",deleteStudyPlan)
router.get("/study_plan_group",getStudyPlans)


module.exports = router