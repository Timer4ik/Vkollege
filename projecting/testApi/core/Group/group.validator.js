const { check } = require("express-validator");



const checkGroupCreate = [
    check("spec_id", "Укажить специальность").exists(),
    check("teacher_id", "Укажите преподавателя группы").exists(),
    check("course", "Укажить курс созданной группы").exists(),
    check("student_amount", "Укажите количество студентов").exists(),
    check("year", "Укажите год поступления").exists(),
]

const checkGroupUpdate = [
    check("spec_id", "Укажить специальность").exists(),
    check("teacher_id", "Укажите преподавателя группы").exists(),
    check("course", "Укажить курс созданной группы").exists(),
    check("student_amount", "Укажите количество студентов").exists(),
    check("year", "Укажите год поступления").exists(),
]

module.exports = { checkGroupCreate,checkGroupUpdate }