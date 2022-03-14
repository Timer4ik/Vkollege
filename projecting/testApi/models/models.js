const sequelize = require("../db.js")
const { DataTypes } = require("sequelize")

const Spec = sequelize.define("spec", {
   spec_id: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement:true },
   code: { type: DataTypes.STRING(200), allowNull: false },
   name: { type: DataTypes.STRING(200), allowNull: false },
   about: { type: DataTypes.STRING},
})

const Student = sequelize.define("student", {
   student_id: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement:true },
   group_id: { type: DataTypes.INTEGER, allowNull: false },
   name: { type: DataTypes.STRING(100), allowNull: false },
})

const Group = sequelize.define("group", {
   group_id: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement:true },
   spec_id: { type: DataTypes.INTEGER, allowNull: false },
   teacher_id: { type: DataTypes.INTEGER, allowNull: false },
   course: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
   student_amount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
   year: { type: DataTypes.INTEGER, allowNull: false }
})

const StudyPlan = sequelize.define("study_plan", {
   study_plan_id: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement:true },
   year: { type: DataTypes.INTEGER, allowNull: false },
   title: { type: DataTypes.STRING }
})

const GroupPlan = sequelize.define("group_plan", {
   group_plan_id: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement:true },
   study_year_id: { type: DataTypes.INET, allowNull: false },
   study_year_id: { type: DataTypes.INET, allowNull: false },
   group_id: { type: DataTypes.INTEGER, allowNull: false }
})

const PlanWeek = sequelize.define("plan_week", {
   plan_week_id: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement:true },
   group_plan_id: { type: DataTypes.INTEGER, allowNull: false },
   end_date: { type: DataTypes.DATE, allowNull: false },
   start_date: { type: DataTypes.DATE, allowNull: false }
})
const PlanSubject = sequelize.define("plan_subject", {
   plan_subject_id: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement:true },
   subject_id: { type: DataTypes.INTEGER, allowNull: false },
   teacher_id: { type: DataTypes.INTEGER, allowNull: false }
})
const Subject = sequelize.define("subject", {
   subject_id: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement:true },
   name: { type: DataTypes.STRING(100), allowNull: false }
})
const Teacher = sequelize.define("teacher", {
   teacher_id: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement:true },
   name: { type: DataTypes.STRING(50), allowNull: false },
   surname: { type: DataTypes.STRING(50) },
   patronymic: { type: DataTypes.STRING(50) },
   about: { type: DataTypes.STRING },
   status: { type: DataTypes.STRING },
   age: { type: DataTypes.INTEGER }
})

const PlanDay = sequelize.define("plan_day", {
   plan_day_id: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement:true },
   plan_week_id: { type: DataTypes.INTEGER, allowNull: false },
   plan_subject_id: { type: DataTypes.INTEGER, allowNull: false },
   date: { type: DataTypes.DATE }
})

const SubjectWeekHours = sequelize.define("subject_week_hours", {
   week_id: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement:true },
   plan_week_id: { type: DataTypes.INTEGER, allowNull: false },
   group_plan_id: { type: DataTypes.INTEGER, allowNull: false },
   hours: { type: DataTypes.INTEGER, defaultValue: 0 }
})


module.exports = {
   Spec, Teacher, Group, StudyPlan,Student,
   GroupPlan,PlanWeek,PlanSubject,
   Subject,PlanDay,SubjectWeekHours
}