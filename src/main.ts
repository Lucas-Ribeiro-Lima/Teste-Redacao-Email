import { app } from "./app.ts";
import { envs } from "./config/env.ts";
import { verifySMTPConnection } from "./lib/mailHandler.ts";
import { terminate } from "./lib/terminate.ts";

const { SERVER_HOST: host, SERVER_PORT: port } = envs;
const server = app.listen(port, () => {
  console.log(
    `\n\n\x1b[1m\x1b[92mTeste de redação de \x1b[41m E-mail \x1b[0m.\nAplicação escutando em \x1b[3m\x1b[36mhttp://${host}:${port}`
  );
  verifySMTPConnection();
});

const exitHandler = terminate(server, { coreDump: false, timeout: 1500 });

process.on("uncaughtException", () => exitHandler(1));
process.on("unhandledRejection", () => exitHandler(1));
process.on("SIGTERM", () => exitHandler(0));
process.on("SIGINT", () => exitHandler(0));
