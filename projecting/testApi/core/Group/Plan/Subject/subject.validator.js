const { check } = require("express-validator");


const checkSubjectCreate = [
    check("subject_id", "Должен быть указан предмет").exists(),
    check("teacher_id", "Должен быть указан преподаватель").exists(),
    check("group_plan_id", "Должен быть указан учебный план").exists(),
]


const checkSubjectUpdate = [
    check("subject_id", "Должен быть указан предмет").exists(),
    check("teacher_id", "Должен быть указан преподаватель").exists(),
    check("group_plan_id", "Должен быть указан учебный план").exists(),
]

module.exports = {
    checkSubjectCreate,
    checkSubjectUpdate
}