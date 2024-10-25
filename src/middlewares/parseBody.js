const formSchema = require("../schemas/schema")

function parseRequiredBody(req, res, next) {
  const file = req.file
  const data = { ...req.body, anexo: file };
  formSchema.parse(data)
  next()
}

module.exports = parseRequiredBody
