import { createTransport, type SentMessageInfo } from 'nodemailer'
import type { Attachment } from 'nodemailer/lib/mailer/index.js'

import { envs } from '../config/env.ts'
import type { EmailCandidato } from '../schemas/schema.ts'
import { SMTPSendError } from '../errors/customErrors.ts'

const { EMAIL_SMTP_HOST: host, EMAIL_USER: user, EMAIL_PWD: pass} = envs

const emailTransporter = createTransport({
  host,
  port: 587,
  secure: false,
  auth: {
    user,
    pass
  }
})

function emailHtmlFormatter({destinatario, copia, assunto, mensagem}: EmailCandidato) {
  return `
    <p><strong>Email do candidato<strong/> ${assunto}<p/>
    <p><strong>Destinatário:<strong/> ${destinatario}<p/>
    <p><strong>Cópia:<strong/> ${copia}<p/>
    <p><strong>Mensagem:<strong/> ${mensagem}<p/>
    `
}

export function verifiySMTPConnection() {
  function printError() {
    console.log(`\x1b[33m-----------------------------------------\x1b[0m\n`)
    console.error("\x1b[41mVerify SMTP connection\x1b[0m")
  }

  emailTransporter.verify((error, sucess) => {
    if(error) {
      printError()
      const errorId = setInterval(printError, 15000)
      if(sucess) {
        clearInterval(errorId)
        console.log(`\x1b[92mSMTP Sucessfull connection\x1b[0m`)
      }
    }
  })
}

export async function sendEmail(email: EmailCandidato, anexo: Attachment): Promise<SentMessageInfo> {
  const emailFormated = emailHtmlFormatter(email)
  try {
    await emailTransporter.sendMail({
      from: `"Redação de email ✉️" < ${user} >`,
      to: user,
      subject: email.assunto,
      text: "",
      attachments: [anexo],
      html: `<div>${emailFormated}<div/>`
    })
    return {message: "E-mail enviado com sucesso"}
  } catch (error) {
    throw new SMTPSendError("Error sending e-mail")
  }
}