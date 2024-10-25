const formSchema = require("../schemas/schema")
const InvalidInputError = require("../errors/customErrors")

function parseRequiredBody(req, res, next) {
  const file = req.file
  
  if(!req.file) throw new InvalidInputError(400, "Anexo inválido")

  const data = { ...req.body, anexo: file };

  
  formSchema.parse(data)
  next()
} 


module.exports = parseRequiredBody
