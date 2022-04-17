const { check } = require("express-validator");



const checkStudentCreate = [
    check("group_id","Должен быть введён номер группы").exists(),
    check("name","Имя студента не может быть меньше 3 символов").isLength({min:2})
]
const checkStudentUpdate = [
    check("group_id","Должен быть введён номер группы").exists(),
    check("name","Имя студента не может быть меньше 3 символов").isLength({min:2})
]


module.exports = {checkStudentCreate,checkStudentUpdate}