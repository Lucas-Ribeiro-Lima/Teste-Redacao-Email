import { formSchema } from "../schemas/schema.ts";

export function parseBody(req, res, next) {
  const file = req.file
  const data = { ...req.body, anexo: file };
  formSchema.parse(data)
  next()
}

