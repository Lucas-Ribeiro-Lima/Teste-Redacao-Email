const express = require("express")
const multer = require("multer")

const apiRouter = express.Router()

const parseRequiredBody = require("../middlewares/parseBody")
const { saveFile, readFiles } = require("../lib/filesHandle")

//Configuração do multer
const upload = multer({storage: multer.memoryStorage()})

apiRouter.get("/", (req, res) => {
  res.status(200).json({message: "API do questionário"})
})

apiRouter.post("/redacao/email", upload.single("anexo"), parseRequiredBody, async (req, res, next) => {
  try {
    const anexo = req.file
    const email = req.body
  
    await saveFile(anexo.buffer, email)
    res.status(200).json({message: "Arquivo salvo com sucesso"})
  } catch (error) {
    next(error)
  }
})

apiRouter.get("/admin/redacao", async (req, res) => {
  const testes = await readFiles()

  res.status(200).json(testes)
})

module.exports = apiRouter