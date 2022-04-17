const { validationResult } = require("express-validator")
const { Student } = require("../../models/models")


class StudentController {

    async createStudent(req, res) {

        const { group_id, name } = req.body

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Введеные некорректные данные", errors: errors.errors })
        }

        try {

            const createdStudent = await Student.create({
                group_id, name
            })

            return res.status(200).json({
                message: "Новый студент успешно создан", body: {
                    student: createdStudent
                }
            })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async getStudent(req, res) {

        let { limit, page } = req.query

        limit = limit || 6
        page = page || 1

        try {

            const offset = page * limit - limit
            const students = await Student.findAll({
                limit, offset
            })

            return res.status(200).json({
                message: "Студенты были успешно получены", body: {
                    students
                }
            })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async getOneStudent(req, res) {

        const { id } = req.params
        try {

            const student = await Student.findOne({
                where: {
                    student_id: id
                }
            })

            return res.status(200).json({
                message: "Студент был успешно получен", body: {
                    student
                }
            })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async deleteStudent(req, res) {
        const { id } = req.params
        try {

            const deletedStudent = await Student.destroy({
                where: {
                    student_id: id
                }
            })

            return res.status(200).json({ message: "Студент был успешно удалён" })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }
    async updateStudent(req, res) {
        const { id } = req.params
        const { group_id, name } = req.body

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Введеные некорректные данные", errors: errors.errors })
        }

        try {

            const [count,updatedStudent] = await Student.update({ group_id, name }, {
                where: {
                    student_id: id
                },returning:true
            })

            return res.status(200).json({
                message: "Студент был успешно удалён", body: {
                    student: updatedStudent[0]
                }
            })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

}

module.exports = new StudentController()