import { z } from "zod";

const envSchema = z.object({
  SERVER_HOST: z.coerce.string({message: "Server Host required"}).default("localhost"),
  SERVER_PORT: z.coerce.number({message: "Server port required"}).default(3000),
  ADMIN_USER: z.string({message: "Admin user required"}).default("admin"),
  ADMIN_PWD: z.string({message: "Admin password required"}).default("admin"),
  EMAIL_SMTP_HOST: z.string({message: "Email SMTP host required"}),
  EMAIL_USER: z.string({message: "Email SMTP user login required"}),
  EMAIL_PWD: z.string({message: "Email SMTP user password required"}),
  EMAIL_CC_USER: z.string().optional()
})

export const envs = envSchema.parse(process.env)