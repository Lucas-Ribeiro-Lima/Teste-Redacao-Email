
const z = require("zod")

const formSchema = z.object({
  destinatario: z.string({message: "destinátario obrigatório"}),
  copia: z.string().optional(),
  assunto: z.string({message: "Assunto obrigatório"}),
  anexo: z.unknown(),
  mensagem: z.string({message: "Texto do e-mail obrigatório"})
})



module.exports = formSchema