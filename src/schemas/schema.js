const z = require("zod")

const formSchema = z.object({
  destinatario: z.string({message: "destinátario obrigatório"}),
  copia: z.string().optional(),
  assunto: z.string({message: "Assunto obrigatório"}),
  mensagem: z.string({message: "Texto do e-mail obrigatório"}),
  anexo: z.unknown(),
})

module.exports = formSchema