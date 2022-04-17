const { check } = require("express-validator")

const checkSpecCreate = [
    check("code", "Код специальности не может быть меньше 8 символов").isLength({ min: 8 }),
    check("name", "Название специальности не может бытьь меньше 6 символов").isLength({ min: 6 })
]

const checkSpecUpdate = [
    check("code", "Код специальности не может быть меньше 8 символов").isLength({ min: 8 }),
    check("name", "Название специальности не может бытьь меньше 6 символов").isLength({ min: 6 })
]

module.exports = { checkSpecCreate, checkSpecUpdate }