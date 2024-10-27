import { ZodError } from "zod"
import { CustomErrors } from "../errors/customErrors.ts"

export function errorHandlerHttp (err, req, res, next) {
  if(err instanceof ZodError) {
    res.status(500).json(err)
    return
  }
  if(err instanceof CustomErrors) {
    res.status(err.code).json({message: err.message})
    return
  }
  else {
    res.status(500).json({message: "Erro interno"})
    return
  }
}
