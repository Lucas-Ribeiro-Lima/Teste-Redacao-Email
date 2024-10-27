import path from "path"
import fs from "fs/promises"

const dirPath = path.join(process.cwd(), "src", "data", "testes");

type EmailDataProps = {
  destinario: string
  copia: string
  assunto: string
  mensagem: string
}

export async function saveFile(fileData: Buffer, emailData: EmailDataProps): Promise<void> {
  const dirName = path.join(dirPath, emailData.assunto);

  await fs.mkdir(dirName, { recursive: true });

  const emailPath = path.join(dirName, `email.json`);
  const anexoPath = path.join(dirName, `anexo.xlsx`);

  await fs.writeFile(emailPath, JSON.stringify(emailData));

  await fs.writeFile(anexoPath, fileData);
}

export async function readFiles(): Promise<EmailDataProps[]> {
  const dataDirs = await fs.readdir(dirPath);
  const files = await Promise.all(
    dataDirs.map(async (dir) => {
      const emailPath = path.join(dirPath, dir, "email.json");
      const txt = await fs.readFile(emailPath, { encoding: "utf8" });
      return (txt) ? JSON.parse(txt) : null
    })
  );

  return files;
}

