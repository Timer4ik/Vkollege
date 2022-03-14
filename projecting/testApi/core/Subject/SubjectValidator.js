const { check } = require("express-validator")
const checkValidation =require("../../middlewares/checkValidations.js")

const subjectCreationValidate = [
   [
      check("name","Имя не может содержать меньше 6 символов").isLength({min:6})
   ],
   checkValidation
]

module.exports = subjectCreationValidate