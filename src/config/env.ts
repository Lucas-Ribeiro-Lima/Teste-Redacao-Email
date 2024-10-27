import { z } from "zod";

const envSchema = z.object({
  SERVER_HOST: z.string({message: "Server Host required"}),
  SERVER_PORT: z.string({message: "Server port required"}),
  API_URL: z.string({message: "API URL required"}),
  ADMIN_USER: z.string({message: "Admin user required"}),
  ADMIN_PWD: z.string({message: "Admin password required"}),
  EMAIL_SMTP_HOST: z.string({message: "Email SMTP host required"}),
  EMAIL_USER: z.string({message: "Email SMTP user login required"}),
  EMAIL_PWD: z.string({message: "Email SMTP user password required"}),
  EMAIL_CC_USER: z.string().optional()
})

export const envs = envSchema.parse(process.env)