import EventEmitter from 'events'
import { createTransport } from 'nodemailer'

import { envs } from '../config/env.ts'
import { SMTPSendError } from '../errors/customErrors.ts'
import { mailLogger } from '../lib/loggerHandler.ts'
import { separatorTerminal } from './utils.ts'

import type { EmailCandidato } from '../schemas/schema.ts'
import type { File } from '../middlewares/multer.ts'

const SMTPEventEmitter = new EventEmitter();


//Env variables
const { EMAIL_SMTP_HOST: host, EMAIL_USER: user, EMAIL_PWD: pass, EMAIL_CC_USER: cc} = envs;

const emailTransporter = createTransport({
  host,
  port: 25,
  secure: false,
  auth: {
    user,
    pass,
  },
});

export function verifySMTPConnection(): void {
  const MAX_ATTEMPTS = 10;
  let attempts = 0;

  const verify = () => {
    emailTransporter.verify((err, success) => {
      attempts++;
      if (err) {
        separatorTerminal();
        console.error(`\x1b[31mVerify SMTP connection: ${err.message}\x1b[0m`)
        if (attempts >= MAX_ATTEMPTS) {
          clearInterval(intervalId)
          separatorTerminal()
          console.error("\x1b[31mMaximum connection attempts reached. Please check SMTP configuration.\x1b[0m")
          mailLogger.error("Maximum connection attempts reached. Please check SMTP configuration.")
          emailTransporter.close()
          SMTPEventEmitter.emit('smtp-failure')
        }
      } else if (success) {
        separatorTerminal()
        console.log(`\x1b[92mSMTP Successful connection\x1b[0m`)
        clearInterval(intervalId)
        SMTPEventEmitter.emit('smtp-success')
      }
    })
  }

  verify()
  const intervalId = setInterval(verify, 5000)
}

SMTPEventEmitter.once('smtp-success', () => {
  console.log("SMTP connection established, starting mail queue...")
})

SMTPEventEmitter.once('smtp-failure', () => {
  mailLogger.error("SMTP connection failed after maximum attempts.")
  console.error("SMTP connection failed after maximum attempts.")
})

export async function mailScheduler (mail: EmailCandidato, anexo?: File) {
  try {
    const info = await emailTransporter.sendMail({
      from: `"Redação de email ✉️" <${user}>`,
      to: user,
      cc: cc || "",
      subject: mail.assunto,
      attachments: anexo ? [{ 
        filename: anexo.originalname,
        content: anexo.buffer,
      }] : [],
      html: `
        Destinatário: ${mail.destinatario}<br/>
        CC: ${mail.copia}<br/>
        Assunto: ${mail.assunto}<br/><br/>
        ${mail.mensagem}
        `,
    })
    mailLogger.info(info)
  } catch (error) {
    mailLogger.error(error)
    throw new SMTPSendError("Error sending e-mail")
  }
}
