const { validationResult } = require("express-validator")
const { SubjectWeek } = require("../../../../models/models")

class SubjectWeekController {

    async createSubjectWeek(req, res) {

        const { plan_week_id, plan_subject_id, hours } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Некорретные данные", errors: errors.errors })
        }

        try {

            const createdSubjectWeek = await SubjectWeek.create({ plan_week_id, plan_subject_id, hours })

            return res.status(200).json({
                message: "Количество часов по предмету за неделю успешно указано", body: {
                    subjectWeek: createdSubjectWeek
                }
            })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async getSubjectWeek(req, res) {

        let { limit, page } = req.query

        limit = limit || 6
        page = page || 1

        try {
            const offset = page * limit - limit
            const subjectWeeks = await SubjectWeek.findAll({
                limit, offset
            })

            return res.status(200).json({
                message: "Количество часов по предметам и неделям получены успешно", body: {
                    subjectWeeks
                }
            })
        }
        catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async getOneSubjectWeek(req, res) {
        const { id } = req.params

        try {

            const subjectWeek = await SubjectWeek.findOne({
                where: {
                    subject_week_id: id
                }
            })

            return res.status(200).json({
                message: "Клетка с количеством часов успешно получена", body: {
                    subjectWeek
                }
            })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async deleteSubjectWeek(req, res) {
        const { id } = req.params

        try {

            const deletedSubjectWeek = await SubjectWeek.destroy({
                where: {
                    subject_week_id: id
                }
            })

            return res.status(200).json({ message: "Клетка о количестве часов успешно удалена" })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async updateSubjectWeek(req, res) {

        const { id } = req.params
        const { plan_week_id, plan_subject_id, hours } = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Некорретные данные", errors: errors.errors })
        }

        try {

            const [count, updatedSubjectWeek] = await SubjectWeek.update({
                plan_week_id, plan_subject_id, hours
            }, {
                where: {
                    subject_week_id: id
                }, returning: true
            })

            return res.status(200).json({
                message: "Клетка с количеством часов успешно изменена", body: {
                    subjectWeek: updatedSubjectWeek[0]
                }
            })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }


}

module.exports = new SubjectWeekController()