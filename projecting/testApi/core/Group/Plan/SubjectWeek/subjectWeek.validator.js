const { check } = require("express-validator");

const checkSubjectWeekCreate = [
    check("plan_week_id", "Должна быть указана неделя учебного плана").exists(),
    check("plan_subject_id", "Должен быть указан предмет из учебного плана").exists(),
    check("hours", "Должно быть указано количество часов за эту неделю").exists()
]
const checkSubjectWeekUpdate = [
    check("plan_week_id", "Должна быть указана неделя учебного плана").exists(),
    check("plan_subject_id", "Должен быть указан предмет из учебного плана").exists(),
    check("hours", "Должно быть указано количество часов за эту неделю").exists()
]

module.exports = {
    checkSubjectWeekCreate,
    checkSubjectWeekUpdate
}