const { validationResult } = require("express-validator")
const { PlanWeek } = require("../../../../models/models")





class WeekController {

    async createWeek(req, res) {

        const { group_plan_id, end_date, start_date } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Некорретные данные", errors: errors.errors })
        }

        try {

            const createdWeek = await PlanWeek.create({
                group_plan_id, end_date, start_date
            })

            return res.status(200).json({
                message: "Неделя создана", body: {
                    week: createdWeek
                }
            })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async getWeek(req, res) {

        let { limit, page } = req.query

        limit = limit || 6
        page = page || 1

        try {
            const offset = page * limit - limit

            const weeks = await PlanWeek.findAll({
                limit, offset
            })


            return res.status(200).json({
                message: "Недели учебного плана успешно получены", body: {
                    weeks
                }
            })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async getOneWeek(req, res) {

        const { id } = req.params

        try {

            const week = await PlanWeek.findOne({
                where: {
                    plan_week_id: id
                }
            })

            return res.status(200).json({
                message: "Неделя учебного плана успешно получена", body: {
                    week
                }
            })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async deleteWeek(req, res) {

        const { id } = req.params

        try {

            const deletedWeek = await PlanWeek.destroy({
                where: {
                    plan_week_id: id
                }
            })

            return res.status(200).json({ message: "Неделя учебного плана успешно удалена" })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }
    async updateWeek(req, res) {
        const { id } = req.params
        const { group_plan_id, end_date, start_date } = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Некорретные данные", errors: errors.errors })
        }
        try {

            const [count, deletedWeek] = await PlanWeek.update({ group_plan_id, end_date, start_date }, {
                where: {
                    plan_week_id: id
                },returning:true
            })

            return res.status(200).json({
                message: "Неделя учебного плана успешно изменена", body: {
                    week: deletedWeek[0]
                }
            })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }
}

module.exports = new WeekController()