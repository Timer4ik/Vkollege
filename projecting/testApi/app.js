require("dotenv").config()
const express = require("express")
const cors = require("cors")
const sequelize = require("./db.js")
const routes = require("./core/routes.js")

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

app.use("/api",routes)

const start = async () => {
   try {
      await sequelize.authenticate()
		await sequelize.sync()

      app.listen(PORT,() => {
         console.log(`App has started on port http://localhost:${PORT}`)
      })
   } catch (error) {
      console.log({message:error.message,error})
   }
}

start()

