const { check } = require("express-validator");


const checkWeekUpdate = [
    check("group_plan_id", "Должен быть указан номер учебного плана").exists(),
    check("start_date", "Должна быть указана начальная дата недели").exists(),
    check("end_date", "Должна быть указана конечная дата недели").exists(),
]
const checkWeekCreate = [
    check("group_plan_id", "Должен быть указан номер учебного плана").exists(),
    check("start_date", "Должна быть указана начальная дата недели").exists(),
    check("end_date", "Должна быть указана конечная дата недели").exists(),
]

module.exports = {
    checkWeekCreate,
    checkWeekUpdate
}