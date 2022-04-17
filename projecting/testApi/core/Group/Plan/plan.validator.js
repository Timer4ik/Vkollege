const { check } = require("express-validator");



const checkPlanCreate = [
    check("group_id", "Должен быть указан номер группы").exists(),
    check("year", "Должен быть указан год").exists()
]
const checkPlanUpdate = [
    check("group_id", "Должен быть указан номер группы").exists(),
    check("year", "Должен быть указан год").exists()
]
const checkPlanGenerate = [
    check("group_plan_id","Укажите учебный план").exists(),
    check("year","Укажите год обучения").exists()
]

module.exports = {
    checkPlanCreate,
    checkPlanUpdate,
    checkPlanGenerate
}