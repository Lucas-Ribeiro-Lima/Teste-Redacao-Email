import { app } from './app.ts'
import { envs } from "./config/env.ts"
import { verifiySMTPConnection } from './lib/emailTransporter.ts'

const { SERVER_HOST: host, SERVER_PORT: port } = envs

app.listen(port, () => {
  console.log(`\n\n\x1b[1m\x1b[92mTeste de redação de \x1b[41m E-mail \x1b[0m.\nAplicação escutando em \x1b[3m\x1b[36mhttp://${host}:${port}`)
  verifiySMTPConnection()
})