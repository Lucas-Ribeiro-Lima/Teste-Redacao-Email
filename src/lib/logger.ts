import path from "path";
import { appendFile } from "fs/promises";
import { CustomErrors } from "../errors/customErrors.ts";

const errorLogPath = path.join(process.cwd(), "src", "logs", "error-log.txt");

export async function loggerHandler(error: CustomErrors) {
  const errorLine = `
    date: ${Date.now().toLocaleString("pt-BR")} 
    type: ${error.type || "Internal"}
    code: ${error.code || 500}
    stack: ${error.stack}
  `
  try {
    await appendFile(errorLogPath, errorLine)
    return;
  } catch (error) {
    console.error(`\x1b[41mError writing to log file\x1b[0m`)
  }
}
