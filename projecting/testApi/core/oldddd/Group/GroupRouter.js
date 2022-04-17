const Router = require("express").Router
const {createGroup,updateGroup,deleteGroup,getGroups} = require("../Group/GroupController.js")
const groupCreationValidate = require("./GroupValidator.js")

const router = Router()

router.post("/group",...groupCreationValidate,createGroup)
router.put("/group/:group_id",...groupCreationValidate,updateGroup)
router.delete("/group/:group_id",deleteGroup)
router.get("/group",getGroups)


module.exports = router