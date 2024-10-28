import multer from "multer";
import { Readable } from "stream";

export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  stream: Readable;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

//Configuração do multer
export const uploadAnexo = multer({storage: multer.memoryStorage()}).single("anexo")