const { check } = require("express-validator")

const checkTeacherCreate = [
    check("name", "Имя преподавателя не может быть меньше 2 символов").exists().isLength({ min: 2 }),
    check("surname", "Фамилия преподавателя не может быть меньше 4 символов").isLength({ min: 2 }),
    check("patronymic", "Фамилия преподавателя не может быть меньше 2 символов").isLength({ min: 2 }),
    check("age", "Возраст должен быть указан").exists(),
]
const checkTeacherUpdate = [
    check("name", "Имя преподавателя не может быть меньше 2 символов").exists().isLength({ min: 2 }),
    check("surname", "Фамилия преподавателя не может быть меньше 4 символов").isLength({ min: 2 }),
    check("patronymic", "Фамилия преподавателя не может быть меньше 2 символов").isLength({ min: 2 }),
    check("age", "Возраст должен быть указан").exists(),
]

module.exports = { checkTeacherCreate, checkTeacherUpdate }