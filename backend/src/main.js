const app = require("./app")

const port = process.env.SERVER_PORT

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})