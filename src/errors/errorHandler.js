const { ZodError } = require("zod")
const InvalidInputError = require("./customErrors")

function errorHandlerHttp (err, req, res, next) {
  if(err instanceof ZodError) {
    res.status(500).json(err)
    return
  }
  if(err instanceof InvalidInputError) {
    res.status(err.code).json({message: err.message})
    return
  }
  else {
    res.status(500).json({message: "Erro interno"})
    return
  }
}

module.exports = errorHandlerHttp