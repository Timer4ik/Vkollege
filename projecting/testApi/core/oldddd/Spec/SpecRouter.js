const Router = require("express").Router
const {createSpec,updateSpec,deleteSpec,getSpecs} = require("../Spec/SpecController.js")
const specCreationValidate = require("./SpecValidator.js")

const router = Router()

router.post("/spec",...specCreationValidate,createSpec)
router.put("/spec/:spec_id",...specCreationValidate,updateSpec)
router.delete("/spec/:spec_id",deleteSpec)
router.get("/spec",getSpecs)


module.exports = router