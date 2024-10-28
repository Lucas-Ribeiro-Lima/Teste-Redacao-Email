import path from "path";
import { Logger } from "logger";

const routeLogPath = path.join(process.cwd(), "src", "logs", "route.log");
const mailLogPath = path.join(process.cwd(), "src", "logs", "mail.log");

export const routeLogger = new Logger(routeLogPath)
export const mailLogger = new Logger(mailLogPath)

