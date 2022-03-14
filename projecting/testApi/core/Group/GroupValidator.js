const { check } = require("express-validator")
const checkValidation =require("../../middlewares/checkValidations.js")

const groupCreationValidate = [
   [
      check("name","Имя не может содержать меньше 6 символов").isLength({min:6}),
      check("code","Код специальности не может содержать меньше 6 символов").isLength({min:6})
   ],
   checkValidation
]

module.exports = groupCreationValidate