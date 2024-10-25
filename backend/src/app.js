const express = require('express')
const multer = require("multer")
const errorHandlerHttp = require('./errors/errorHandler')
const parseRequiredBody = require("./middlewares/parseBody")
const saveFile = require("./utils/saveFile")

const upload = multer({storage: multer.memoryStorage()})

const app = express()


app.get("/", (req, res) => {
  res.status(200).json({message: "Hello World"})
})

app.post("/redacao/email", upload.single("anexo"), parseRequiredBody, async (req, res, next) => {
  try {
    const anexo = req.file
    const email = req.body
  
    await saveFile(anexo.buffer, email.assunto)
    res.status(200).json({message: "Arquivo salvo com sucesso"})
  } catch (error) {
    next(error)
  }
})

app.use(errorHandlerHttp)

module.exports = app