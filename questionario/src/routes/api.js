const express = require("express")
const multer = require("multer")

const apiRouter = express.Router()

const parseRequiredBody = require("../middlewares/parseBody")
const saveFile = require("../utils/saveFile")

//Configuração do multer
const upload = multer({storage: multer.memoryStorage()})


apiRouter.get("/", (req, res) => {
  res.status(200).json({message: "API do questionário"})
})

apiRouter.post("/redacao/email", upload.single("anexo"), parseRequiredBody, async (req, res, next) => {
  try {
    const anexo = req.file
    const email = req.body
  
    await saveFile(anexo.buffer, email.assunto)
    res.status(200).json({message: "Arquivo salvo com sucesso"})
  } catch (error) {
    next(error)
  }
})

module.exports = apiRouter