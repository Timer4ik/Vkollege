const { check } = require("express-validator")
const checkValidation =require("../../middlewares/checkValidations.js")

const studyPlanCreationValidate = [
   [
      check("year","Год не может содержать меньше 4 символов").isLength({min:4})
   ],
   checkValidation
]

module.exports = studyPlanCreationValidate