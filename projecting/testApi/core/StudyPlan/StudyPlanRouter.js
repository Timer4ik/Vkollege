const Router = require("express").Router
const {createStudyPlan,updateStudyPlan,deleteStudyPlan,getStudyPlans} = require("../StudyPlan/StudyPlanController.js")
const study_planCreationValidate = require("./StudyPlanValidator.js")

const router = Router()

router.post("/study_plan",...study_planCreationValidate,createStudyPlan)
router.put("/study_plan/:study_plan_id",...study_planCreationValidate,updateStudyPlan)
router.delete("/study_plan/:study_plan_id",deleteStudyPlan)
router.get("/study_plan",getStudyPlans)


module.exports = router