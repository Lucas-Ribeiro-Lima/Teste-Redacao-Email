import express from 'express'
import cors from 'cors'
import { errorHandlerHttp } from './errors/errorHandler.ts'
import { logger } from './middlewares/logger.ts'
import { apiRouter } from './routes/api.ts'

//Express configurantion
export const app = express()
app.use(cors())
app.use(express.json())

//Arquivos estáticos
app.use("/", express.static("./public/user"))
app.use("/admin", express.static("./public/admin"))

app.use("/css", express.static("./public/css"))
app.use("/javascript", express.static("./public/javascript"))
app.use("/images", express.static("./public/images"))

//Healthy
app.get("/__health", (req, res) => {
  res.status(200).send('ok')
})

//API
app.use("/api", apiRouter)

//Error Handler
app.use(logger)
app.use(errorHandlerHttp)
