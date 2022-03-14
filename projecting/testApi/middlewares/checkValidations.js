const {validationResult} = require("express-validator")


const checkValidation = (req,res,next) => {

   const errors = validationResult(req)

   if(!errors.isEmpty()){
      return res.json({message:"Введеные некорректные данные",errors:errors.array()})
   }

   return next()

} 

module.exports = checkValidation