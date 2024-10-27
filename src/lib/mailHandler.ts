import EventEmitter from 'events'
import { createTransport, type SentMessageInfo } from 'nodemailer'
import { envs } from '../config/env.ts'
import { separatorTerminal } from './utils.ts'
import {  MailInvalidError, SMTPSendError } from '../errors/customErrors.ts'
import type { EmailCandidato } from '../schemas/schema.ts'

const SMTPEventEmitter = new EventEmitter();

//Env variables
const { EMAIL_SMTP_HOST: host, EMAIL_USER: user, EMAIL_PWD: pass, EMAIL_CC_USER: cc} = envs;

const emailTransporter = createTransport({
  host,
  port: 587,
  secure: false,
  pool: true,
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

async function mailSend(email: EmailCandidato): Promise<SentMessageInfo> {
  try {
    const result = await emailTransporter.sendMail({
      from: `"Redação de email ✉️" <${user}>`,
      to: user,
      cc: cc || "",
      subject: email.assunto,
      attachments: email.anexo ? [email.anexo] : [],
      html: `
        Destinatário: ${email.destinatario}<br/>
        CC: ${email.copia}<br/>
        Assunto: ${email.assunto}<br/>
        Mensagem: <br/><br/><br/>
        ${email.mensagem}
        `,
    })
    return result
  } catch (error) {
    throw new SMTPSendError(`Error sending e-mail: ${error.message}`)
  }
}

async function mailHandler() {
  const mailQueue: EmailCandidato[] = []
  
  SMTPEventEmitter.once('smtp-success', () => {
    console.log("SMTP connection established, starting mail queue...")

    emailTransporter.on('idle', async () => {
      while (emailTransporter.isIdle() && mailQueue.length){ 
        const mail = mailQueue.shift()
        if(!mail) throw new MailInvalidError("Mail inválido") 
        await mailSend(mail)
        }  
    })
  })
  
  SMTPEventEmitter.once('smtp-failure', () => {
    console.error("SMTP connection failed after maximum attempts.")
  })

  function mailScheduler (mail: EmailCandidato) {
    mailQueue.push(mail)
  }

  return mailScheduler
}

export const mailScheduler = await mailHandler()
