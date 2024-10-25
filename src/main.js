const app = require("./app")

const port = process.env.SERVER_PORT
const host = process.env.SERVER_HOST


app.listen(port, () => {
  console.log(`\x1b[1m\x1b[92mTeste de redação de \x1b[41m E-mail \x1b[0m. Aplicação escutando em \x1b[3m\x1b[36mhttp://${host}:${port}`)
})