import { Router } from "express"
import { parseBody } from "../middlewares/parseBody.ts"
import { mailScheduler } from "../lib/mailHandler.ts"
import { uploadAnexo } from '../middlewares/multer.ts'

export const apiRouter = Router()

apiRouter.get("/__health", (req, res) => {
  res.status(200).json({message: "API do questionário"})
})

apiRouter.post("/send/email", uploadAnexo, parseBody, async (req, res, next) => {
  try {
    const anexo = req.file
    const email = req.body

    await mailScheduler(email, anexo)
    res.status(200).json("Email enviado")

  } catch (error) {
    next(error)
  }
})