const sequelize = require("../db.js")
const { DataTypes } = require("sequelize")

const Spec = sequelize.define("spec", {
   spec_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   code: { type: DataTypes.STRING(200), allowNull: false },
   name: { type: DataTypes.STRING(200), allowNull: false },
   about: { type: DataTypes.STRING },
})

const Student = sequelize.define("student", {
   student_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   group_id: {
      type: DataTypes.INTEGER, allowNull: false, references: {
         key: "group_id",
         model: "groups"
      }
   },
   name: { type: DataTypes.STRING(100), allowNull: false },
})

const Group = sequelize.define("group", {
   group_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   spec_id: {
      type: DataTypes.INTEGER, allowNull: false, references: {
         key: "spec_id",
         model: "specs"
      }
   },
   teacher_id: {
      type: DataTypes.INTEGER, allowNull: false, references: {
         key: "teacher_id",
         model: "teachers"
      }
   },
   course: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
   student_amount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
   year: { type: DataTypes.INTEGER, allowNull: false }
})

const StudyPlan = sequelize.define("study_plan", {
   study_plan_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   year: { type: DataTypes.INTEGER, allowNull: false },
   title: { type: DataTypes.STRING }
})

const GroupPlan = sequelize.define("group_plan", {
   group_plan_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   year: { type: DataTypes.INTEGER, allowNull: false },
   group_id: {
      type: DataTypes.INTEGER, allowNull: false, references: {
         key: "group_id",
         model: "groups"
      }
   },
})

const PlanWeek = sequelize.define("plan_week", {
   plan_week_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   group_plan_id: {
      type: DataTypes.INTEGER, allowNull: false, references: {
         key: "group_plan_id",
         model: "group_plans"
      }
   },
   end_date: { type: DataTypes.DATE, allowNull: false },
   start_date: { type: DataTypes.DATE, allowNull: false }
})
const PlanSubject = sequelize.define("plan_subject", {
   plan_subject_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   subject_id: {
      type: DataTypes.INTEGER, allowNull: false, references: {
         key: "subject_id",
         model: "subjects"
      }
   },
   group_plan_id: {
      type: DataTypes.INTEGER, allowNull: false, references: {
         key: "group_plan_id",
         model: "group_plans"
      }
   },
   teacher_id: {
      type: DataTypes.INTEGER, allowNull: false, references: {
         key: "teacher_id",
         model: "teachers"
      }
   },
})
const Subject = sequelize.define("subject", {
   subject_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING(100), allowNull: false }
})
const Teacher = sequelize.define("teacher", {
   teacher_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING(50), allowNull: false },
   surname: { type: DataTypes.STRING(50) },
   patronymic: { type: DataTypes.STRING(50) },
   about: { type: DataTypes.STRING },
   status: { type: DataTypes.STRING },
   age: { type: DataTypes.INTEGER }
})

const PlanDay = sequelize.define("plan_day", {
   plan_day_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   plan_week_id: {
      type: DataTypes.INTEGER, allowNull: false, references: {
         key: "plan_week_id",
         model: "plan_weeks"
      }
   },
   date: { type: DataTypes.DATE }
})

const DaySubject = sequelize.define("day_subject", {
   day_subject_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   plan_day_id: {
      type: DataTypes.INTEGER, allowNull: false, references: {
         key: "plan_day_id",
         model: "plan_days"
      }
   },
   plan_subject_id: {
      type: DataTypes.INTEGER, allowNull: false, references: {
         key: "plan_subject_id",
         model: "plan_subjects"
      }
   },
   plan: { type: DataTypes.STRING },
   homework: { type: DataTypes.STRING },
})

const SubjectWeek = sequelize.define("subject_week_hours", {
   subject_week_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   plan_week_id: {
      type: DataTypes.INTEGER, allowNull: false, references: {
         key: "plan_week_id",
         model: "plan_weeks"
      }
   },
   plan_subject_id: {
      type: DataTypes.INTEGER, allowNull: false, references: {
         key: "plan_subject_id",
         model: "plan_subjects"
      }
   },
   hours: { type: DataTypes.INTEGER, defaultValue: 0 }
})


Spec.hasMany(Group)
Group.belongsTo(Spec)

Group.hasMany(GroupPlan)
GroupPlan.belongsTo(Group)

Group.hasMany(Student)
Student.belongsTo(Group)

Teacher.hasOne(Group)
Group.belongsTo(Teacher)

Subject.hasMany(PlanSubject)
PlanSubject.belongsTo(Subject)

GroupPlan.hasMany(PlanSubject)
PlanDay.belongsTo(GroupPlan)

GroupPlan.hasMany(PlanWeek)
PlanWeek.belongsTo(GroupPlan)

PlanWeek.hasMany(PlanDay)
PlanDay.belongsTo(PlanWeek)

PlanWeek.hasMany(SubjectWeek)
SubjectWeek.belongsTo(PlanWeek)

PlanSubject.hasMany(PlanSubject)
PlanSubject.belongsTo(PlanSubject)

PlanSubject.hasMany(SubjectWeek)
SubjectWeek.belongsTo(PlanSubject)


module.exports = {
   Spec, Teacher, Group, StudyPlan, Student,
   GroupPlan, PlanWeek, PlanSubject,
   Subject, PlanDay, SubjectWeek, DaySubject
}