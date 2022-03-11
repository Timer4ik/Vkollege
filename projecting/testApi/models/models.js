const sequelize = require("../db.js")
const { DataTypes } = require("sequelize")

const Spec = sequelize.define("spec", {
   spec_id: { type: DataTypes.INTEGER, primaryKey: true },
   division: { type: DataTypes.STRING(200), allowNull: false },
   name:{type:DataTypes.STRING(200),allowNull:false},
   about:{type:DataTypes.STRING,allowNull:false},
})

const Teacher = sequelize.define("teacher",{
   teacher_id:{type:DataTypes.INTEGER,primaryKey:true},
   name:{type:DataTypes.STRING(50),allowNull:false},
   surname:{type:DataTypes.STRING(50)},
   patronymic:{type:DataTypes.STRING(50)},
   about:{type:DataTypes.STRING},
   status:{type:DataTypes.STRING},
   age:{type:DataTypes.INTEGER}
})

const Group = sequelize.define("group",{
   group_id:{type:DataTypes.INTEGER,primaryKey:true},
   spec_id:{type:DataTypes.INTEGER,allowNull:false},
   teacher_id:{type:DataTypes.INTEGER,allowNull:false},
   course:{type:DataTypes.INTEGER,allowNull:false,defaultValue:1},
   student_amount:{type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
   year:{type:DataTypes.INTEGER,allowNull:false}
})


module.exports = {
   Spec,Teacher,Group
}