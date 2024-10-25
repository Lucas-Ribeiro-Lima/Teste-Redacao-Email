const express = require('express')
const cors = require("cors")

const errorHandlerHttp = require('./errors/errorHandler')

const apiRouter = require("./routes/api")

//Express configurantion
const app = express()
app.use(cors())
app.use(express.json())

//Arquivos estáticos
app.use("/", express.static('./public/user'))
app.use("/admin", express.static('./public/admin'))

app.use("/api", apiRouter)

//Error Handler
app.use(errorHandlerHttp)

module.exports = app