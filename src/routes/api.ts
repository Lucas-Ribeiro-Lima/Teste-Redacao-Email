import { Router } from "express"
import multer from "multer"
import { parseBody } from "../middlewares/parseBody.ts"
import { mailScheduler } from "../lib/mailHandler.ts"

export const apiRouter = Router()

//Configuração do multer
const upload = multer({storage: multer.memoryStorage()})

apiRouter.get("/__health", (req, res) => {
  res.status(200).json({message: "API do questionário"})
})

apiRouter.post("/send/email", upload.single("anexo"), parseBody, async (req, res, next) => {
  try {
    const anexo = req.file
    const email = req.body

    email.anexo = anexo

    await mailScheduler(email)
    res.status(200).json("Email enviado")

  } catch (error) {
    next(error)
  }
})