const { check } = require("express-validator");


const checkSubjectCreate = [
    check("name", "Названия дисциплины не может содержать меньше 4 символов").isLength({ min: 4 })
]

const checkSubjectUpdate = [
    check("name", "Названия дисциплины не может содержать меньше 4 символов").isLength({ min: 4 })
]

module.exports = { checkSubjectCreate, checkSubjectUpdate }