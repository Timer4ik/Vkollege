const Router = require("express").Router
const router = Router()

const AuthRouter = require("./Auth/AuthRouter.js")

router.use(AuthRouter)

module.exports = router