import path from "path";
import fs from "fs";

export const createDir = async (fileName: string) => {
  if (fs.existsSync(fileName)) return;
  await fs.promises.mkdir(path.dirname(fileName));
};
