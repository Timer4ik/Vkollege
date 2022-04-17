const { validationResult } = require("express-validator")
const { Group, GroupPlan, PlanDay, PlanWeek } = require("../../models/models")

class GroupController {

    async createGroup(req, res) {

        const { spec_id, teacher_id, course, student_amount, year } = req.body

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Введены некорректные данные", errors: errors.errors })
        }

        try {

            const createdGroup = await Group.create({
                spec_id,
                teacher_id,
                course,
                student_amount,
                year
            })

            return res.status(200).json({
                message: "Группы успешно создана",
                body: {
                    group: createdGroup
                }
            })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async getGroup(req, res) {

        let { limit, page } = req.query

        limit = limit || 6
        page = page || 1

        try {
            const offset = page * limit - limit
            const groups = await Group.findAll({
                limit,
                offset
            })


            return res.status(200).json({
                message: "Группы были успешно получены",
                body: {
                    groups
                }
            })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }
    async getOneGroup(req, res) {
        const { id } = req.params
        try {

            const group = await Group.findOne({
                where: {
                    group_id: id
                }
            })

            return res.status(200).json({
                message: "Группы успешно получена",
                body: {
                    group
                }
            })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async deleteGroup(req, res) {

        const { id } = req.params

        try {

            const deletedGroup = await Group.destroy({
                where: {
                    group_id: id
                }
            })

            return res.status(200).json({ message: "Группа успешно удалена" })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async updateGroup(req, res) {

        const { id } = req.params
        const { spec_id, teacher_id, course, student_amount, year } = req.body

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Введены некорректные данные", errors: errors.errors })
        }

        try {

            const updatedGroup = await Group.update({
                spec_id,
                teacher_id,
                course,
                student_amount,
                year
            }, {
                where: {
                    group_id: id
                },
                returning: true
            })

            return res.status(200).json({
                message: "Группа успешно изменена",
                body: {
                    group: updatedGroup
                }
            })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async getGroupInfo(req, res) {

        let { limit, page } = req.query

        limit = limit || 6
        page = page || 1

        try {
            const offset = page * limit - limit
            const groups = await Group.findAll({
                limit,
                offset, raw: true
            })

            for (let i = 0; i < groups.length; i++) {
                const plans = await GroupPlan.findAll({
                    where: {
                        group_id: groups[i].group_id
                    }, raw: true
                })
                for (let j = 0; j < plans.length; j++) {
                    const weeks = await PlanWeek.findAll({
                        where: {
                            group_plan_id: plans[j].group_plan_id
                        }, raw: true
                    })
                    for (let k = 0; k < weeks.length; k++) {
                        const days = await PlanDay.findAll({
                            where: {
                                plan_week_id: weeks[k].plan_week_id
                            }, raw: true
                        })
                        weeks[k].days = days
                    }
                    plans[j].weeks = weeks
                }
                groups[i].plans = plans
            }

            return res.status(200).json({
                message: "Группы были успешно получены",
                body: {
                    groups
                }
            })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

}

module.exports = new GroupController()