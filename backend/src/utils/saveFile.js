const path = require("path")
const fs = require("fs/promises")

const dirPath = path.join(process.cwd(), "src", "data", "testes")

async function saveFile(fileData, fileName) {
  await fs.mkdir(dirPath, { recursive: true });

  const filePath = path.join(dirPath, `${fileName}.xlsx`);

  await fs.writeFile(filePath, fileData, {flag: "w+"});
  return 0
}

module.exports = saveFile