const { validationResult } = require("express-validator")
const { PlanDay } = require("../../../../models/models")


class DayController {

    async createDay(req, res) {

        const { plan_week_id, plan_subject_id, date } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Некорретные данные", errors: errors.errors })
        }

        try {

            const createdDay = await PlanDay.create({ plan_week_id, plan_subject_id, date })

            return res.status(200).json({
                message: "Новый день недели создан", body: {
                    day: createdDay
                }
            })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async getDay(req, res) {

        let { limit, page } = req.query

        limit = limit || 6
        page = page || 1

        try {
            const offset = page * limit - limit
            const days = await PlanDay.findAll({
                limit, offset
            })

            return res.status(200).json({
                message: "Дни недели успешно получены", body: {
                    days
                }
            })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async getOneDay(req, res) {

        const { id } = req.params

        try {

            const day = await PlanDay.findOne({
                where: {
                    plan_day_id: id
                }
            })

            return res.status(200).json({
                message: "День недели успешно получен", body: {
                    day
                }
            })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async deleteDay(req, res) {
        const { id } = req.params

        try {

            const deletedDay = await PlanDay.destroy({
                where: {
                    plan_day_id: id
                }
            })

            return res.status(200).json({ message: "День недели успешно удалён" })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async updateDay(req, res) {

        const { id } = req.params
        const { plan_week_id, plan_subject_id, date } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Некорретные данные", errors: errors.errors })
        }

        try {
            const [count, updatedDay] = await PlanDay.update({ plan_week_id, plan_subject_id, date }, {
                where: {
                    plan_day_id: id
                },returning:true
            })

            return res.status(200).json({
                message: "День недели успешно изменён", body: {
                    day: updatedDay[0]
                }
            })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

}

module.exports = new DayController()