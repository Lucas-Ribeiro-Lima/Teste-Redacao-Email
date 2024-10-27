import multer from "multer"
import { Router } from "express"
import { readFiles, saveFile } from '../lib/filesHandle.ts'
import { sendEmail } from "../lib/emailTransporter.ts"
import { parseBody } from "../middlewares/parseBody.ts"

export const apiRouter = Router()

//Configuração do multer
const upload = multer({storage: multer.memoryStorage()})

apiRouter.get("/", (req, res) => {
  res.status(200).json({message: "API do questionário"})
})

apiRouter.post("/send/email", upload.single("anexo"), parseBody, async (req, res, next) => {
  try {
    const anexo = req.file
    const email = req.body

    const response = await sendEmail(email, anexo)

    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
})

apiRouter.post("/save/email", upload.single("anexo"), parseBody, async (req, res, next) => {
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
