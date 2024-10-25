const path = require("path");
const fs = require("fs/promises");

const dirPath = path.join(process.cwd(), "src", "data", "testes");

async function saveFile(fileData, emailData) {
  const dirName = path.join(dirPath, emailData.assunto);

  await fs.mkdir(dirName, { recursive: true });

  const emailPath = path.join(dirName, `email.json`);
  const anexoPath = path.join(dirName, `anexo.xlsx`);

  // Salva os dados do email em JSON
  await fs.writeFile(emailPath, JSON.stringify(emailData));

  // Salva o buffer diretamente como arquivo Excel
  await fs.writeFile(anexoPath, fileData);
}

async function readFiles() {
  const dataDirs = await fs.readdir(dirPath);
  const testes = await Promise.all(
    dataDirs.map(async (dir) => {
      const emailPath = path.join(dirPath, dir, "email.json");
      const txt = await fs.readFile(emailPath, { encoding: "utf8" });
      return (txt) ? JSON.parse(txt) : null
    })
  );

  return testes;
}

module.exports = { saveFile, readFiles };
