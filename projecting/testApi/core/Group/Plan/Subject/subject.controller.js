const { validationResult } = require("express-validator")
const { PlanSubject } = require("../../../../models/models")

class SubjectController {
    async createSubject(req, res) {

        const { teacher_id, subject_id,group_plan_id } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Введены некорректные данные", errors: errors.errors })
        }

        try {

            const createdSubject = await PlanSubject.create({ teacher_id, subject_id,group_plan_id })

            return res.status(200).json({
                message: "Успешно добавлен новый предмет в учебный план", body: {
                    subject:createdSubject
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

            const offset = limit * page - limit
            const subjects = await PlanSubject.findAll({
                limit, offset
            })


            return res.status(200).json({
                message: "Предметы учебного плана успешно получены", body: {
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

            const subject = await PlanSubject.findOne({
                where: {
                    plan_subject_id: id
                }
            })

            return res.status(200).json({
                message: "Предмет учебного плана успешно получен", body: {
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

            const deletedSubject = await PlanSubject.destroy({
                where: {
                    plan_subject_id: id
                }
            })

            return res.status(200).json({ message: "Предмет учебного плана успешно удалён" })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async updateSubject(req, res) {

        const { id } = req.params
        const { teacher_id, subject_id,group_plan_id } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Введены некорректные данные", errors: errors.errors })
        }


        try {

            const [count, updatedSubject] = await PlanSubject.update({ teacher_id, subject_id,group_plan_id }, {
                where: {
                    plan_subject_id: id
                }, returning: true
            })

            return res.status(200).json({
                message: "Предмет учебного плана успешно удалён", body: {
                    subject: updatedSubject[0]
                }
            })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }
}

module.exports = new SubjectController()