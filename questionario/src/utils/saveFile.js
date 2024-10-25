const path = require("path")
const fs = require("fs/promises")

const dirPath = path.join(process.cwd(), "src", "data", "testes")

async function saveFile(fileData, emailData) {
  const dirName = path.join(dirPath, emailData.assunto)

  await fs.mkdir(dirName, { recursive: true });

  const emailPath = path.join(dirName, `email.txt`)
  const anexoPath = path.join(dirName, `anexo.png`);

  await fs.writeFile(emailPath, JSON.stringify(emailData))
  await fs.writeFile(anexoPath, fileData);
  return 0
}

module.exports = saveFile