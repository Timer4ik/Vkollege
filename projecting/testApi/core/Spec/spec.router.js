const Router = require("express").Router
const router = Router()

const specController = require("./spec.controller.js")
const { checkSpecCreate } = require("./spec.validator.js")

router.post("/spec", checkSpecCreate, specController.createSpec)
router.get("/spec", specController.getSpecs)
router.get("/spec/:id", specController.getOneSpec)
router.delete("/spec/:id", specController.deleteSpec)
router.put("/spec/:id", specController.updateSpec)

module.exports = router