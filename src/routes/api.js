const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs/promises")

const apiRouter = express.Router()

const parseRequiredBody = require("../middlewares/parseBody")
const saveFile = require("../lib/saveFile")

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
  const dataPath = path.join(process.cwd(), "src", "data", "testes")

  const dataDirs = await fs.readdir(dataPath)

  const testes = []

  dataDirs.forEach(async (dir) => {
    const emailPatch = path.join(dataPath, dir, "email.txt")
    const txt = await fs.readFile(emailPatch, {encoding: "utf8"})  
    testes.push(JSON.parse(txt))
  })

  res.json(testes)
})

module.exports = apiRouter