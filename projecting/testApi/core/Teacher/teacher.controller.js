const { validationResult } = require("express-validator")
const { Teacher } = require("../../models/models")

class TeacherController {

    async createTeacher(req, res) {

        const { name, surname, patronymic, about, status, age } = req.body

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Введены некорректные данные",
                errors: errors.errors
            })
        }

        try {

            const createdTeacher = await Teacher.create({
                name,
                surname,
                patronymic,
                about,
                status,
                age
            })

            return res.status(200).json({
                message: "Преподаватель успешно создан",
                body: {
                    teacher: createdTeacher
                }
            })


        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async getTeachers(req, res) {

        let { limit, page } = req.query

        limit = limit || 6
        page = page || 1
        const offset = page * limit - limit

        try {

            const teachers = await Teacher.findAll({
                limit,
                offset
            })

            return res.status(200).json({
                message: "Преподаватели успешно получены",
                body: {
                    teachers
                }
            })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async getOneTeacher(req, res) {

        const { id } = req.params

        try {

            const teacher = await Teacher.findOne({
                where: {
                    teacher_id: id
                }
            })

            return res.status(200).json({
                message: "Преподаватель успешно получен",
                body: {
                    teacher
                }
            })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async deleteTeacher(req, res) {
        const { id } = req.params

        try {

            const deletedTeacher = await Teacher.destroy({
                where: {
                    teacher_id: id
                }
            })

            return res.status(200).json({ message: "Преподаватель успешно удалён" })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async updateTeacher(req, res) {

        const { id } = req.params
        const { name, surname, patronymic, about, status, age } = req.body

        try {

            const [count, updatedTeacher] = await Teacher.update({
                name,
                surname,
                patronymic,
                about,
                status,
                age
            }, {
                where: {
                    teacher_id: id
                },
                returning: true
            })

            return res.status(200).json({
                message: "Преподаватель успешно изменён",
                body: {
                    teacher: updatedTeacher[0]
                }
            })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

}

module.exports = new TeacherController()