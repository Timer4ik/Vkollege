const { validationResult } = require("express-validator")
const { Subject } = require("../../models/models")




class SubjectController {

    async createSubject(req, res) {

        const { name } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Введены некорректные данные", errors: errors.errors })
        }

        try {

            const createdSubject = await Subject.create({
                name
            })

            return res.status(200).json({
                message: "Дисциплина успешно была создана", body: {
                    subject: createdSubject
                }
            })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async getSubject(req, res) {
        let { limit, page } = req.query

        limit = limit || 6
        page = page || 1

        try {

            const offset = page * limit - limit
            const subjects = await Subject.findAll({
                limit, offset
            })

            return res.status(200).json({
                message: "Дисциплины успешно получены", body: {
                    subjects
                }
            })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async getOneSubject(req, res) {

        const { id } = req.params

        try {

            const subject = await Subject.findOne({
                where: {
                    subject_id: id
                }
            })

            return res.status(200).json({
                message: "Дисциплина была успешно получена", body: {
                    subject
                }
            })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async deleteSubject(req, res) {
        const { id } = req.params
        try {
            const deletedSubject = await Subject.destroy({
                where: {
                    subject_id: id
                }
            })
            return res.status(200).json({ message: "Дисциплина была успешно получена" })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async updateSubject(req, res) {

        const { id } = req.params
        const { name } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Введены некорректные данные", errors: errors.errors })
        }

        try {

            const [count,updatedSubject] = await Subject.update({ name }, {
                where: {
                    subject_id: id
                },
                returning: true
            })

            return res.status(200).json({
                message: "Дисциплина успешно изменена", body: {
                    subject: updatedSubject[0]
                }
            })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

}

module.exports = new SubjectController()