const {Sequelize} = require("sequelize")

const sequelize = new Sequelize({
   username:"postgres",
   password:"1234",
   host:"localhost",
   database:"vkollegedb",
   port:"5432",
   dialect:"postgres"
})

module.exports = sequelize

