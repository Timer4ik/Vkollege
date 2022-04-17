const { check } = require("express-validator")



const checkDayCreate = [
    check("plan_week_id", "Должна быть указана неделя учебного плана").exists(),
    check("plan_subject_id", "Должен быть указан предмет учебного плана").exists(),
    check("date", "Должна быть указана дата").exists(),
]

const checkDayUpdate = [
    check("plan_week_id", "Должна быть указана неделя учебного плана").exists(),
    check("plan_subject_id", "Должен быть указан предмет учебного плана").exists(),
    check("date", "Должна быть указана дата").exists(),
]

module.exports = {
    checkDayCreate,
    checkDayUpdate
}