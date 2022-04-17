const { validationResult } = require("express-validator");
const { PlanWeek, PlanDay } = require("../../../models/models");
const { GroupPlan } = require("../../../models/models")


function daysConfig() {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    Date.prototype.getMonthName = function () {
        return months[this.getMonth()];
    };
    Date.prototype.getDayName = function () {
        return days[this.getDay()];
    };
};
daysConfig()
var now = new Date();
var day = now.getDayName();
var month = now.getMonthName();

class StudyPlanGenerator {
    constructor(from, to) {
       let date = [from, 0, 1]
       function addDay(date, days) {
          date = new Date(date.getTime() + (days * 24 * 360 * 10000))
          return date
       }
       let firstDay = new Date(...date)
       let days = []
       let weeks = []
       let firstDayMonday = firstDay.getDayName() === "Monday"
       while (firstDay.getFullYear() < to) {
          let week = {}
          if (!firstDayMonday) {
             week.startDate = firstDay
             firstDayMonday = true
             weeks.push(week)
          } else {
             if (firstDay.getDayName() === "Monday") {
                week.startDate = firstDay
             }
          }
          if (firstDay.getDayName() === "Sunday") {
             week.endDate = firstDay
          }
          else if(addDay(firstDay,1).getFullYear() === to){
             week.endDate = firstDay
             weeks.push(week)
          }
          if (firstDay.getDayName() === "Monday" || firstDay.getDayName() === "Sunday") {
             weeks.push(week)
          }
          days.push(firstDay)
          firstDay = addDay(firstDay, 1)
       }

       let weeksOutput = []
       for (let i = 0; i < weeks.length - 1; i += 2) {
          let week = {
             startDate: 0,
             endDate: 0
          }
          week.startDate = weeks[i].startDate
          week.endDate = weeks[i + 1].endDate
          weeksOutput.push(week)
          week.days = days.filter(day => {
             return day >= week.startDate && day <= week.endDate
          })
       }
       this.weeks = weeksOutput
       this.days = days
    }
 }


class PlanController {

    async createPlan(req, res) {

        const { year, group_id } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Введены некорректные данные", errors: errors.errors })
        }

        try {

            const createdPlan = await GroupPlan.create({
                year, group_id
            })

            return res.status(200).json({
                message: "Учебный план создан", body: {
                    createdPlan
                }
            })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async getPlan(req, res) {
        let { limit, page } = req.query

        limit = limit || 6
        page = page || 1

        try {
            const offset = page * limit - limit
            const plans = await GroupPlan.findAll({
                limit,
                offset
            })

            return res.status(200).json({
                message: "Планы групп были успешно получены",
                body: {
                    plans
                }
            })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async getOnePlan(req, res) {

        const { id } = req.params

        try {

            const plan = await GroupPlan.findOne({
                where: {
                    group_plan_id: id
                }
            })

            return res.status(200).json({
                message: "План был успешно получен", body: {
                    plan
                }
            })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }

    }

    async deletePlan(req, res) {

        const { id } = req.params

        try {

            const deletedPlan = await GroupPlan.destroy({
                where: {
                    group_plan_id: id
                }
            })

            return res.status(200).json({ message: "План был успешно получен" })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }

    }

    async updatePlan(req, res) {
        const { id } = req.params
        const { year, group_id } = req.body

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Введены некорректные данные", errors: errors.errors })
        }

        try {

            const [count, updatedPlan] = await GroupPlan.update({ year, group_id }, {
                where: {
                    group_plan_id: id
                }, returning: true
            })

            return res.status(200).json({
                message: "План группы был успешно изменён", body: {
                    plan: updatedPlan[0]
                }
            })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async generatePlan(req, res) {

        const { year, group_plan_id } = req.body

        try {
            let studyPlan = new StudyPlanGenerator(year, year + 1)


            for (let i = 0; i < studyPlan.weeks.length; i++) {
                const week = await PlanWeek.create({
                    group_plan_id: group_plan_id,
                    start_date: studyPlan.weeks[i].startDate,
                    end_date: studyPlan.weeks[i].endDate
                }, { returning: true, raw: true })
                for (let j = 0; j < studyPlan.weeks[i].days.length; j++) {
                    const day = await PlanDay.create({
                        date: studyPlan.weeks[i].days[j],
                        plan_week_id: week.plan_week_id
                    }, { returning: true, raw: true })
                }
            }

            const weeks = await PlanWeek.findAll({
                where: {
                    group_plan_id
                }, raw: true
            })
            for (let j = 0; j < weeks.length; j++) {
                const days = await PlanDay.findAll({
                    where: {
                        plan_week_id: weeks[j].plan_week_id
                    }
                })
                weeks[j].days = days
            }

            return res.status(200).json({
                message: "Учебный план получен", body: {
                    weeks
                }
            })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async getPlanInfo(req, res) {

        const { group_plan_id } = req.body

        try {
            const weeks = await PlanWeek.findAll({
                where: {
                    group_plan_id
                }, raw: true
            })
            for (let j = 0; j < weeks.length; j++) {
                const days = await PlanDay.findAll({
                    where: {
                        plan_week_id: weeks[j].plan_week_id
                    }
                })
                weeks[j].days = days
            }

            return res.status(200).json({
                message: "Учебный план получен", body: {
                    weeks
                }
            })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }
}




module.exports = new PlanController()